;(function(){
	var sections = [
		{
			id: "mo-ren-shi-tu",
			title: "默认视图",
			samples: [
				{
					id: "default-view_1",
					title: "自动识别默认视图",
					desc: "没有单独指定时，View.js将使用第一个视图作为默认视图"
				},
				{
					id: "default-view_2",
					title: "手动设定默认视图",
					desc: "手动设置特定视图作为默认视图"
				}
			]
		},
		{
			id: "hui-tui-shi-tu",
			title: "回退视图",
			samples: [
				{
					id: "fallback-view_1",
					title: "手动设置回退视图",
					desc: "设置回退视图后，不能直接访问的视图在刷新后可以呈现“父”视图"
				}
			]
		},
		{
			id: "chu-shi-hua",
			title: "初始化",
			samples: [
				{
					id: "initialize_1",
					title: "运行环境准备",
					desc: "初始化 View.js 前，执行：加载配置、token登录、加载用户数据等"
				}
			]
		}
	];

	var find = function(rootObj, selector){
		if(arguments.length === 1){
			selector = arguments[0];
			rootObj = document.body;
		}

		return rootObj.querySelector(selector);
	};

	var asideObj = find("aside"),
		articleObj = find("article"),
		contactObj = find(".contact");

	sections.forEach(function(section, i){
		var sectionObj = document.createElement("section");
		sectionObj.id = section.id;
		sectionObj.innerHTML = '<div class = "title"></div>\n' +
			'<div class = "content"></div>';

		find(sectionObj, ".title").innerHTML = section.title;
		var sectionConententObj = find(sectionObj, ".content");
		section.samples.forEach(function(sample){
			var sampleObj = document.createElement("sample");
			sampleObj.className = "sample-wrapper";
			sampleObj.innerHTML = '<a target = "_blank" class = "sample">\n' +
				'\t\t<div class = "title"></div>\n' +
				'\t\t<div class = "desc"></div>\n' +
				'\t</a>';

			find(sampleObj, "a").href = "editor.html?demo=" + sample.id;
			find(sampleObj, ".title").innerHTML = sample.title;
			find(sampleObj, ".desc").innerHTML = sample.desc;

			sectionConententObj.appendChild(sampleObj);
		});
		articleObj.insertBefore(sectionObj, contactObj);

		var menuItemObj = document.createElement("a");
		menuItemObj.innerHTML = section.title;
		menuItemObj.setAttribute("data-id", section.id);
		menuItemObj.href = "#" + section.id;

		if(i === 0)
			menuItemObj.className = "active";

		asideObj.appendChild(menuItemObj);
	});

	var switchActiveSection = function(sectionId){
		var obj = find(asideObj, "[data-id=" + sectionId + "]");

		var activeObj = find(asideObj, ".active");
		if(activeObj === obj)
			return;

		activeObj.classList.remove("active");
		obj.classList.add("active");
	};

	asideObj.addEventListener("click", function(e){
		if(e.target.tagName !== "A")
			return;
		switchActiveSection(e.target.getAttribute("data-id"));
	});
})();

;(function(){
	var headerObj = document.querySelector("header"),
		headerContainerObj = headerObj.querySelector(".container"),
		mainObj = document.querySelector(".main"),
		articleObj = document.querySelector("article");

	var layout = function(){
		var height = window.innerHeight;
		var h = (height - headerObj.offsetHeight) + "px";

		mainObj.style.height = h;

		var offset = (headerObj.offsetWidth - headerContainerObj.offsetWidth) / 2;
		articleObj.style.paddingRight = offset + "px";
		mainObj.style.paddingLeft = (offset) + "px";
	};
	layout();
	window.addEventListener("resize", layout);
})();