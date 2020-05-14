;(function(){
	var headerObj = document.querySelector("header"),
		mainObj = document.querySelector(".main");

	var layout = function(){
		var height = window.innerHeight;
		var h = (height - headerObj.offsetHeight) + "px";

		mainObj.style.height = h;
	};
	layout();
	window.addEventListener("resize", layout);
})();

;(function(){
	var editorObj = document.querySelector(".editor");
	var htmlTabObj = document.querySelector(".tab [data-lang=html]"),
		cssTabObj = document.querySelector(".tab [data-lang=css]"),
		jsTabObj = document.querySelector(".tab [data-lang=js]");
	var runObj = document.querySelector(".run");

	htmlTabObj.addEventListener("click", function(){
		editorObj.setAttribute("data-tab", "html");
	});
	cssTabObj.addEventListener("click", function(){
		editorObj.setAttribute("data-tab", "css");
	});
	jsTabObj.addEventListener("click", function(){
		editorObj.setAttribute("data-tab", "js");
	});

	var ajax = function(url, ops){
		ops = ops || {};

		var xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function(){
			if(this.readyState !== 4)
				return;

			ops.oncomplete && ops.oncomplete(this.responseText, this.status);

			if(this.status === 200){
				ops.onsuccess && ops.onsuccess.call(window, this.responseText);
			}else
				ops.onfailure && ops.onfailure.call(window, this.responseText, this.status);
		};
		xhr.send();
	};

	document.addEventListener("DOMContentLoaded", function(){
		var ops = {
			fontSize: 16,
			useSoftTabs: false
		};

		var htmlEditor = ace.edit(document.querySelector(".editor .html"), ops),
			externalCssUrls = null,
			cssEditor = ace.edit(document.querySelector(".editor .css"), ops),
			jsEditor = ace.edit(document.querySelector(".editor .js"), ops);

		htmlEditor.setTheme("ace/theme/xcode");
		cssEditor.setTheme("ace/theme/xcode");
		jsEditor.setTheme("ace/theme/xcode");

		htmlEditor.session.setMode("ace/mode/html");
		cssEditor.session.setMode("ace/mode/css");
		jsEditor.session.setMode("ace/mode/javascript");

		var appendJs = "";

		/**
		 * 执行编辑器代码
		 * @param {Object} ctrl 执行控制
		 * @param {Boolean} [ctrl.ifSpecifyViewjsInitializer=true] 编辑器中的代码是否声明自己的 initializer
		 * @param {Boolean} [ctrl.requireViewjsInitialized=true] 执行脚本时，是否要求View.js已经初始化
		 */
		var run = function(ctrl){
			var iframeObj = document.querySelector("iframe"),
				overviewObj = document.querySelector(".overview");
			iframeObj.src = "editor_preview.html?v=" + Date.now();

			iframeObj.onload = function(){
				if(Array.isArray(externalCssUrls)){
					for(var i = 0; i < externalCssUrls.length; i++){
						var linkObj = document.createElement("link");
						linkObj.rel = "stylesheet";
						linkObj.href = externalCssUrls[i];

						this.contentDocument.head.appendChild(linkObj);
					}
				}

				this.contentWindow.apply(htmlEditor.getValue(), cssEditor.getValue(), jsEditor.getValue() + "\n" + appendJs, ctrl);
			};
			clearInterval(iframeObj.timer);
			iframeObj.timer = setInterval(function(){
				var titleObj = overviewObj.querySelector(".title"),
					locationObj = overviewObj.querySelector(".location");

				var title = iframeObj.contentDocument.title,
					location = iframeObj.contentWindow.location.href;

				var oldTitle = titleObj.innerText.trim(),
					oldLocation = locationObj.value.trim();

				if(title != oldTitle)
					titleObj.innerHTML = title;
				if(location != oldLocation)
					locationObj.value = location;
			}, 20);
		};

		/* 自动加载并运行代码 */
		var demo = /\bdemo=([^&#]*)\b/i.exec(location.search);
		if(null != demo){
			demo = decodeURIComponent(demo[1]).trim();
			if("" !== demo){
				htmlEditor.setReadOnly(true);
				cssEditor.setReadOnly(true);
				jsEditor.setReadOnly(true);

				ajax("demo/" + demo + ".html", {
					onsuccess: function(content){
						var tmpObj = document.createElement("div");
						tmpObj.innerHTML = content;

						var markupObj = tmpObj.querySelector("markup"),
							styleLinkObjObjs = tmpObj.querySelectorAll("link[rel=stylesheet]"),
							styleObj = tmpObj.querySelector("style"),
							scriptObj = tmpObj.querySelector("script");

						if(null != markupObj)
							htmlEditor.setValue(markupObj.innerHTML);
						if(0 !== styleLinkObjObjs.length){
							externalCssUrls = [];
							for(var i = 0; i < styleLinkObjObjs.length; i++)
								externalCssUrls.push(styleLinkObjObjs[i].href);
						}
						if(null != styleObj)
							cssEditor.setValue(styleObj.innerHTML);
						if(null != scriptObj)
							jsEditor.setValue(scriptObj.innerHTML);

						var scriptAppendObj = tmpObj.querySelector("script.append");
						if(null != scriptAppendObj)
							appendJs = scriptAppendObj.innerHTML.trim();

						/* 执行控制 */
						var ctrl = {
							/* 是否声明自己的 initializer */
							ifSpecifyViewjsInitializer: false,
							/* 是否要求 View.js 完成初始化 */
							requireViewjsInitialized: true
						};
						var scriptCtrlObj = tmpObj.querySelector("script.ctrl");
						if(null != scriptCtrlObj){
							eval("ctrl = " + scriptCtrlObj.innerHTML.trim());
						}

						run(ctrl);

						/* 运行代码 */
						runObj.addEventListener("click", function(){
							run(ctrl);
						});
					},
					oncomplete: function(){
						htmlEditor.setReadOnly(false);
						cssEditor.setReadOnly(false);
						jsEditor.setReadOnly(false);
					}
				});
			}
		}
	});
})();