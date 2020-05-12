;(function(){
	/**
	 * 判断给定的字符串是否是空字符串
	 * @param {String} str 要判断的字符串
	 * @param {Boolean} [trim=false] 是否在判断前执行前后空白符号的裁剪操作
	 */
	var isEmptyString = function(str, trim){
		if(arguments.length < 2)
			trim = false;

		if(null === str || undefined === str)
			return true;

		str = String(str);
		if(trim)
			str = str.trim();

		return str.length === 0;
	};

	/**
	 * 判断给定的对象是否包含指定名称的样式类
	 */
	var hasClass = function(obj, clazz){
		if(isEmptyString(clazz, true))
			return false;

		if(obj.classList && obj.classList.contains)
			return obj.classList.contains(clazz);

		return new RegExp("\\b" + clazz + "\\b", "gim").test(obj.className);
	};

	/**
	 * 为指定的对象添加样式类
	 */
	var addClass = function(obj, clazz){
		if(isEmptyString(clazz, true) || hasClass(obj, clazz))
			return;

		if(obj.classList && obj.classList.add){
			obj.classList.add(clazz);
			return;
		}

		obj.className = (obj.className.trim() + " " + clazz).trim();
	};

	/**
	 * 为指定的对象删除样式类
	 */
	var removeClass = function(obj, clazz){
		if(isEmptyString(clazz, true) || !hasClass(obj, clazz))
			return;

		if(obj.classList && obj.classList.remove){
			obj.classList.remove(clazz);
			return;
		}

		clazz = String(clazz).toLowerCase();
		var arr = obj.className.split(/\s+/), str = "";
		for(var i = 0; i < arr.length; i++){
			var tmp = arr[i];
			if(isEmptyString(tmp, true))
				continue;

			if(tmp.toLowerCase() === clazz)
				continue;

			str += " " + tmp;
		}
		if(str.length > 0)
			str = str.substring(1);
		obj.className = str.trim();
	};

	/**
	 * 为指定的对象切换样式类
	 * @param {HTMLElement} obj DOM元素
	 * @param {String} clazz 样式类名称
	 * @returns {Boolean} 切换后是否含有此样式类
	 */
	var toggleClass = function(obj, clazz){
		if(hasClass(obj, clazz)){
			removeClass(obj, clazz);
			return false;
		}else{
			addClass(obj, clazz);
			return true;
		}
	};

	window.util = {
		isEmptyString: isEmptyString,
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass
	};
})();