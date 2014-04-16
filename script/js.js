$(function() {
	//--
	$('.ActionPart4').find('li:last').css('border', '0px');
	//--分享信息
	$('.ShareInfoPart1').find('.list').find('li').each(function(i) {
		$(this).hover(function() {
			$('.ShareInfoPart1').find('.list').find('li').removeClass('liNow');
			$(this).addClass('liNow');
			$('.ShareInfoPart1').find('.imgList').stop();
			$('.ShareInfoPart1').find('.imgList').animate({
				scrollTop : i * 300
			}, 300);
		}, function() {
		})
	})
	//--瀑布流
	//--首页分层(复杂特效)
	//--首页地图（复杂特效）
	$('.indexPart4').find('.map').find('li').each(function(i) {
		$(this).hover(function() {
			$(this).addClass('liNow');
			$('.mapShow').find('li').eq(i).css('left', $(this).offset().left - 120);
			$('.mapShow').find('li').eq(i).css('top', $(this).offset().top - 75);
			$('.mapShow').find('li').eq(i).show();
		}, function() {
			$(this).removeClass('liNow');
			$('.mapShow').find('li').hide();
		})
	})
	$('.indexPart4').find('.list2').find('a').each(function(i) {
		$(this).hover(function() {
			$('.indexPart4').find('.list2').find('a').removeClass('aNow');
			$(this).addClass('aNow');
			$('.indexPart4').find('.list3').find('li').hide();
			$('.indexPart4').find('.list3').find('li').eq(i).show();
			$('.indexPart4').find('.list3').show();
		}, function() {
		})
	})
	$('.indexPart4').find('.list3').find('.close').click(function() {
		$('.indexPart4').find('.list2').find('a').removeClass('aNow');
		$('.indexPart4').find('.list3').hide();
	})
	//--首页采取行动弹出层
	$('.indexPart2Btn').click(function() {
		
		$('.dialog').css('z-index', 100);
		$('.dialog').find('.contentDiv').fadeIn(300);
	})
	$('.dialog').find('.close').click(function() {
		$('.dialog').css('z-index', -1);
		$('.dialog').find('.contentDiv').fadeOut(300);
	})
	//--首页合作伙伴
	$('.indexPart6').find('.rightBtn').click(function() {
		imgScrollRight2($('.indexPart6').find('.list'), $('.indexPart6').find('li').length / 4 - 1, 4 * 209, 0);
	})
	$('.indexPart6').find('.leftBtn').click(function() {
		imgScrollLeft2($('.indexPart6').find('.list'), $('.indexPart6').find('li').length / 4 - 1, 4 * 209, 0);
	})
	//--选项卡
	//--
	$('.tabContentDiv').find('.tabContent:first').show();
	$('.tab').each(function(i) {
		$(this).find('li').each(function(ii) {
			$(this).hover(function() {
				$('.tab').eq(i).find('li').removeClass('liNow');
				$(this).addClass('liNow');
				$('.tabContentDiv').eq(i).find('.tabContent').hide();
				$('.tabContentDiv').eq(i).find('.tabContent').eq(ii).show();
				Vertical_scrollFun();
			}, function() {
			})
		})
	})
	//--js滚动条
	if ($('.Vertical_scroll').length > 0) {
		Vertical_scrollFun();
	}
	//--首页导航效果
	$('#nav').find('a').each(function(i) {
		$(this).hover(function() {
			$('#nav').find('a').removeClass('aNow');
			$(this).addClass('aNow');
			$.scrollTo($(this).attr('data-target'), 800,  {queue:false});
		}, function() {
		})
	})
	if ($('#nav').length > 0) {
		$(window).scroll(function() {
			$('.indexDiv').each(function(i) {
				if ($(window).scrollTop() >= $(this).offset().top - $(window).height() / 2) {
					$('#nav').eq(0).find('a').removeClass('aNow');
					$('#nav').eq(0).find('a').eq(i).addClass('aNow');
				}
			})
		})
	}
	//--
	$(window).scroll(function() {
		if ($(window).scrollTop() > 114) {
			$('.nav').addClass('navNow');
		} else {
			$('.nav').removeClass('navNow');
		}
	})
	//
	
	$(".topA").click(function(){
		$.scrollTo(0, 1500);
	});
})