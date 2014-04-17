/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function($) {

	var $window = $(window);

	$.belowthefold = function(element, settings) {
		var fold = $window.height() + $window.scrollTop();
		return fold <= $(element).offset().top - settings.threshold;
	};

	$.abovethetop = function(element, settings) {
		var top = $window.scrollTop();
		return top >= $(element).offset().top + $(element).height() - settings.threshold;
	};

	$.rightofscreen = function(element, settings) {
		var fold = $window.width() + $window.scrollLeft();
		return fold <= $(element).offset().left - settings.threshold;
	};

	$.leftofscreen = function(element, settings) {
		var left = $window.scrollLeft();
		return left >= $(element).offset().left + $(element).width() - settings.threshold;
	};

	$.inviewport = function(element, settings) {
		var $element = $(element);
		var offset = $element.offset();

		//var $window = $(window);
		var windowTop = $window.scrollTop();
		var threshold = settings.threshold;

		if(offset.top - threshold < windowTop) {
			if(offset.top + $element.height() + threshold >= windowTop) {
				// top edge below the window's top
			} else {
				return false;
			}
		} else {
			if(offset.top - threshold <= windowTop + $window.height()) {
				// bottom edge above the window's bottom
			} else {
				return false;
			}
		}

		var windowLeft = $window.scrollLeft();

		if(offset.left - threshold < windowLeft) {
			if(offset.left + $element.width() + threshold >= windowLeft) {
				// left edge be on the left side of the window's left edge
			} else {
				return false;
			}
		} else {
			if(offset.left - threshold <= windowLeft + $window.width()) {
				// right edge be on the right side of the window's right edge
			} else {
				return false;
			}
		}

		return true;
	};

	$.extend($.expr[':'], {
		"below-the-fold" : function(a, i, m) {
			return $.belowthefold(a, {
				threshold : 0
			});
		},
		"above-the-top" : function(a, i, m) {
			return $.abovethetop(a, {
				threshold : 0
			});
		},
		"left-of-screen" : function(a, i, m) {
			return $.leftofscreen(a, {
				threshold : 0
			});
		},
		"right-of-screen" : function(a, i, m) {
			return $.rightofscreen(a, {
				threshold : 0
			});
		},
		"in-viewport" : function(a, i, m) {
			return $.inviewport(a, {
				threshold : 0
			});
		}
	});

})(jQuery);

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;
})();

(function($) {
	$(function() {

		var windowHeight, viewWidth, viewHeight, minViewHeight = 600;

		//根据浏览器窗口，计算view的长宽值
		function adapteToWindow() {
			$win = $(window);
			windowHeight = $win.height();
			viewWidth = $win.width();
			viewHeight = $win.height() > minViewHeight ? $win.height() : minViewHeight;
			$(".indexDiv").width(viewWidth);
			$(".indexDiv").height(viewHeight);
			
			$("#crisis").height(800);

			$videoIntroOffsetTop = $videoIntro.offset().top * -1 + 164;

			$crisisOffsetTop = $crisis.offset().top * -1;

			$actionOffsetTop = $action.offset().top * -1;

			$shareInfoOffsetTop = $shareInfo.offset().top * -1;

			$downloadOffsetTop = $download.offset().top * -1;

			$partnerOffsetTop = $partner.offset().top * -1;
		}


		$(document).ready(function() {
			adapteToWindow();
			// $.stellar({
			// horizontalScrolling : false, //默认水平方向开启滚动
			// hideDistantElements : false//默认为隐藏
			// });

		});

		$(window).on("resize", adapteToWindow);

		//需要视差滚动效果的元素
		var $videoIntro = $("#videoIntro");
		var $videoIntroOffsetTop = $videoIntro.offset().top * -1;

		var $crisis = $("#crisis");
		var $crisisOffsetTop = $crisis.offset().top * -1;

		var $action = $("#action");
		var $actionOffsetTop = $action.offset().top * -1;

		var $shareInfo = $("#shareInfo");
		var $shareInfoOffsetTop = $shareInfo.offset().top * -1;

		var $download = $("#download");
		var $downloadOffsetTop = $download.offset().top * -1;

		var $partner = $("#partner");
		var $partnerOffsetTop = $partner.offset().top * -1;

		var pos, ticking = false;

		var newPos = function(x, adjuster, inertia, pos) {
			return x + "% " + (- pos -  adjuster) * inertia + "px";
		};

		var moveParallax = function() {
			// videoIntro
			if($('#videoIntro:in-viewport').length) {
				$videoIntro.css({
					'background-position' : newPos('50', $videoIntroOffsetTop, 0.3, pos)
				});
			}

			// crisis
			if($('#crisis:in-viewport').length) {
				$crisis.css({
					'background-position' : newPos('50', $crisisOffsetTop, 0.3, pos)
				});
			}

			// action
			if($('#action:in-viewport').length) {
				$action.css({
					'background-position' : newPos('50', $actionOffsetTop, 0.3, pos)
				});
			}

			// shareInfo
			if($('#shareInfo:in-viewport').length) {
				$shareInfo.css({
					'background-position' : newPos('50', $shareInfoOffsetTop, 0.3, pos)
				});
			}

			// download
			if($('#download:in-viewport').length) {
				$download.css({
					'background-position' : newPos('50', $downloadOffsetTop, 0.3, pos)
				});
			}

			// partner
			if($('#partner:in-viewport').length) {
				$partner.css({
					'background-position' : newPos('50', $partnerOffsetTop, 0.3, pos)
				});
			}
		};

		//更新位置
		var rafUpdate = function() {
			ticking = false;
			moveParallax();
		};

		var requestTick = function() {
			if(!ticking) {
				window.requestAnimFrame(rafUpdate);
			}
			ticking = true;
		};

		$(window).bind('scroll', function() {
			pos = $(window).scrollTop();
			//如果浏览器支持requestAnimationFrame，使用requestAnimationFrame来更新动画
			if(window.requestAnimFrame !== null) {
				requestTick();
			} else {
				moveParallax();
			}
		});
		
		$("#takeActionContent").jscroll({ W:"4px"
			,BgUrl:"url(image/Vertical_scrollBg1.gif)"
			//,Bg:"#eee"
			,Bar:{  Bd:{Out:"#373737",Hover:"#373737"}
					,Bg:{Out:"-4px center repeat-y",Hover:"-4px center repeat-y",Focus:"-4px center repeat-y"}
					}
			,Btn:{  btn:false
					,uBg:{Out:"-0px center repeat-y",Hover:"-0px center repeat-y",Focus:"-0px center repeat-y"}
					,dBg:{Out:"none",Hover:"none",Focus:"none"}
					}
			,Fn:function(){}
		});

	});
})(jQuery);
