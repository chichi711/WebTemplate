/*
Copyright 2017 Ziadin Givan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

https://github.com/givanz/VvvebJs
*/


// Simple JavaScript Templating
// John Resig - https://johnresig.com/ - MIT Licensed
// (function(){
// 	var cache = {};

// 	this.tmpl = function tmpl(str, data){
// 	  // Figure out if we're getting a template, or if we need to
// 	  // load the template - and be sure to cache the result.
// 	  var fn = /^[-a-zA-Z0-9]+$/.test(str) ?
// 		cache[str] = cache[str] ||
// 		  tmpl(document.getElementById(str).innerHTML) :

// 		// Generate a reusable function that will serve as a template
// 		// generator (and which will be cached).
// 		new Function("obj",
// 		  "var p=[],print=function(){p.push.apply(p,arguments);};" +

// 		  // Introduce the data as local variables using with(){}
// 		  "with(obj){p.push('" +

// 		  // Convert the template into pure JavaScript
// 		  str
// 			.replace(/[\r\t\n]/g, " ")
// 			.split("{%").join("\t")
// 			.replace(/((^|%})[^\t]*)'/g, "$1\r")
// 			.replace(/\t=(.*?)%}/g, "',$1,'")
// 			.split("\t").join("');")
// 			.split("%}").join("p.push('")
// 			.split("\r").join("\\'")
// 		+ "');}return p.join('');");
// 	  // Provide some basic currying to the user
// 	  return data ? fn( data ) : fn;
// 	};
//   })();

