function indexFun() {
	$('#masonry2').masonry({
		itemSelector : 'li',
		columnWidth : 1
	});
}

function Vertical_scrollFun() {
	$(".Vertical_scroll").jscroll({
		W : "4px",
		BgUrl : "url(image/Vertical_scrollBg1.gif)"
		//, Bg:"#eee"
		,
		Bar : {
			Bd : {
				Out : "#373737",
				Hover : "#373737"
			},
			Bg : {
				Out : "-4px center repeat-y",
				Hover : "-4px center repeat-y",
				Focus : "-4px center repeat-y"
			}
		},
		Btn : {
			btn : false,
			uBg : {
				Out : "-0px center repeat-y",
				Hover : "-0px center repeat-y",
				Focus : "-0px center repeat-y"
			},
			dBg : {
				Out : "none",
				Hover : "none",
				Focus : "none"
			}
		},
		Fn : function() {
		}
	});
}

//--
var imgScrollNum2 = new Array();
for ( i = 0; i < 50; i++) {
	imgScrollNum2[i] = 0;
}
function imgScrollRight2(a, b, c, d) {
	//a.stop();
	if (imgScrollNum2[d] < b) {
		imgScrollNum2[d]++;
		a.animate({
			scrollLeft : imgScrollNum2[d] * c
		}, 500);
	}
}

function imgScrollLeft2(a, b, c, d) {
	//a.stop();
	if (imgScrollNum2[d] > 0) {
		imgScrollNum2[d]--;
		a.animate({
			scrollLeft : imgScrollNum2[d] * c
		}, 500);
	}
}	