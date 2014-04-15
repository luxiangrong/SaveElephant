(function($) {
	$(function() {
		$.extend($.fx.step, {
			backgroundPosition : function(fx, fb, fc) {
				if (fx.state === undefined && typeof fx.end == 'string') {
					var start = $(fx.elem).css('backgroundPosition');
					start = toArray(start);
					fx.start = [start[0], start[2]];
					var end = toArray(fx.end);
					fx.end = [end[0], end[2]];
					fx.unit = [end[1], end[3]];
				}
				var nowPosX = [];
				nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
				nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
				fx.elem.style.backgroundPosition = nowPosX[0] + ' ' + nowPosX[1];

				function toArray(strg) {
					strg = strg.replace(/left|top/g, '0px');
					strg = strg.replace(/right|bottom/g, '100%');
					strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g, "$1px$2");
					var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
					return [parseFloat(res[1], 10), res[2], parseFloat(res[3], 10), res[4]];
				}

			}
		});

		var viewWidth, viewHeight, minViewHeight = 600;

		//根据浏览器窗口，计算view的长宽值
		function adapteToWindow() {
			$win = $(window);
			viewWidth = $win.width();
			viewHeight = $win.height() > minViewHeight ? $win.height() : minViewHeight;
			$(".view").width(viewWidth);
			$(".view").height(viewHeight);
		}


		$(document).ready(function() {
			adapteToWindow();
			$.stellar({
				horizontalScrolling : false, //默认水平方向开启滚动
				hideDistantElements : false, //默认为隐藏
			});
			
		});

		$(window).on("resize", adapteToWindow);

		// $(window).on('scroll.window', function(a) {
			// var currentScrollTop = $(this).scrollTop();
			// var navHeight = $('.headDiv').height() + $('.nav').height();
			// console.log(navHeight);
			// $('body, html').delay(2000).stop().animate({
					// scrollTop: Math.round(currentScrollTop / viewHeight) * viewHeight + navHeight
				// }, {
					// queue : false,
					// duration : 1000
				// });
		// });

	});
})(jQuery);