// 拖曳
function isElement(obj){
	return (typeof obj==="object") &&
	   (obj.nodeType===1) && (typeof obj.style === "object") &&
	   (typeof obj.ownerDocument ==="object")/* && obj.tagName != "BODY"*/;
 }


 let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

 let edit = {};

 edit.defaultComponent = "_base";
 edit.preservePropertySections = true;
 edit.dragIcon = 'icon';//icon = use component icon when dragging | html = use component html to create draggable element

 edit.baseUrl =  document.currentScript?document.currentScript.src.replace(/[^\/]*?\.js$/,''):'';

 edit.ComponentsGroup = {};
 edit.BlocksGroup = {};

 edit.Components = {

	 _components: {},

	 _nodesLookup: {},

	 _attributesLookup: {},

	 _classesLookup: {},

	 _classesRegexLookup: {},

	 componentPropertiesElement: "#right-panel .component-properties",

	 componentPropertiesDefaultSection: "content",

	 get: function(type) {
		 return this._components[type];
	 },

	 add: function(type, data) {
		 data.type = type;

		 this._components[type] = data;

		 if (data.nodes)
		 {
			 for (let i in data.nodes)
			 {
				 this._nodesLookup[ data.nodes[i] ] = data;
			 }
		 }

		 if (data.attributes)
		 {
			 if (data.attributes.constructor === Array)
			 {
				 for (let i in data.attributes)
				 {
					 this._attributesLookup[ data.attributes[i] ] = data;
				 }
			 } else
			 {
				 for (let i in data.attributes)
				 {
					 if (typeof this._attributesLookup[i] === 'undefined')
					 {
						 this._attributesLookup[i] = {};
					 }

					 if (typeof this._attributesLookup[i][ data.attributes[i] ] === 'undefined')
					 {
						 this._attributesLookup[i][ data.attributes[i] ] = {};
					 }

					 this._attributesLookup[i][ data.attributes[i] ] = data;
				 }
			 }
		 }

		 if (data.classes)
		 {
			 for (let i in data.classes)
			 {
				 this._classesLookup[ data.classes[i] ] = data;
			 }
		 }

		 if (data.classesRegex)
		 {
			 for (let i in data.classesRegex)
			 {
				 this._classesRegexLookup[ data.classesRegex[i] ] = data;
			 }
		 }
	 },

	 extend: function(inheritType, type, data) {

		  let newData = data;

		  if (inheritData = this._components[inheritType])
		  {
			 newData = $.extend(true,{}, inheritData, data);
			 newData.properties = $.merge( $.merge([], inheritData.properties?inheritData.properties:[]), data.properties?data.properties:[]);
		  }

		  //sort by order
		  newData.properties.sort(function (a,b)
			 {
				 if (typeof a.sort  === "undefined") a.sort = 0;
				 if (typeof b.sort  === "undefined") b.sort = 0;

				 if (a.sort < b.sort)
					 return -1;
				 if (a.sort > b.sort)
					 return 1;
				 return 0;
			 });
 /*
		 let output = array.reduce(function(o, cur) {

		   // Get the index of the key-value pair.
		   let occurs = o.reduce(function(n, item, i) {
			 return (item.key === cur.key) ? i : n;
		   }, -1);

		   // If the name is found,
		   if (occurs >= 0) {

			 // append the current value to its list of values.
			 o[occurs].value = o[occurs].value.concat(cur.value);

		   // Otherwise,
		   } else {

			 // add the current item to o (but make sure the value is an array).
			 let obj = {name: cur.key, value: [cur.value]};
			 o = o.concat([obj]);
		   }

		   return o;
		 }, newData.properties);
 */

		 this.add(type, newData);
	 },


	 matchNode: function(node) {
		 let component = {};

		 if (!node || !node.tagName) return false;

		 if (node.attributes && node.attributes.length)
		 {
			 //search for attributes
			 for (let i in node.attributes)
			 {
				 if (node.attributes[i])
				 {
				 attr = node.attributes[i].name;
				 value = node.attributes[i].value;

				 if (attr in this._attributesLookup)
				 {
					 component = this._attributesLookup[ attr ];

					 //currently we check that is not a component by looking at name attribute
					 //if we have a collection of objects it means that attribute value must be checked
					 if (typeof component["name"] === "undefined")
					 {
						 if (value in component)
						 {
							 return component[value];
						 }
					 } else
					 return component;
				 }
			 }
			 }

			 for (let i in node.attributes)
			 {
				 attr = node.attributes[i].name;
				 value = node.attributes[i].value;

				 //check for node classes
				 if (attr == "class")
				 {
					 classes = value.split(" ");

					 for (j in classes)
					 {
						 if (classes[j] in this._classesLookup)
						 return this._classesLookup[ classes[j] ];
					 }

					 for (regex in this._classesRegexLookup)
					 {
						 regexObj = new RegExp(regex);
						 if (regexObj.exec(value))
						 {
							 return this._classesRegexLookup[ regex ];
						 }
					 }
				 }
			 }
		 }

		 tagName = node.tagName.toLowerCase();
		 if (tagName in this._nodesLookup) return this._nodesLookup[ tagName ];

		 return false;
		 //return false;
	 },

	 render: function(type) {

		 let component = this._components[type];

		 let componentsPanel = jQuery(this.componentPropertiesElement);
		 let defaultSection = this.componentPropertiesDefaultSection;
		 let componentsPanelSections = {};

		 jQuery(this.componentPropertiesElement + " .tab-pane").each(function ()
		 {
			 let sectionName = this.dataset.section;
			 componentsPanelSections[sectionName] = $(this);

		 });

		 let section = componentsPanelSections[defaultSection].find('.section[data-section="default"]');

		 if (!(edit.preservePropertySections && section.length))
		 {
			 componentsPanelSections[defaultSection].html('').append(tmpl("vvveb-input-sectioninput", {key:"default", header:component.name}));
			 section = componentsPanelSections[defaultSection].find(".section");
		 }

		 componentsPanelSections[defaultSection].find('[data-header="default"] span').html(component.name);
		 section.html("")

		 if (component.beforeInit) component.beforeInit(edit.Builder.selectedEl.get(0));

		 let element;

		 let fn = function(component, property) {
			 return property.input.on('propertyChange', function (event, value, input) {

					 let element = edit.Builder.selectedEl;

					 if (property.child) element = element.find(property.child);
					 if (property.parent) element = element.parent(property.parent);

					 if (property.onChange)
					 {
						 element = property.onChange(element, value, input, component);
					 }/* else */
					 if (property.htmlAttr)
					 {
						 oldValue = element.attr(property.htmlAttr);

						 if (property.htmlAttr == "class" && property.validValues)
						 {
							 element.removeClass(property.validValues.join(" "));
							 element = element.addClass(value);
						 }
						 else if (property.htmlAttr == "style")
						 {
							 element = edit.StyleManager.setStyle(element, property.key, value);
						 }
						 else if (property.htmlAttr == "innerHTML")
						 {
							 element = edit.ContentManager.setHtml(element, value);
						 }
						 else
						 {
							 //if value is empty then remove attribute useful for attributes without values like disabled
							 if (value)
							 {
								 element = element.attr(property.htmlAttr, value);
							 } else
							 {
								 element = element.removeAttr(property.htmlAttr);
							 }
						 }

						 edit.Undo.addMutation({type: 'attributes',
												 target: element.get(0),
												 attributeName: property.htmlAttr,
												 oldValue: oldValue,
												 newValue: element.attr(property.htmlAttr)});
					 }

					 if (component.onChange)
					 {
						 element = component.onChange(element, property, value, input);
					 }

					 if (!property.child && !property.parent) edit.Builder.selectNode(element);

					 return element;
			 });
		 };

		 let nodeElement = edit.Builder.selectedEl;

		 for (let i in component.properties)
		 {
			 let property = component.properties[i];
			 let element = nodeElement;

			 if (property.beforeInit) property.beforeInit(element.get(0))

			 if (property.child) element = element.find(property.child);

			 if (property.data) {
				 property.data["key"] = property.key;
			 } else
			 {
				 property.data = {"key" : property.key};
			 }

			 if (typeof property.group  === 'undefined') property.group = null;

			 property.input = property.inputtype.init(property.data);

			 if (property.init)
			 {
				 property.inputtype.setValue(property.init(element.get(0)));
			 } else if (property.htmlAttr)
			 {
				 if (property.htmlAttr == "style")
				 {
					 //value = element.css(property.key);//jquery css returns computed style
					 let value = edit.StyleManager.getStyle(element, property.key);//getStyle returns declared style
				 } else
				 if (property.htmlAttr == "innerHTML")
				 {
					 let value = edit.ContentManager.getHtml(element);
				 } else
				 {
					 let value = element.attr(property.htmlAttr);
				 }

				 //if attribute is class check if one of valid values is included as class to set the select
				 if (value && property.htmlAttr == "class" && property.validValues)
				 {
					 value = value.split(" ").filter(function(el) {
						 return property.validValues.indexOf(el) != -1
					 });
				 }

				 property.inputtype.setValue(value);
			 }

			 fn(component, property);

			 let propertySection = defaultSection;
			 if (property.section)
			 {
				 propertySection = property.section;
			 }


			 if (property.inputtype == SectionInput)
			 {
				 section = componentsPanelSections[propertySection].find('.section[data-section="' + property.key + '"]');

				 if (edit.preservePropertySections && section.length)
				 {
					 section.html("");
				 } else
				 {
					 componentsPanelSections[propertySection].append(property.input);
					 section = componentsPanelSections[propertySection].find('.section[data-section="' + property.key + '"]');
				 }
			 }
			 else
			 {
				 let row = $(tmpl('vvveb-property', property));
				 row.find('.input').append(property.input);
				 section.append(row);
			 }

			 if (property.inputtype.afterInit)
			 {
				 property.inputtype.afterInit(property.input);
			 }

		 }

		 if (component.init) component.init(edit.Builder.selectedEl.get(0));
	 }
 };

 edit.WysiwygEditor = {

	 isActive: false,
	 oldValue: '',
	 doc:false,

	 init: function(doc) {
		 this.doc = doc;

		 $("#bold-btn").on("click", function (e) {
				 doc.execCommand('bold',false,null);
				 e.preventDefault();
				 return false;
		 });

		 $("#italic-btn").on("click", function (e) {
				 doc.execCommand('italic',false,null);
				 e.preventDefault();
				 return false;
		 });

		 $("#underline-btn").on("click", function (e) {
				 doc.execCommand('underline',false,null);
				 e.preventDefault();
				 return false;
		 });

		 $("#strike-btn").on("click", function (e) {
				 doc.execCommand('strikeThrough',false,null);
				 e.preventDefault();
				 return false;
		 });

		 $("#link-btn").on("click", function (e) {
				 doc.execCommand('createLink',false,"#");
				 e.preventDefault();
				 return false;
		 });
	 },



	 edit: function(element) {
		 element.attr({'contenteditable':true, 'spellcheckker':false});
		 $("#wysiwyg-editor").show();

		 this.element = element;
		 this.isActive = true;
		 this.oldValue = element.html();
	 },

	 destroy: function(element) {
		 element.removeAttr('contenteditable spellcheckker');
		 $("#wysiwyg-editor").hide();
		 this.isActive = false;


		 node = this.element.get(0);
		 edit.Undo.addMutation({type:'characterData',
								 target: node,
								 oldValue: this.oldValue,
								 newValue: node.innerHTML});
	 }
 }

 edit.Builder = {

	 component : {},
	 dragMoveMutation : false,
	 isPreview : false,
	 runJsOnSetHtml : false,
	 designerMode : false,

	 init: function(url, callback) {
		 window.isDirty = false;
		 let self = this;

		 self.loadControlGroups();
		 self.loadBlockGroups();

		 self.selectedEl = null;
		 self.highlightEl = null;
		 self.initCallback = callback;

		 self.documentFrame = $("#iframe-wrapper > iframe");
		 self.canvas = $("#canvas");

		 self._loadIframe(url);

		 self._initDragdrop();

		 self._initBox();

		 self.dragElement = null;
	 },

 /* controls */
	 loadControlGroups : function() {

		 let componentsList = $(".components-list");
		 componentsList.empty();
		 let item = {}, component = {};
		 let count = 0;

		 componentsList.each(function ()
		 {
			 let list = $(this);
			 let type = this.dataset.type;
			 count ++;

			 for (group in edit.ComponentsGroup)
			 {
				 list.append('<li class="header clearfix" data-section="' + group + '"  data-search=""><label class="header" for="' + type + '_comphead_' + group + count + '">' + group + '  <div class="header-arrow"></div>\
										</label><input class="header_check" type="checkbox" checked="true" id="' + type + '_comphead_' + group + count + '">  <ol></ol></li>');

				 let componentsSubList = list.find('li[data-section="' + group + '"]  ol');

				 components = edit.ComponentsGroup[ group ];

				 for (i in components)
				 {
					 componentType = components[i];
					 component = edit.Components.get(componentType);

					 if (component)
					 {
						 item = $('<li data-section="' + group + '" data-drag-type=component data-type="' + componentType + '" data-search="' + component.name.toLowerCase() + '"><a href="#">' + component.name + "</a></li>");

						 if (component.image) {

							 item.css({
								 backgroundImage: "url(" + 'libs/builder/' + component.image + ")",
								 backgroundRepeat: "no-repeat"
							 })
						 }

						 componentsSubList.append(item)
					 }
				 }
			 }
		 });
	  },

	 loadBlockGroups : function() {

		 let blocksList = $(".blocks-list");
		 blocksList.empty();
		 let item = {};

		 blocksList.each(function ()
		 {

			 let list = $(this);
			 let type = this.dataset.type;

			 for (group in edit.BlocksGroup)
			 {
				 list.append('<li class="header" data-section="' + group + '"  data-search=""><label class="header" for="' + type + '_blockhead_' + group + '">' + group + '  <div class="header-arrow"></div>\
										</label><input class="header_check" type="checkbox" checked="true" id="' + type + '_blockhead_' + group + '">  <ol></ol></li>');

				 let blocksSubList = list.find('li[data-section="' + group + '"]  ol');
				 blocks = edit.BlocksGroup[ group ];

				 for (i in blocks)
				 {
					 blockType = blocks[i];
					 block = edit.Blocks.get(blockType);

					 if (block)
					 {
						 item = $('<li data-section="' + group + '" data-drag-type=block data-type="' + blockType + '" data-search="' + block.name.toLowerCase() + '"><a href="#">' + block.name + "</a></li>");

						 if (block.image) {

							 item.css({
								 backgroundImage: "url(" + ((block.image.indexOf('//') == -1) ? 'libs/builder/':'') + block.image + ")",
								 backgroundRepeat: "no-repeat"
							 })
						 }

						 blocksSubList.append(item)
					 }
				 }
			 }
		 });
	  },

	 loadUrl : function(url, callback) {
		 let self = this;
		 jQuery("#select-box").hide();

		 self.initCallback = callback;
		 if (edit.Builder.iframe.src != url) edit.Builder.iframe.src = url;
	 },

 /* iframe */
	 _loadIframe : function(url) {

		 let self = this;
		 self.iframe = this.documentFrame.get(0);
		 self.iframe.src = url;

		 return this.documentFrame.on("load", function()
		 {
				 window.FrameWindow = self.iframe.contentWindow;
				 window.FrameDocument = self.iframe.contentWindow.document;
				 let highlightBox = jQuery("#highlight-box").hide();



				 jQuery(window.FrameWindow).on("scroll resize", function(event) {

						 if (self.selectedEl)
						 {
							 let offset = self.selectedEl.offset();

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
							 let offset = self.highlightEl.offset();

							 highlightBox.css(
								 {"top": offset.top - self.frameDoc.scrollTop() ,
								  "left": offset.left - self.frameDoc.scrollLeft() ,
								  "width" : self.highlightEl.outerWidth(),
								  "height": self.highlightEl.outerHeight(),
								 //  "display": "block"
								  });


						 }

				 });

				 edit.WysiwygEditor.init(window.FrameDocument);
				 if (self.initCallback) self.initCallback();

				 return self._frameLoaded();
		 });

	 },

	 _frameLoaded : function() {

		 let self = edit.Builder;

		 self.frameDoc = $(window.FrameDocument);
		 self.frameHtml = $(window.FrameDocument).find("html");
		 self.frameBody = $(window.FrameDocument).find("body");
		 self.frameHead = $(window.FrameDocument).find("head");

		 //insert editor helpers like non editable areas
		 self.frameHead.append('<link data-vvveb-helpers href="/stylesheets/css/vvvebjs-editor-helpers.css" rel="stylesheet">');

		 self._initHighlight();

		 $(window).triggerHandler("edit.iframe.loaded", self.frameDoc);
	 },

	 _getElementType: function(el) {

		 //search for component attribute
		 componentName = '';

		 if (el.attributes)
		 for (let j = 0; j < el.attributes.length; j++){

		   if (el.attributes[j].nodeName.indexOf('data-component') > -1)
		   {
			 componentName = el.attributes[j].nodeName.replace('data-component-', '');
		   }
		 }

		 if (componentName != '') return componentName;

		 return el.tagName;
	 },

	 loadNodeComponent:  function(node) {
		 console.log("load");
		 data = edit.Components.matchNode(node);
		 let component;

		 if (data)
			 component = data.type;
		 else
			 component = edit.defaultComponent;

		 edit.Components.render(component);

	 },

	 selectNode:  function(node) {
		 console.log("select");
		 let self = this;

		 if (!node)
		 {
			 jQuery("#select-box").hide();
			 return;
		 }

		 if (self.texteditEl && self.selectedEl.get(0) != node)
		 {
			 edit.WysiwygEditor.destroy(self.texteditEl);
			 jQuery("#select-box").removeClass("text-edit").find("#select-actions").show();
			 self.texteditEl = null;
		 }

		 let target = jQuery(node);

		 if (target)
		 {
			 self.selectedEl = target;

			 try {
				 let offset = target.offset();

				 jQuery("#select-box").css(
					 {"top": offset.top - self.frameDoc.scrollTop() ,
					  "left": offset.left - self.frameDoc.scrollLeft() ,
					  "width" : target.outerWidth(),
					  "height": target.outerHeight(),
					  "display": "block",
					  });
			 } catch(err) {
				 console.log(err);
				 return false;
			 }
		 }

		 jQuery("#highlight-name").html(this._getElementType(node));

	 },

 /* iframe highlight */
	 _initHighlight: function() {

		 let self = edit.Builder;

		 self.frameHtml.on("mousemove touchmove", function(event) {

			 if (event.target && isElement(event.target) && event.originalEvent)
			 {
				 self.highlightEl = target = jQuery(event.target);
				 let offset = target.offset();
				 let height = target.outerHeight();
				 let halfHeight = Math.max(height / 2, 50);
				 let width = target.outerWidth();
				 let halfWidth = Math.max(width / 2, 50);

				 let x = (event.clientX || event.originalEvent.clientX);
				 let y = (event.clientY || event.originalEvent.clientY);

				 if (self.isDragging)
				 {
					 let parent = self.highlightEl;

					 try {
						 if (event.originalEvent)
						 {
							 if ((offset.top  < (y - halfHeight)) || (offset.left  < (x - halfWidth)))
							 {
								  if (isIE11)
									 self.highlightEl.append(self.dragElement);
								  else
									 self.dragElement.appendTo(parent);
							 } else
							 {
								 if (isIE11)
								  self.highlightEl.prepend(self.dragElement);
								 else
									 self.dragElement.prependTo(parent);
							 };

							 if (self.designerMode)
							 {
								 let parentOffset = self.dragElement.offsetParent().offset();

								 self.dragElement.css({
									 "position": "absolute",
									 'left': x - (parentOffset.left - self.frameDoc.scrollLeft()),
									 'top': y - (parentOffset.top - self.frameDoc.scrollTop()),
									 });
							 }
						 }

					 } catch(err) {
						 console.log(err);
						 return false;
					 }

					 if (!self.designerMode && self.iconDrag) self.iconDrag.css({'left': x + 275/*left panel width*/, 'top':y - 30 });
				 }// else //uncomment else to disable parent highlighting when dragging
				 {

					 jQuery("#highlight-box").css(
						 {"top": offset.top - self.frameDoc.scrollTop() ,
						  "left": offset.left - self.frameDoc.scrollLeft() ,
						  "width" : width,
						  "height": height,
						   "display" : event.target.hasAttribute('contenteditable')?"none":"block",
						   "border":self.isDragging?"1px dashed aqua":"",//when dragging highlight parent with green
						  });

					 if (height < 50)
					 {
						 jQuery("#section-actions").addClass("outside");
					 } else
					 {
						 jQuery("#section-actions").removeClass("outside");
					 }
					 jQuery("#highlight-name").html(self._getElementType(event.target));
					 if (self.isDragging) jQuery("#highlight-name").hide(); else jQuery("#highlight-name").show();//hide tag name when dragging
				 }
			 }

		 });

		 self.frameHtml.on("mouseup touchend", function(event) {
			 if (self.isDragging)
			 {
				 self.isDragging = false;
				 if (self.iconDrag) self.iconDrag.remove();
				 $("#component-clone").remove();

				 if (self.dragMoveMutation === false)
				 {
					 if (self.component.dragHtml) //if dragHtml is set for dragging then set real component html
					 {
						 newElement = $(self.component.html);
						 self.dragElement.replaceWith(newElement);
						 self.dragElement = newElement;
					 }
					 if (self.component.afterDrop) self.dragElement = self.component.afterDrop(self.dragElement);
				 }

				 self.dragElement.css("border", "");

				 node = self.dragElement.get(0);
				 self.selectNode(node);
				 self.loadNodeComponent(node);

				 if (self.dragMoveMutation === false)
				 {
					 edit.Undo.addMutation({type: 'childList',
											 target: node.parentNode,
											 addedNodes: [node],
											 nextSibling: node.nextSibling});
				 } else
				 {
					 self.dragMoveMutation.newParent = node.parentNode;
					 self.dragMoveMutation.newNextSibling = node.nextSibling;

					 edit.Undo.addMutation(self.dragMoveMutation);
					 self.dragMoveMutation = false;
				 }
			 }
		 });

		 self.frameHtml.on("dblclick", function(event) {

			 if (edit.Builder.isPreview == false)
			 {
				 self.texteditEl = target = jQuery(event.target);

				 edit.WysiwygEditor.edit(self.texteditEl);

				 self.texteditEl.attr({'contenteditable':true, 'spellcheckker':false});

				 self.texteditEl.on("blur keyup paste input", function(event) {

					 jQuery("#select-box").css({
							 "width" : self.texteditEl.outerWidth(),
							 "height": self.texteditEl.outerHeight()
						  });
				 });

				 jQuery("#select-box").addClass("text-edit").find("#select-actions").hide();
				 jQuery("#highlight-box").hide();
			 }
		 });


		 self.frameHtml.on("click", function(event) {
			 if (edit.Builder.isPreview == false)
			 {
				 if (event.target)
				 {
					 //if component properties is loaded in left panel tab instead of right panel show tab
					 if ($(".component-properties-tab").is(":visible"))//if properites tab is enabled/visible
						 $('.component-properties-tab a').show().tab('show');

					 self.selectNode(event.target);
					 self.loadNodeComponent(event.target);
				 }

				 event.preventDefault();
				 return false;
			 }

		 });

	 },

	 _initBox: function() {
		 let self = this;

		 $("#drag-btn").on("mousedown", function(event) {
			 jQuery("#select-box").hide();
			 self.dragElement = self.selectedEl.css("position","");
			 self.isDragging = true;

			 node = self.dragElement.get(0);

			 self.dragMoveMutation = {type: 'move',
								 target: node,
								 oldParent: node.parentNode,
								 oldNextSibling: node.nextSibling};

			 //self.selectNode(false);
			 event.preventDefault();
			 return false;
		 });

		 $("#down-btn").on("click", function(event) {
			 jQuery("#select-box").hide();

			 node = self.selectedEl.get(0);
			 oldParent = node.parentNode;
			 oldNextSibling = node.nextSibling;

			 next = self.selectedEl.next();

			 if (next.length > 0)
			 {
				 next.after(self.selectedEl);
			 } else
			 {
				 self.selectedEl.parent().after(self.selectedEl);
			 }

			 newParent = node.parentNode;
			 newNextSibling = node.nextSibling;

			 edit.Undo.addMutation({type: 'move',
									 target: node,
									 oldParent: oldParent,
									 newParent: newParent,
									 oldNextSibling: oldNextSibling,
									 newNextSibling: newNextSibling});

			 event.preventDefault();
			 return false;
		 });

		 $("#up-btn").on("click", function(event) {
			 jQuery("#select-box").hide();

			 node = self.selectedEl.get(0);
			 oldParent = node.parentNode;
			 oldNextSibling = node.nextSibling;

			 next = self.selectedEl.prev();

			 if (next.length > 0)
			 {
				 next.before(self.selectedEl);
			 } else
			 {
				 self.selectedEl.parent().before(self.selectedEl);
			 }

			 newParent = node.parentNode;
			 newNextSibling = node.nextSibling;

			 edit.Undo.addMutation({type: 'move',
									 target: node,
									 oldParent: oldParent,
									 newParent: newParent,
									 oldNextSibling: oldNextSibling,
									 newNextSibling: newNextSibling});

			 event.preventDefault();
			 return false;
		 });

		 $("#delete-btn").on("click", function(event) {
			 jQuery("#select-box").hide();

			 node = self.selectedEl.get(0);

			 edit.Undo.addMutation({type: 'childList',
									 target: node.parentNode,
									 removedNodes: [node],
									 nextSibling: node.nextSibling});

			 self.selectedEl.remove();

			 event.preventDefault();
			 return false;
		 });

		 let addSectionElement = {};



		 function addSectionComponent(html, after = true)
		 {
			 let node = $(html);

			 if (after)
			 {
				 addSectionElement.after(node);
			 } else
			 {
				 addSectionElement.append(node);
			 }

			 node = node.get(0);

			 edit.Undo.addMutation({type: 'childList',
									 target: node.parentNode,
									 addedNodes: [node],
									 nextSibling: node.nextSibling});
		 }

		 $(".components-list li ol li").on("click", function(event) {
			 let html = edit.Components.get(this.dataset.type).html;

			 addSectionComponent(html, (jQuery("[name='add-section-insert-mode']:checked").val() == "after"));

		 });

		 $(".blocks-list li ol li").on("click", function(event) {
			 let html = edit.Blocks.get(this.dataset.type).html;

			 addSectionComponent(html, (jQuery("[name='add-section-insert-mode']:checked").val() == "after"));

		 });

	 },

 /* drag and drop */
	 _initDragdrop : function() {

		 let self = this;
		 self.isDragging = false;

		 $('#dragitemslistcontainer > li').on("mousedown touchstart", function(event) {

			 $this = jQuery(this);
			//  $("#component-clone").remove();

			//  if ($this.data("drag-type") == "component")
			// 	 self.component = edit.Components.get($this.data("type"));
			//  else
			// 	 self.component = edit.Blocks.get($this.data("type"));

			//  if (self.component.dragHtml)
			//  {
			// 	 html = self.component.dragHtml;
			//  } else
			//  {
			// 	 html = self.component.html;
			//  }

			//  self.dragElement = $(html);
			//  self.dragElement.css("border", "1px dashed #4285f4");

			//  if (self.component.dragStart) self.dragElement = self.component.dragStart(self.dragElement);

			//  self.isDragging = true;
			//  if (edit.dragIcon == 'html')
			//  {
			// 	 self.iconDrag = $(html).attr("id", "dragElement-clone").css('position', 'absolute');
			//  }
			//  else if (self.designerMode == false)
			//  {
			// 	 self.iconDrag = $('<img src=""/>').attr({"id": "dragElement-clone", 'src': $this.css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1')}).
			// 	 css({'z-index':100, 'position':'absolute', 'width':'64px', 'height':'64px', 'top': event.originalEvent.y, 'left': event.originalEvent.x});
			//  }

			//  $('body').append(self.iconDrag);

			//  event.preventDefault();
			//  return false;
		 });

	 },

	 removeHelpers: function (html, keepHelperAttributes = false)
	 {
		 //tags like stylesheets or scripts
		 html = html.replace(/<.*?data-vvveb-helpers.*?>/gi, "");
		 //attributes
		 if (!keepHelperAttributes)
		 {
			 html = html.replace(/\s*data-vvveb-\w+(=["'].*?["'])?\s*/gi, "");
		 }

		 return html;
	 },

	 setDesignerMode: function(designerMode = false)
	 {
		 this.designerMode = designerMode;
	 }

 };

//  Vvveb.StyleManager = {
// 	setStyle: function(element, styleProp, value) {
// 		return element.css(styleProp, value);
// 	},


// 	_getCssStyle: function(element, styleProp){
// 		var value = "";
// 		var el = element.get(0);

// 		if (el.style && el.style.length > 0 && el.style[styleProp])//check inline
// 			var value = el.style[styleProp];
// 		else
// 		if (el.currentStyle)	//check defined css
// 			var value = el.currentStyle[styleProp];
// 		else if (window.getComputedStyle)
// 		{
// 			var value = document.defaultView.getDefaultComputedStyle ?
// 							document.defaultView.getDefaultComputedStyle(el,null).getPropertyValue(styleProp) :
// 							window.getComputedStyle(el,null).getPropertyValue(styleProp);
// 		}

// 		return value;
// 	},

// 	getStyle: function(element,styleProp){
// 		return this._getCssStyle(element, styleProp);
// 	}
// }

edit.Undo = {

	undos: [],
	mutations: [],
	undoIndex: -1,
	enabled:true,
	/*
	init: function() {
	},
	*/
	addMutation : function(mutation) {
		/*
			this.mutations.push(mutation);
			this.undoIndex++;
		*/
		edit.Builder.frameBody.trigger("edit.undo.add");
		this.mutations.splice(++this.undoIndex, 0, mutation);
	 },

	restore : function(mutation, undo) {

		switch (mutation.type) {
			case 'childList':

				if (undo == true)
				{
					addedNodes = mutation.removedNodes;
					removedNodes = mutation.addedNodes;
				} else //redo
				{
					addedNodes = mutation.addedNodes;
					removedNodes = mutation.removedNodes;
				}

				if (addedNodes) for(i in addedNodes)
				{
					node = addedNodes[i];
					if (mutation.nextSibling)
					{
						mutation.nextSibling.parentNode.insertBefore(node, mutation.nextSibling);
					} else
					{
						mutation.target.append(node);
					}
				}

				if (removedNodes) for(i in removedNodes)
				{
					node = removedNodes[i];
					node.parentNode.removeChild(node);
				}
			break;
			case 'move':
				if (undo == true)
				{
					parent = mutation.oldParent;
					sibling = mutation.oldNextSibling;
				} else //redo
				{
					parent = mutation.newParent;
					sibling = mutation.newNextSibling;
				}

				if (sibling)
				{
					sibling.parentNode.insertBefore(mutation.target, sibling);
				} else
				{
					parent.append(node);
				}
			break;
			case 'characterData':
			  mutation.target.innerHTML = undo ? mutation.oldValue : mutation.newValue;
			  break;
			case 'attributes':
			  value = undo ? mutation.oldValue : mutation.newValue;

			  if (value || value === false || value === 0)
				mutation.target.setAttribute(mutation.attributeName, value);
			  else
				mutation.target.removeAttribute(mutation.attributeName);

			break;
		}

		edit.Builder.frameBody.trigger("edit.undo.restore");
	 },

	undo : function() {
		if (this.undoIndex >= 0) {
		  this.restore(this.mutations[this.undoIndex--], true);
		}
	 },

	redo : function() {
		if (this.undoIndex < this.mutations.length - 1) {
		  this.restore(this.mutations[++this.undoIndex], false);
		}
	},

	hasChanges : function() {
		return this.mutations.length;
	},
};

