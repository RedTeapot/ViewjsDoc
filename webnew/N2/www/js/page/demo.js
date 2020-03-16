;(function(){
	var sections = [
		{
			id: "shi-tu-rong-qi",
			title: "视图容器",
			samples: [
				{
					title: "多视图共享静态Footer",
					desc: "借助视图容器使多个视图共享一个底部导航"
				},
				{
					title: "多视图共享静态Footer",
					desc: "借助视图容器使多个视图共享一个底部导航"
				}
			]
		},
		{
			id: "mo-ren-shi-tu",
			title: "默认视图",
			samples: [
				{
					title: "默认视图1",
					desc: "默认视图描述1"
				},
				{
					title: "默认视图2",
					desc: "默认视图描述2"
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
			sampleObj.innerHTML = '<a class = "sample">\n' +
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