//Changed Code -
//$(clientFrameWindow.document.body).find('.reserved-drop-marker').remove();
//$(event.target).append("<p class='reserved-drop-marker'></p>");

$(function () {
    let addcode, editcode, currentElement, currentElementChangeFlag, elementRectangle, countdown, dragoverqueue_processtimer;
    let isDragging = false;
    // clientFrameWindow = interface的client端內容( w、 r)
    let clientFrameWindow = $('#clientframe').get(0).contentWindow;

    $("#home").mCustomScrollbar({
        theme: "minimal"
    });


    // 複製程式碼內容
    $("#copyBtn").click(function () {
        let name = $(this).attr('name');
        let el = document.getElementById(name);
        let range = document.createRange();
        range.selectNodeContents(el);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        return false;
    });

    // 開啟程式碼按鈕
    $("#navCopy").click(function () {
        editcode = DragDropFunctions.CopyDom();
        // cleanNotes(editcode);
        $("#newCode").text(editcode);
    });

    // 點擊切換樣板大小
    $("#mobile-view").click(function () {
        $("#canvas").attr("class", "mobile");
    });

    $("#tablet-view").click(function () {
        $("#canvas").attr("class", "tablet");
    });

    $("#desktop-view").click(function () {
        $("#canvas").attr("class", "desktop");
    });


    // 開始拖曳時
    $("#dragitemslistcontainer li").on('dragstart', function (event) {
        isDragging = true;
        // console.log("Drag Started");
        dragoverqueue_processtimer = setInterval(function () {
            // DragDropFunctions = 所有function的集合
            DragDropFunctions.ProcessDragOverQueue();
        }, 100);
        let insertingHTML = $(this).attr('data-insert-html');
        addcode = insertingHTML;
        // 設定將data-insert-html(預設樣板)加入至拖移操作
        event.originalEvent.dataTransfer.setData("Text", insertingHTML);
    });
    $("#dragitemslistcontainer li").on('dragend', function () {
        isDragging = false;
        // console.log("Drag End");
        clearInterval(dragoverqueue_processtimer);
        DragDropFunctions.removePlaceholder();
        DragDropFunctions.ClearContainerContext();
    });
    $('#clientframe').load(function () {
        //Add CSS File to iFrame
        let style = $("<style data-reserved-styletag></style>").html(GetInsertionCSS());
        $(clientFrameWindow.document.head).append(style);

        let htmlBody = $(clientFrameWindow.document).find('body,html');
        htmlBody.find('*').andSelf().on('dragenter', function (event) {
            // 停止冒泡
            event.stopPropagation();
            // currentElement設定成當前位置標籤
            currentElement = $(event.target);
            currentElementChangeFlag = true;
            // elementRectangle = 矩形集合
            elementRectangle = event.target.getBoundingClientRect();
            countdown = 1;

        }).on('dragover', function (event) {
            // 防止元素發生默認行為
            event.preventDefault();
            // 停止冒泡
            event.stopPropagation();
            if (countdown % 15 != 0 && currentElementChangeFlag == false) {
                countdown = countdown + 1;
                return;
            }
            event = event || window.event;

            let x = event.originalEvent.clientX;
            let y = event.originalEvent.clientY;
            countdown = countdown + 1;
            currentElementChangeFlag = false;
            let mousePosition = { x: x, y: y };
            //                                          ↓ 當前位置標籤  ↓ 矩形集合       ↓ 滑鼠位置
            DragDropFunctions.AddEntryToDragOverQueue(currentElement, elementRectangle, mousePosition)
        })

        $(clientFrameWindow.document).find('body,html').on('drop', function (event) {
            isDragging = false;
            event.preventDefault();
            event.stopPropagation();

            let e;
            if (event.isTrigger)
                e = triggerEvent.originalEvent;
            else
                e = event.originalEvent;
            try {
                let textData = e.dataTransfer.getData('text');

                let insertionPoint = $("#clientframe").contents().find(".drop-marker");
                let checkDiv = $(textData);
                insertionPoint.after(checkDiv);
                insertionPoint.remove();
            }
            catch (e) {
                console.log(e);
            }
        });
    });

    let DragDropFunctions =
    {
        dragoverqueue: [], // 定義為array
        CopyDom: function () {
            editcode = $(clientFrameWindow.document).find('body').prop('outerHTML');
            // 刪除註解
            if(editcode){
                let comment = editcode.match(/<!--?((.(?!(-->)))*.)-->/g);
                if(comment){
                    for (let a = 0; a < comment.length; a++) {
                        editcode = editcode.replace(comment[a], "");
                    }
                }

                // 刪除script
                let js = editcode.match(/<script(.|\n)*?<\/script>/g);
                if(js){
                    for (let a = 0; a < js.length; a++) {
                        editcode = editcode.replace(js[a], "");
                    }
                }
            } else {
                editcode = '<body></body>';
            }
            return editcode;
        },
        GetMouseBearingsPercentage: function ($element, elementRect, mousePos) {
            if (!elementRect) // 如果elementRect是空的，放入element的DOMRect
                elementRect = $element.get(0).getBoundingClientRect();
            // mousePosPercent_X = ((滑鼠x - 物件左邊)/物件寬度)*100
            // mousePosPercent_Y = ((滑鼠y - 物件上邊)/物件高度)*100
            let mousePosPercent_X = ((mousePos.x - elementRect.left) / (elementRect.right - elementRect.left)) * 100;
            let mousePosPercent_Y = ((mousePos.y - elementRect.top) / (elementRect.bottom - elementRect.top)) * 100;
            // 回傳滑鼠的位置百分比
            return { x: mousePosPercent_X, y: mousePosPercent_Y };
        },
        OrchestrateDragDrop: function ($element, elementRect, mousePos)// 所在位置(標籤) DOMRect 滑鼠位置
        //If no element is hovered or element hovered is the placeholder -> not valid -> return false;
        {   // 如果沒有任何元素 返回false；
            if (!$element || $element.length == 0 || !elementRect || !mousePos) {
                return false;
            }
            if ($element.is('html')) { // 如果有包含html，找到body
                $element = $element.find('body');
            }
            // 頂部和底部面積百分比觸發不同的情況。 [為此保留了頂部和底部區域的5％]
            //Top and Bottom Area Percentage to trigger different case. [5% of top and bottom area gets reserved for this]
            let breakPointNumber = { x: 5, y: 5 };

            //    ↓ 滑鼠的位置百分比              ↓ 回傳滑鼠的位置百分比
            let mousePercents = this.GetMouseBearingsPercentage($element, elementRect, mousePos);
            if ((mousePercents.x > breakPointNumber.x && mousePercents.x < 100 - breakPointNumber.x) && (mousePercents.y > breakPointNumber.y && mousePercents.y < 100 - breakPointNumber.y)) {// (滑鼠x、y > 5 && 滑鼠x、y < 95)
                //Case 1 -

                $tempelement = $element.clone(); // 複製所在位置的標籤
                $tempelement.find(".drop-marker").remove();
                // console.log('gogo', $tempelement.html());
                if ($tempelement.html() == "" && !this.checkVoidElement($tempelement)) {  // 如果所在位置是空的，也沒有預設字串
                    if (mousePercents.y < 90)
                        return this.PlaceInside($element);
                }
                else if ($tempelement.children().length == 0) {
                    //text element detected
                    //console.log("Text Element");
                    this.DecideBeforeAfter($element, mousePercents);
                }
                else if ($tempelement.children().length == 1) {
                    //only 1 child element detected
                    //console.log("1 Child Element");
                    this.DecideBeforeAfter($element.children(":not(.drop-marker,[data-dragcontext-marker])").first(), mousePercents);
                }
                else {
                    let positionAndElement = this.findNearestElement($element, mousePos.x, mousePos.y);
                    this.DecideBeforeAfter(positionAndElement.el, mousePercents, mousePos);
                    //more than 1 child element present
                    //console.log("More than 1 child detected");
                }
            }
            else if ((mousePercents.x <= breakPointNumber.x) || (mousePercents.y <= breakPointNumber.y)) {
                let validElement = null
                if (mousePercents.y <= mousePercents.x)
                    validElement = this.FindValidParent($element, 'top');
                else
                    validElement = this.FindValidParent($element, 'left');

                if (validElement.is("body,html"))
                    validElement = $("#clientframe").contents().find("body").children(":not(.drop-marker,[data-dragcontext-marker])").first();
                this.DecideBeforeAfter(validElement, mousePercents, mousePos);
            }
            else if ((mousePercents.x >= 100 - breakPointNumber.x) || (mousePercents.y >= 100 - breakPointNumber.y)) {
                let validElement = null
                if (mousePercents.y >= mousePercents.x)
                    validElement = this.FindValidParent($element, 'bottom');
                else
                    validElement = this.FindValidParent($element, 'right');

                if (validElement.is("body,html"))
                    validElement = $("#clientframe").contents().find("body").children(":not(.drop-marker,[data-dragcontext-marker])").last();
                this.DecideBeforeAfter(validElement, mousePercents, mousePos);
            }
        },
        DecideBeforeAfter: function ($targetElement, mousePercents, mousePos) { // 決定前後
            if (mousePos) {
                mousePercents = this.GetMouseBearingsPercentage($targetElement, null, mousePos);
            }

            /*if(!mousePercents)
             {
             mousePercents = this.GetMouseBearingsPercentage($targetElement, $targetElement.get(0).getBoundingClientRect(), mousePos);
             } */

            $orientation = ($targetElement.css('display') == "inline" || $targetElement.css('display') == "inline-block");
            if ($targetElement.is("br"))
                $orientation = false;
            // targetElement內有br的話display = inline-block
            if ($orientation) {   // orientation是true的話判斷x軸，false的話判斷y軸
                if (mousePercents.x < 50) {
                    return this.PlaceBefore($targetElement);
                }
                else {
                    return this.PlaceAfter($targetElement);
                }
            }
            else {
                if (mousePercents.y < 50) {
                    return this.PlaceBefore($targetElement);
                }
                else {
                    return this.PlaceAfter($targetElement);
                }
            }
        },
        checkVoidElement: function ($element) {   // 如果有符合字串回傳true沒有則false
            let voidelements = ['i', 'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'video', 'iframe', 'source', 'track', 'wbr'];
            let selector = voidelements.join(",") // 輸出成字串，用逗號隔開
            if ($element.is(selector)) {
                console.log("true");
                return true;
            } else {
                console.log("false");
                return false;
            }
        },
        calculateDistance: function (elementData, mouseX, mouseY) {
            return Math.sqrt(Math.pow(elementData.x - mouseX, 2) + Math.pow(elementData.y - mouseY, 2));
        },
        FindValidParent: function ($element, direction) {
            switch (direction) {
                case "left":
                    while (true) {
                        let elementRect = $element.get(0).getBoundingClientRect();
                        let $tempElement = $element.parent();
                        let tempelementRect = $tempElement.get(0).getBoundingClientRect();
                        if ($element.is("body"))
                            return $element;
                        if (Math.abs(tempelementRect.left - elementRect.left) == 0)
                            $element = $element.parent();
                        else
                            return $element;
                    }
                    break;
                case "right":
                    while (true) {
                        let elementRect = $element.get(0).getBoundingClientRect();
                        let $tempElement = $element.parent();
                        let tempelementRect = $tempElement.get(0).getBoundingClientRect();
                        if ($element.is("body"))
                            return $element;
                        if (Math.abs(tempelementRect.right - elementRect.right) == 0)
                            $element = $element.parent();
                        else
                            return $element;
                    }
                    break;
                case "top":
                    while (true) {
                        let elementRect = $element.get(0).getBoundingClientRect();
                        let $tempElement = $element.parent();
                        let tempelementRect = $tempElement.get(0).getBoundingClientRect();
                        if ($element.is("body"))
                            return $element;
                        if (Math.abs(tempelementRect.top - elementRect.top) == 0)
                            $element = $element.parent();
                        else
                            return $element;
                    }
                    break;
                case "bottom":
                    while (true) {
                        let elementRect = $element.get(0).getBoundingClientRect();
                        let $tempElement = $element.parent();
                        let tempelementRect = $tempElement.get(0).getBoundingClientRect();
                        if ($element.is("body"))
                            return $element;
                        if (Math.abs(tempelementRect.bottom - elementRect.bottom) == 0)
                            $element = $element.parent();
                        else
                            return $element;
                    }
                    break;
            }
        },
        addPlaceHolder: function ($element, position, placeholder) {
            if (!placeholder)
                placeholder = this.getPlaceHolder();
            this.removePlaceholder();
            switch (position) {
                case "before":
                    placeholder.find(".message").html($element.parent().data('sh-dnd-error'));
                    $element.before(placeholder);
                    // console.log($element);
                    // console.log("BEFORE");
                    this.AddContainerContext($element, 'sibling');
                    break;
                case "after":
                    placeholder.find(".message").html($element.parent().data('sh-dnd-error'));
                    $element.after(placeholder);
                    // console.log($element);
                    // console.log("AFTER");
                    this.AddContainerContext($element, 'sibling');
                    break
                case "inside-prepend":
                    placeholder.find(".message").html($element.data('sh-dnd-error'));
                    $element.prepend(placeholder);
                    this.AddContainerContext($element, 'inside');
                    // console.log($element);
                    // console.log("PREPEND");
                    break;
                case "inside-append":
                    placeholder.find(".message").html($element.data('sh-dnd-error'));
                    $element.append(placeholder);
                    this.AddContainerContext($element, 'inside');
                    // console.log($element);
                    // console.log("APPEND");
                    break;
            }
        },
        removePlaceholder: function () {  // 刪除li標籤，及其相關數據
            $("#clientframe").contents().find(".drop-marker").remove();
        },
        getPlaceHolder: function () {
            return $("<li class='drop-marker'></li>");
        },
        PlaceInside: function ($element) {  // 將li加上class和寬度
            let placeholder = this.getPlaceHolder();
            placeholder.addClass('horizontal').css('width', $element.width() + "px");
            // addPlaceHolder( 所在位置標籤, "inside-append", li標籤)
            this.addPlaceHolder($element, "inside-append", placeholder);
        },
        PlaceBefore: function ($element) {
            let placeholder = this.getPlaceHolder();
            let inlinePlaceholder = ($element.css('display') == "inline" || $element.css('display') == "inline-block");
            if ($element.is("br")) {
                inlinePlaceholder = false;
            }
            else if ($element.is("td,th")) {
                placeholder.addClass('horizontal').css('width', $element.width() + "px");
                return this.addPlaceHolder($element, "inside-prepend", placeholder);
            }
            if (inlinePlaceholder)
                placeholder.addClass("vertical").css('height', $element.innerHeight() + "px");
            else
                placeholder.addClass("horizontal").css('width', $element.parent().width() + "px");
            this.addPlaceHolder($element, "before", placeholder);
        },

        PlaceAfter: function ($element) {
            let placeholder = this.getPlaceHolder();
            let inlinePlaceholder = ($element.css('display') == "inline" || $element.css('display') == "inline-block");
            if ($element.is("br")) {
                inlinePlaceholder = false;
            }
            else if ($element.is("td,th")) {
                placeholder.addClass('horizontal').css('width', $element.width() + "px");
                return this.addPlaceHolder($element, "inside-append", placeholder);
            }
            if (inlinePlaceholder)
                placeholder.addClass("vertical").css('height', $element.innerHeight() + "px");
            else
                placeholder.addClass("horizontal").css('width', $element.parent().width() + "px");
            this.addPlaceHolder($element, "after", placeholder);
        },
        findNearestElement: function ($container, clientX, clientY) {
            let _this = this;
            let previousElData = null;
            let childElement = $container.children(":not(.drop-marker,[data-dragcontext-marker])");
            if (childElement.length > 0) {
                childElement.each(function () {
                    if ($(this).is(".drop-marker"))
                        return;

                    let offset = $(this).get(0).getBoundingClientRect();
                    let distance = 0;
                    let distance1, distance2 = null;
                    let position = '';
                    let xPosition1 = offset.left;
                    let xPosition2 = offset.right;
                    let yPosition1 = offset.top;
                    let yPosition2 = offset.bottom;
                    let corner1 = null;
                    let corner2 = null;

                    //Parellel to Yaxis and intersecting with x axis
                    if (clientY > yPosition1 && clientY < yPosition2) {
                        if (clientX < xPosition1 && clientY < xPosition2) {
                            corner1 = { x: xPosition1, y: clientY, 'position': 'before' };
                        }
                        else {
                            corner1 = { x: xPosition2, y: clientY, 'position': 'after' };
                        }

                    }
                    //Parellel to xAxis and intersecting with Y axis
                    else if (clientX > xPosition1 && clientX < xPosition2) {
                        if (clientY < yPosition1 && clientY < yPosition2) {
                            corner1 = { x: clientX, y: yPosition1, 'position': 'before' };
                        }
                        else {
                            corner1 = { x: clientX, y: yPosition2, 'position': 'after' };
                        }

                    }
                    else {
                        //runs if no element found!
                        if (clientX < xPosition1 && clientX < xPosition2) {
                            corner1 = { x: xPosition1, y: yPosition1, 'position': 'before' };          //left top
                            corner2 = { x: xPosition1, y: yPosition2, 'position': 'after' };       //left bottom
                        }
                        else if (clientX > xPosition1 && clientX > xPosition2) {
                            //console.log('I m on the right of the element');
                            corner1 = { x: xPosition2, y: yPosition1, 'position': 'before' };   //Right top
                            corner2 = { x: xPosition2, y: yPosition2, 'position': 'after' }; //Right Bottom
                        }
                        else if (clientY < yPosition1 && clientY < yPosition2) {
                            // console.log('I m on the top of the element');
                            corner1 = { x: xPosition1, y: yPosition1, 'position': 'before' }; //Top Left
                            corner2 = { x: xPosition2, y: yPosition1, 'position': 'after' }; //Top Right
                        }
                        else if (clientY > yPosition1 && clientY > yPosition2) {
                            // console.log('I m on the bottom of the element');
                            corner1 = { x: xPosition1, y: yPosition2, 'position': 'before' }; //Left bottom
                            corner2 = { x: xPosition2, y: yPosition2, 'position': 'after' } //Right Bottom
                        }
                    }

                    distance1 = _this.calculateDistance(corner1, clientX, clientY);

                    if (corner2 !== null)
                        distance2 = _this.calculateDistance(corner2, clientX, clientY);

                    if (distance1 < distance2 || distance2 === null) {
                        distance = distance1;
                        position = corner1.position;
                    }
                    else {
                        distance = distance2;
                        position = corner2.position;
                    }

                    if (previousElData !== null) {
                        if (previousElData.distance < distance) {
                            return true; //continue statement
                        }
                    }
                    previousElData = { 'el': this, 'distance': distance, 'xPosition1': xPosition1, 'xPosition2': xPosition2, 'yPosition1': yPosition1, 'yPosition2': yPosition2, 'position': position }
                });
                if (previousElData !== null) {
                    let position = previousElData.position;
                    return { 'el': $(previousElData.el), 'position': position };
                }
                else {
                    return false;
                }
            }
        },
        AddEntryToDragOverQueue: function ($element, elementRect, mousePos) {   // 將當前位置標籤、矩形位置、滑鼠位置陣列加入至dragoverqueue array
            let newEvent = [$element, elementRect, mousePos];
            this.dragoverqueue.push(newEvent);
        },
        ProcessDragOverQueue: function ($element, elementRect, mousePos) // <-沒傳值
        {   //processing = 最後一個元素; 清空dragoverqueue
            let processing = this.dragoverqueue.pop();
            this.dragoverqueue = [];
            // 如果有三個東西就呼叫OrchestrateDragDrop
            if (processing && processing.length == 3) {
                let $el = processing[0]; // 所在位置(標籤)
                let $elRect = processing[1]; // DOMRect
                let mousePos = processing[2]; // 滑鼠位置
                this.OrchestrateDragDrop($el, $elRect, mousePos);
            }

        },
        GetContextMarker: function () {
            $contextMarker = $("<div data-dragcontext-marker><span data-dragcontext-marker-text></span></div>");
            return $contextMarker;
        },
        AddContainerContext: function ($element, position) {
            let name;
            $contextMarker = this.GetContextMarker();
            this.ClearContainerContext();
            if ($element.is('html,body')) {
                position = 'inside';
                $element = $("#clientframe").contents().find("body");
            }
            switch (position) {
                case "inside":
                    this.PositionContextMarker($contextMarker, $element);
                    if ($element.hasClass('stackhive-nodrop-zone'))
                        $contextMarker.addClass('invalid');
                    name = this.getElementName($element);
                    $contextMarker.find('[data-dragcontext-marker-text]').html(name);
                    if ($("#clientframe").contents().find("body [data-sh-parent-marker]").length != 0)
                        $("#clientframe").contents().find("body [data-sh-parent-marker]").first().before($contextMarker);
                    else
                        $("#clientframe").contents().find("body").append($contextMarker);
                    break;
                case "sibling":
                    this.PositionContextMarker($contextMarker, $element.parent());
                    if ($element.parent().hasClass('stackhive-nodrop-zone'))
                        $contextMarker.addClass('invalid');
                    name = this.getElementName($element.parent());
                    $contextMarker.find('[data-dragcontext-marker-text]').html(name);
                    $contextMarker.attr("data-dragcontext-marker", name.toLowerCase());
                    if ($("#clientframe").contents().find("body [data-sh-parent-marker]").length != 0)
                        $("#clientframe").contents().find("body [data-sh-parent-marker]").first().before($contextMarker);
                    else
                        $("#clientframe").contents().find("body").append($contextMarker);
                    break;
            }
        },
        PositionContextMarker: function ($contextMarker, $element) {
            let rect = $element.get(0).getBoundingClientRect();
            $contextMarker.css({
                height: (rect.height + 4) + "px",
                width: (rect.width + 4) + "px",
                top: (rect.top + $($("#clientframe").get(0).contentWindow).scrollTop() - 2) + "px",
                left: (rect.left + $($("#clientframe").get(0).contentWindow).scrollLeft() - 2) + "px"
            });
            if (rect.top + $("#clientframe").contents().find("body").scrollTop() < 24)
                $contextMarker.find("[data-dragcontext-marker-text]").css('top', '0px');
        },
        ClearContainerContext: function () {
            $("#clientframe").contents().find('[data-dragcontext-marker]').remove();
        },
        getElementName: function ($element) {
            return $element.prop('tagName');
        }
    };

    GetInsertionCSS = function () {
        let styles = "" +
            ".reserved-drop-marker{width:100%;height:2px;background:#00a8ff;position:absolute}.reserved-drop-marker::after,.reserved-drop-marker::before{content:'';background:#00a8ff;height:7px;width:7px;position:absolute;border-radius:50%;top:-2px}.reserved-drop-marker::before{left:0}.reserved-drop-marker::after{right:0}";
        styles += "[data-dragcontext-marker],[data-sh-parent-marker]{outline:#19cd9d solid 2px;text-align:center;position:absolute;z-index:123456781;pointer-events:none;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}[data-dragcontext-marker] [data-dragcontext-marker-text],[data-sh-parent-marker] [data-sh-parent-marker-text]{background:#19cd9d;color:#fff;padding:2px 10px;display:inline-block;font-size:14px;position:relative;top:-24px;min-width:121px;font-weight:700;pointer-events:none;z-index:123456782}[data-dragcontext-marker].invalid{outline:#dc044f solid 2px}[data-dragcontext-marker].invalid [data-dragcontext-marker-text]{background:#dc044f}[data-dragcontext-marker=body]{outline-offset:-2px}[data-dragcontext-marker=body] [data-dragcontext-marker-text]{top:0;position:fixed}";
        styles += '.drop-marker{pointer-events:none;}.drop-marker.horizontal{background:#00adff;position:absolute;height:2px;list-style:none;visibility:visible!important;box-shadow:0 1px 2px rgba(255,255,255,.4),0 -1px 2px rgba(255,255,255,.4);z-index:123456789;text-align:center}.drop-marker.horizontal.topside{margin-top:0}.drop-marker.horizontal.bottomside{margin-top:2px}.drop-marker.horizontal:before{content:"";width:8px;height:8px;background:#00adff;border-radius:8px;margin-top:-3px;float:left;box-shadow:0 1px 2px rgba(255,255,255,.4),0 -1px 2px rgba(255,255,255,.4)}.drop-marker.horizontal:after{content:"";width:8px;height:8px;background:#00adff;border-radius:8px;margin-top:-3px;float:right;box-shadow:0 1px 2px rgba(255,255,255,.4),0 -1px 2px rgba(255,255,255,.4)}.drop-marker.vertical{height:50px;list-style:none;border:1px solid #00ADFF;position:absolute;margin-left:3px;display:inline;box-shadow:1px 0 2px rgba(255,255,255,.4),-1px 0 2px rgba(255,255,255,.4)}.drop-marker.vertical.leftside{margin-left:0}.drop-marker.vertical.rightside{margin-left:3px}.drop-marker.vertical:before{content:"";width:8px;height:8px;background:#00adff;border-radius:8px;margin-top:-4px;top:0;position:absolute;margin-left:-4px;box-shadow:1px 0 2px rgba(255,255,255,.4),-1px 0 2px rgba(255,255,255,.4)}.drop-marker.vertical:after{content:"";width:8px;height:8px;background:#00adff;border-radius:8px;margin-left:-4px;bottom:-4px;position:absolute;box-shadow:1px 0 2px rgba(255,255,255,.4),-1px 0 2px rgba(255,255,255,.4)}';
        return styles;
    }
});
