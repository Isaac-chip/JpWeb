// IE判別
if(ut.userAgent.match(/MSIE [0-6]/)) {$('html').addClass('lt-ie7')};
if(ut.userAgent.match(/MSIE [0-7]/)) {$('html').addClass('lt-ie8')};
if(ut.userAgent.match(/MSIE [0-8]/)) {$('html').addClass('lt-ie9')};

// Android
if(ut.userAgent.match(/Android/)) {
	$('html').addClass('android');
	$('html').addClass('mobile');
	if(ut.userAgent.match(/Mobile/)) {
		$('html').addClass('sp');
	} else {
		$('html').addClass('tb');
	}
};

// iOS
if(ut.userAgent.match(/iPhone|iPad/)) {
	$('html').addClass('ios');
	$('html').addClass('mobile');
	if(ut.userAgent.match(/iPhone/)) {
		$('html').addClass('sp');
	} else {
		$('html').addClass('tb');
	}
	/*$('a').on('mouseover',function(ev){
		var link = $(this).attr('href'),
		target = $(this).attr('target'),
		linktype = link.substring(0,1);
		if(linktype != '#'){
			if(target == '_blank'){
				window.open(link);
			} else{
				location.href = link;
			}
		}
	});*/
};

/////////////////////////////////
// その他
/////////////////////////////////

(function($) {
$(function(){
	loading();
	pageScroll();
	newsSelectNav();
    navCurrent();
    fadeAnim();
	animImg();
    smpSetting();
	
	//ポップアップ
	$('a.popup, area.popup').popupLink({width:840, scrollbars:true});
	/*$('a[href*="module/structure/"]').popupLink({width:840, scrollbars:true}).addClass('popup');
	$('a[href*="module/material/"]').popupLink({width:840, scrollbars:true}).addClass('popup');
	$('a[href*="module/oubo/"]').popupLink({width:840, scrollbars:true}).addClass('popup');*/
});

function loading(){
    var load_Timer = 0,
    imgNum = imagesLoaded('body').images.length,
    loadedImg = 0,
    progressNowPosition = 0;
	$('html').addClass('is_page_loading');    
    load_Timer = setInterval(progressMonitor, 1000/50);
    imagesLoaded('body').on('progress', function(){
        loadedImg++;
    });
    function progressMonitor(){
        var progressPosition = (loadedImg/imgNum) * 100;
        progressNowPosition += (progressPosition-progressNowPosition) * 0.1;
		$('.progressBar').css('width', progressNowPosition+'%');
        $('.progressTxt').text(Math.floor(progressNowPosition));
        if(progressNowPosition >= 100){
            clearInterval(load_Timer);
            _page_load();
        }
        if(progressNowPosition > 99.9){
            progressNowPosition = 100;
        }
    }
    function _page_load () {
        if (!$('html').hasClass('is_page_loaded')) {
            $('html').addClass('is_page_loaded');
			$('#loadingWrap').fadeOut();
        } else {
            //$('#loadingWrap').hide();
        }
    }
}

function navCurrent() {
	//各ページbodyのidと各ナビゲーションのclass名を同一のものに設定しておくこと
	var pageId = $('body').attr('id');
	//console.log(pageId);
	$('nav li.'+ pageId).addClass('is_current');
}

function pageScroll(){
    $(window).on('scroll',function () {
        if ($(this).scrollTop() > 100) {
            $('html').addClass('is_scroll');
        } else {
            $('html').removeClass('is_scroll');
        }
    });
}

function newsSelectNav(){
	$('.selectNavToggleBtn > div').on('click',function(){
		$(this).parent().toggleClass('is_active');
		$(this).parent().prev().toggleClass('is_active');
	});
}

function fadeAnim(){
	var fItem = $('.fadeAnim');
	$(window).scroll(function () {
		var wh = $(window).height(),
		t_h = $(window).scrollTop();
		fItem.each(function () {
			var s_p = $(this).offset().top;
			if (t_h > (s_p - wh/1.25)) {
				$(this).addClass('is_view');
			} else {
				//$(this).removeClass('is_view');
			}
		});
	});
}

function animImg(){
	var fItem = $('.animImg');
	$(window).scroll(function () {
		var wh = $(window).height(),
		t_h = $(window).scrollTop();
		fItem.each(function () {
			var s_p = $(this).offset().top;
			if (t_h > (s_p - wh/1.25)) {
				$(this).addClass('is_view');
			} else {
				//$(this).removeClass('is_view');
			}
		});
	});
}

function smpSetting(){
	//SMPNavi
	$('#smpNavBtn').on('click', function() {
		$('#smpNav').addClass('is_active');
		return false;
	});
	$('#smpNavCloseBtn').on('click', function() {
		$('#smpNav').removeClass('is_active');
		return false;
	});
}

})(jQuery);