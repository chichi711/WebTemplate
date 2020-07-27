var self = this;
self.iframe = this.documentFrame.get(0);
window.FrameDocument = self.iframe.contentWindow.document;



frameDoc = $(window.FrameDocument);






$(window.FrameDocument).find("html");
self.frameHtml.on("mousemove touchmove", function (event) {

    if (event.target && isElement(event.target) && event.originalEvent) {
        self.highlightEl = target = jQuery(event.target);
        var offset = target.offset();
        var height = target.outerHeight();
        var halfHeight = Math.max(height / 2, 50);
        var width = target.outerWidth();
        var halfWidth = Math.max(width / 2, 50);

        var x = (event.clientX || event.originalEvent.clientX);
        var y = (event.clientY || event.originalEvent.clientY);
        {

            jQuery("#highlight-box").css(
                {
                    "top": offset.top - self.frameDoc.scrollTop(),
                    "left": offset.left - self.frameDoc.scrollLeft(),
                    "width": width,
                    "height": height,
                    "display": event.target.hasAttribute('contenteditable') ? "none" : "block",
                    "border": self.isDragging ? "1px dashed aqua" : "",//when dragging highlight parent with green
                });

            if (height < 50) {
                jQuery("#section-actions").addClass("outside");
            } else {
                jQuery("#section-actions").removeClass("outside");
            }
            jQuery("#highlight-name").html(self._getElementType(event.target));
            if (self.isDragging) jQuery("#highlight-name").hide(); else jQuery("#highlight-name").show();//hide tag name when dragging
        }
    }
});


function _getElementType (el) {

    //search for component attribute
    componentName = '';

    if (el.attributes)
    for (var j = 0; j < el.attributes.length; j++){

      if (el.attributes[j].nodeName.indexOf('data-component') > -1)
      {
        componentName = el.attributes[j].nodeName.replace('data-component-', '');
      }
    }

    if (componentName != '') return componentName;

    return el.tagName;
}


















function _loadIframe (url) {

    var self = this;
    self.iframe = this.documentFrame.get(0);
    self.iframe.src = url;

    return this.documentFrame.on("load", function()
    {
            window.FrameWindow = self.iframe.contentWindow;
            window.FrameDocument = self.iframe.contentWindow.document;
            var addSectionBox = jQuery("#add-section-box");
            var highlightBox = jQuery("#highlight-box").hide();


            $(window.FrameWindow).on( "beforeunload", function(event) {
                if (Vvveb.Undo.undoIndex <= 0)
                {
                    var dialogText = "You have unsaved changes";
                    event.returnValue = dialogText;
                    return dialogText;
                }
            });

            jQuery(window.FrameWindow).on("scroll resize", function(event) {

                    if (self.selectedEl)
                    {
                        var offset = self.selectedEl.offset();

                        jQuery("#select-box").css(
                            {"top": offset.top - self.frameDoc.scrollTop() ,
                             "left": offset.left - self.frameDoc.scrollLeft() ,
                             "width" : self.selectedEl.outerWidth(),
                             "height": self.selectedEl.outerHeight(),
                             //"display": "block"
                             });

                    }

                    if (self.highlightEl)
                    {
                        var offset = self.highlightEl.offset();

                        highlightBox.css(
                            {"top": offset.top - self.frameDoc.scrollTop() ,
                             "left": offset.left - self.frameDoc.scrollLeft() ,
                             "width" : self.highlightEl.outerWidth(),
                             "height": self.highlightEl.outerHeight(),
                            //  "display": "block"
                             });


                        addSectionBox.hide();
                    }

            });

            Vvveb.WysiwygEditor.init(window.FrameDocument);
            if (self.initCallback) self.initCallback();

            return self._frameLoaded();
    });

}