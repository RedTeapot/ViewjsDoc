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
				},
				{
					id: "initialize_2",
					title: "提示用户加载中",
					desc: "页面加载完成之前，用动画等形式降低用户的焦虑感"
				}
			]
		},
		{
			id: "wei-shi-tu",
			title: "伪视图",
			samples: [
				{
					id: "pseudo-view_1",
					title: "视图跳转",
					desc: "使用伪视图进行视图跳转"
				}
			]
		},
		{
			id: "shi-tu-pei-zhi",
			title: "视图配置",
			samples: [
				{
					id: "view-config_1",
					title: "简单使用",
					desc: "实现配置值的设置、读取和使能"
				},
				{
					id: "view-config_2",
					title: "应用配置",
					desc: "在配置项中声明配置项的应用逻辑，在它处应用配置"
				},
				{
					id: "view-config_3",
					title: "样式控制",
					desc: "借助 reflectToDom() 方法，实现“用样式控制界面渲染效果”"
				}
			]
		},
		{
			id: "shi-tu-rong-qi",
			title: "视图容器",
			samples: [
				{
					id: "view-container_1",
					title: "抽取公用元素",
					desc: "使用 data-view-container 属性指定视图容器，以包裹非公用元素"
				},
				{
					id: "view-container_2",
					title: "动态控制公用元素",
					desc: "借助事件监听，动态控制公用 footer 的显示与隐藏"
				}
			]
		},
		{
			id: "shi-tu-shang-xia-wen",
			title: "视图上下文",
			samples: [
				{
					id: "view-context_1",
					title: "视图内存取数据",
					desc: "使用视图上下文在同一视图内存取数据"
				},
				{
					id: "view-context_2",
					title: "跨视图存取数据",
					desc: "使用视图上下文在跨视图存取数据"
				}
			]
		},
		{
			id: "shi-tu-zhi-jie-fang-wen",
			title: "视图直接访问",
			samples: [
				{
					id: "view-directly-accessible_1",
					title: "设置特定视图",
					desc: "所有视图默认都【不能】直接访问，单独设置特定视图是否允许直接访问"
				},
				{
					id: "view-directly-accessible_2",
					title: "设置所有视图",
					desc: "设置所有视图默认都【能】直接访问"
				}
			]
		},
		{
			id: "shi-tu-shi-jian",
			title: "视图事件",
			samples: [
				{
					id: "view-event_1",
					title: "实例事件",
					desc: "实例事件，是 View.js 内置的，发生在视图实例上的事件"
				},
				{
					id: "view-event_2",
					title: "宏观事件",
					desc: "宏观事件，是 View.js 内置的，发生在全局变量：View 上的事件"
				},
				{
					id: "view-event_4",
					title: "事件顺序",
					desc: "观察宏观事件与实例事件的触发顺序"
				},
				{
					id: "view-event_3",
					title: "自定义事件",
					desc: "发起、监听自定义事件"
				}
			]
		},
		{
			id: "shi-tu-ming-cheng",
			title: "视图名称",
			samples: [
				{
					id: "view-name_1",
					title: "视图跳转",
					desc: "使用视图名称完成视图跳转"
				}
			]
		},
		{
			id: "shi-tu-ming-ming-kong-jian",
			title: "视图命名空间",
			samples: [
				{
					id: "view-namespace_1",
					title: "视图跳转",
					desc: "跳转至非默认空间下的目标视图"
				}
			]
		},
		{
			id: "shi-tu-can-shu",
			title: "视图参数",
			samples: [
				{
					id: "view-parameter_1",
					title: "传递参数",
					desc: "在视图跳转时传递参数"
				},
				{
					id: "view-parameter_2",
					title: "参数重置",
					desc: "View.js 在视图即将进入时自动重置参数"
				},
				{
					id: "view-parameter_3",
					title: "参数暂存",
					desc: "View.js 自动将最新的参数存储至视图上下文中"
				}
			]
		},
		{
			id: "shi-tu-xuan-xiang",
			title: "视图选项",
			samples: [
				{
					id: "view-option_1",
					title: "传递选项",
					desc: "在视图跳转时传递视图选项"
				},
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