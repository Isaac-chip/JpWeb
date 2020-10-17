(function ($) {
	
     if (!('console' in window)) {
          window.console = {};
          window.console.log = function(str){
              return str;
          };
     }
	
	/* document ready */
	
	$(function(){
	ut.jsLoader.init();
	ut.windowonresize();
	ut.windowonscroll();
	});
	
	/* jquery extends */
	
	ut = {
		
	/* javascript file loader */

	jsLoader : {
		init: function (){
			scriptTags = document.getElementsByTagName('script');
			myFileName = /util\.js/;
			for (var s = 0, len = scriptTags.length; s < len; s++) {
				var stag = scriptTags.item(s);
				if(stag.src.match(myFileName)) {
					my = stag;
					break;
				}
			};
			loadedScript = {}
		},
		loadScript : function(src, callback) {
			if(!callback) callback = function(){};
			if(loadedScript[src] == undefined) {
				loadedScript[src] = false;
				var head = document.getElementsByTagName("head")[0] || document.documentElement;
				var script = document.createElement('script');
				script.type= 'text/javascript';
				script.src = my.src.replace(myFileName, src);
				function onloaded() {loadedScript[src] = true; callback()};
				script.onload = onloaded;
				script.onreadystatechange = function(){
					if(this.readyState=="loaded"||this.readyState=="complete") onloaded();
				}
				
				head.appendChild(script);
			}
		}
	},
	
	/* get useragent */
	
	userAgent : window.navigator.userAgent,
	
	/* check function */
	
	canTouch : ('ontouchstart' in window),
	hasOrientation : ('orientation' in window),
	
	/* get parsed URI */
	
	parseURI : function (uri) {
		var _anchor = document.createElement('a');
		_anchor.href = uri;
		var apath = $.support.hrefNormalized ? _anchor.getAttribute("href") : $(_anchor).attr('href');
		var m = uri.match(/(\w+:)?(\/\/)?((\w+):?(\w+)?@)?([^\/\?:#]+)?:?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)?/);
		var querys = {};
		if(m[9]) {
			for(var q = 0, _arr = m[9].split('&'), _query = _arr[0]; _query; _query = _arr[q++]) {
				var _queryset = _query.split('=');
				if(_queryset.length == 2) querys[_queryset[0]] = _queryset[1];
			}
		}
		return m ? {"absolute":apath, "scheme":m[1], "username":m[4], "password":m[5], "host":m[6], "port":m[7], "path":m[8], "querys":querys, "fragment":m[10]} : null;
	},
	
	/* get window size & scroll position */
	
	windowonresize : function () {
		function check(e) {
			ut.windowW = document.documentElement.clientWidth || window.innerWidth;
			ut.windowH = document.documentElement.clientHeight || window.innerHeight;
		}
		check(); $(window).on("resize", check);
	},
	
	windowonscroll : function () {
		function check(e) {
			ut.scrollX = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
			ut.scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		}
		check(); $(window).on("scroll", check);
	},
	
	/* smooth scrolling */
	
	scrollTimeout : 0,
	smoothScroll : function (targetId, speed, offset) {
		var _speed = speed || 10;
		var _offset = offset || 0;
		var _targetStr = targetId ? targetId.replace(/.*#/,"#") : '#';
		var _targetelm = $(_targetStr);
		var start = ut.scrollY;
		var end = ((_targetStr != '#') ? _targetelm.offset().top : 0);
		end -= _offset;
		
		
		var documentH = document.documentElement.scrollHeight || document.body.scrollHeight;
		var scrollTimeout;
		if(Math.abs(start - end) < (ut.windowH * 2)) _speed /= 2;
		if(ut.userAgent.match(/MSIE/)) _speed /= 2;
		
		if(documentH - ut.windowH < end) end = documentH - ut.windowH;
		function scroll() {
			if(Math.abs(start - end) > 1) {
				start -= (start - end) / _speed;
				window.scrollTo(0, start);
			} else {
				cancel ();
				//window.location.hash = targetId.replace(/.*#/,"");
				window.scrollTo(0, end);
				
				
			}
		}
		function cancel () {
			clearInterval(ut.scrollTimeout);
			$(window).off("touchstart mousewheel", cancel);
			$('html,body').stop();
		}
		cancel ();
		$('html,body').on("touchstart mousewheel", cancel);
		ut.scrollTimeout = setInterval(scroll, 20);
	}
	};
	
	$.fn.smoothScrollLink = function (option) {
		var c = $.extend({speed:10, offset:0}, option);
		this.filter("[href^=#]").each(function(index, element) {
			$(element).click( function (e) {
				ut.smoothScroll(e.currentTarget.href, c.speed, c.offset);
				return false;
			});
		});
		return this;
	}

	/* check self link */
	
	/*$.fn.checkSelfLink = function (option) {
		this.find(document.links).not("[href^=#], [href$=javascript]").each(function(index, element) {
			if((ut.parseURI(element.href).host === ut.parseURI(window.location.href).host) && (ut.parseURI(element.href).path === ut.parseURI(window.location.href).path)) {
				$(element).addClass('selfLink')
				.find('img:eq(0)').each(function(index, img) {
					if(img.buttonImage) $(img).buttonImage({action:"on"});
				});
			}
		});
		return this;
	}*/
	
	/* check parent link */
	
	/*$.fn.checkParentLink = function (option) {
		this.find(document.links).not("[href^=#]").each(function(index, element) {
			if(new RegExp(element.href).test(window.location.href) && (ut.parseURI(element.href).path !== ut.parseURI(window.location.href).path)) {
				$(element).addClass('parentLink')
				.find('img').each(function(index, img) {
					if(img.buttonImage) $(img).buttonImage({action:"on_enabled"});
				});
			}
		});
		return this;
	}*/
	
	/* popup window */
	
	ut.windowopen = function (href, target, option) {
		var c = $.extend({width:800, height:null, menubar:false, toolbar:false, location:false, scrollbars:true, resizable:true}, option);
		var href = href;
		var target = target || "popup";
		var width = c.width || window.innerWidth || document.documentElement.clientWidth;
		var height = c.height || window.innerHeight || document.documentElement.clientHeight;
		var futures = ",menubar=" + (c.menubar ? "yes" : "no") + ",toolbar=" + (c.toolbar ? "yes" : "no") + ",location=" + (c.location ? "yes" : "no") + ",scrollbars=" + (c.scrollbars ? "yes" : "no") + ",resizable=" + (c.resizable ? "yes" : "no");
		var newWin = window.open(href, target, 'width=' + width + ', height=' + height + futures);
		if(newWin) newWin.focus();
	}
	
	$.fn.popupLink = function (option) {
		var c = $.extend({width:800, height:0, menubar:false, toolbar:false, location:false, scrollbars:true, resizable:true}, option);
		this.each(function(index, element) {
			$(element).click( function(e){
				ut.windowopen($(this).attr('href'), $(this).attr('target'), option);
				return false;
			});
		});
		return this;
	}
	
})(jQuery);