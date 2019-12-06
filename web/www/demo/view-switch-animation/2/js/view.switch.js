;(function(){
	var timer;

	/**
	 * 动画持续时长，需要与css中定义的动画时长一致
	 * @type {number}
	 */
	var animationDuration = 600;

	/**
	 * 清除给定DOM元素上声明的动画样式
	 * @param {HTMLElement} obj
	 */
	var clear = function(obj){
		if(!obj)
			return;

		"hideToLeft, showFromRight, hideToRight, showFromLeft".split(/\s*,\s*/).forEach(function(className){
			obj.classList.remove(className);
		});
	};

	/**
	 * @param {Object} meta 切换信息
	 * @param {HTMLElement} meta.srcElement 视图切换时，要离开的当前视图对应的DOM元素。可能为null
	 * @param {HTMLElement} meta.targetElement 视图切换时，要进入的目标视图对应的DOM元素
	 * @param {String} type 视图切换方式
	 * @param {String} trigger 视图切换触发器
	 * @param {Function} render 渲染句柄
	 */
	View.setSwitchAnimation(function(meta){
		var srcElement = meta.srcElement,
			tarElement = meta.targetElement,
			type = meta.type,
			trigger = meta.trigger,
			render = meta.render;
		
		/**
		 * 动画播放前清除可能存在的动画样式
		 */
		clear(srcElement);
		clear(tarElement);

		/**
		 * 调用View.js传递而来的渲染句柄，完成活动视图的切换，包括：
		 * 1. 视图参数的传递
		 * 2. 活动视图样式类的切换
		 * 3. leave，ready、enter等事件的触发
		 */
		render();

		var isNav = type === View.SWITCHTYPE_VIEWNAV,
			isChange = type === View.SWITCHTYPE_VIEWCHANGE,
			isHistoryBack = type === View.SWITCHTYPE_HISTORYBACK,
			isHistoryForward = type === View.SWITCHTYPE_HISTORYFORWARD;
		
		if(/\bsafari\b/i.test(navigator.userAgent) && (isHistoryBack || isHistoryForward) && trigger === View.SWITCHTRIGGER_NAVIGATOR)
			return;

		/**
		 * 视图切换动作是“替换堆栈”的方式，或浏览器不支持对history的操作
		 */
		if(!View.checkIfBrowserHistorySupportsPushPopAction() || isChange){
			srcElement.classList.add("fadeOut");
			tarElement.classList.add("fadeIn");
		}else if(isHistoryForward || isNav){
			/**
			 * 视图切换动作是“压入堆栈”的方式（浏览器前进，或代码触发）
			 */

			srcElement.classList.add("hideToLeft");
			tarElement.classList.add("showFromRight");
		}else{
			/**
			 * 视图切换动作是“弹出堆栈”的方式（浏览器后退）
			 */

			srcElement.classList.add("hideToRight");
			tarElement.classList.add("showFromLeft");
		}

		/**
		 * 动画播放完成后清除动画样式
		 */
		clearTimeout(timer);
		timer = setTimeout(function(){
			clear(srcElement);
			clear(tarElement);
		}, animationDuration);
	});
})();