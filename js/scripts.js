var global;
var clickEvent;
var property_nav_pos;
var windowHeight, windowWidth;
var rightColState = false;
var navParent = $('.b-property-nav-wrap');
var navParentPadding = 16;
var diff;
var str = [];
var str_cut = [];

$(document).ready(function(){
	
	/* click or tap */
	if (Modernizr.touch) 
		clickEvent = 'tap';
	else
		clickEvent = 'click';
	/* // */
	
	
	/* custom select */
	$('body').addClass('hasJS');
	$('select.custom').each(function() {  
		var sb = new SelectBox({
			selectbox: $(this),
			customScrollbar: true,
			height: 127,
			scrollOptions: {
				autoReinitialise: true,
				showArrows: true
			},
		 	changeCallback: function(val) {   
		  	$(this)[0].selectbox.change();
				cutSelectValue();
			}   
		});
	});
	//--
	
	
	/* show advanced search */
	$('.b-form-adv-search-link')[clickEvent](function(){
		
		$('#adv-search').fadeIn(800);
		$(this).css('visibility', 'hidden').parents('.b-search__form').addClass('b-search-active');
		return false;
		
	});
	//--
	
	
	/* show more cities */
	$('.b-button__show-more')[clickEvent](function(){
		$(this).fadeOut(500);
		$('.b-more-cities').slideDown(500);
		return false;
	});
	//--
	
	
	/* testimonials slider */
	$('.b-testimonials').slick({
		dots: false,
		infinite: true,
		speed: 500,
		arrows: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});
	//--
	
	
	/* visual dropbox */
	$('.b-check-group__label')[clickEvent](function(){
		$(this).parent().find('.b-check-group').slideToggle(300);
		$('.b-check-group .b-check-group__close')[clickEvent](function(){
			$(this).parent().slideUp(300);
		});
	});
	//--
	
	
	/* show add params */
	$('#show-add-params')[clickEvent](function(){
		$('.b-filter__add-params').slideToggle(500);
		$(this).toggleClass('params_opened');
		return false;
	});
	//--
	
	
	/* card gallery slider */
	$('.b-card-slider__gallery').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		fade: true,
		dotsClass: 'custom_paging',
		customPaging: function (slider, i) {
			return  (i + 1) + ' / ' + slider.slideCount;
		},
		asNavFor: '.b-card-slider__gallery-nav'
	});
	$('.b-card-slider__gallery-nav').slick({
		slidesToShow: 7,
		slidesToScroll: 1,
		asNavFor: '.b-card-slider__gallery',
		dots: false,
		arrows: false,
		centerMode: true,
  	focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 850,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 780,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 750,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 650,
				settings: {
					slidesToShow: 3
				}
			}
		]
	});
	$('.b-card-slider__gallery .b-gallery').each(function (i) {
		var photo_name = $('.b-card-slider__gallery .b-gallery:eq('+i+')').find('img').attr('alt');
		$('.b-card-slider__gallery .b-gallery:eq('+i+')').find('.gallery__photo-name').html(photo_name);
	})
	//-- /card gallery slider
	
	
	/* show/hide owner contacts */
	$('.b-contacts__show')[clickEvent](function(){
		$(this).parent().removeClass('b-object-owner__contacts-hidden').addClass('b-object-owner__contacts-shown');
		return false;
	});
	$('.b-owner__contacts-hide')[clickEvent](function(){
		$(this).parent().parent().removeClass('b-object-owner__contacts-shown').addClass('b-object-owner__contacts-hidden');
		return false;
	});
	//--
	
	
	/* map (main page)*/
	
	/*### map All Ukraine ###*/
	$("area[id*='pt_'], a[id*='city_link_']").hover(function () {
		var num = this.id.split('city_link_')[1];
		if(num == undefined) {num = this.id.split('pt_')[1];}
		$('#active-map').removeClass().addClass('map_'+num+'_on');
		$('.b-city').css('display', 'none');
		$('.b-city__'+num).css('display', 'inline-block');
	}, function () {
	});
	$("area[id*='map']").hover(function () {
		var num = this.id.split('map')[1];
		$('#active-map').removeClass().addClass('map_'+num+'_on');
		$('.b-city').css('display', 'none');
		$('.b-city__'+num).css('display', 'inline-block');
	}, function () {
		var num = this.id.split('map')[1];
		$('#active-map').removeClass('map_'+num+'_on');
		$('.b-city__'+num).css('display', 'none');
	});
	/*### /map All Ukraine ###*/
	
	/*### map Karpaty ###*/
	var num2;
	$("area[id*='pt_karp'], a[id*='city_link_karp']").hover(function () {
		num2 = this.id.split('city_link_karp')[1];
		if(num2 == undefined) {num2 = this.id.split('pt_karp')[1];}
		$('.b-city__karp'+num2).css('display', 'inline-block');
	}, function () {
		$('.b-city__karp'+num2).css('display', 'none');
	});
	/* /map Karpaty */
	
	/*### map Black sea ###*/
	var num3;
	$("area[id*='pt_blacksea'], a[id*='city_link_blacksea']").hover(function () {
		num3 = this.id.split('city_link_blacksea')[1];
		if(num3 == undefined) {num3 = this.id.split('pt_blacksea')[1];}
		$('.b-city__blacksea'+num3).css('display', 'inline-block');
	}, function () {
		$('.b-city__blacksea'+num3).css('display', 'none');
	});
	/*### /map Black sea ###*/
	
	/*### map Azov sea ###*/
	var num4;
	$("area[id*='pt_azovsea'], a[id*='city_link_azovsea']").hover(function () {
		num4 = this.id.split('city_link_azovsea')[1];
		if(num4 == undefined) {num4 = this.id.split('pt_azovsea')[1];}
		$('.b-city__azovsea'+num4).css('display', 'inline-block');
	}, function () {
		$('.b-city__azovsea'+num4).css('display', 'none');
	});
	/*### map Azov sea ###*/
	
	/*### map Krim ###*/
	var num5;
	$("area[id*='pt_krim'], a[id*='city_link_krim']").hover(function () {
		num4 = this.id.split('city_link_azovsea')[1];
		if(num4 == undefined) {num5 = this.id.split('pt_krim')[1];}
		$('.b-city__krim'+num5).css('display', 'inline-block');
	}, function () {
		$('.b-city__krim'+num5).css('display', 'none');
	});
	/*### /map Krim ###*/
	
	/* /map (main page)*/
	
	
	/* scrolling content (card page) */
	$('.b-nav__link, .b-price__tab-link')[clickEvent](function(){
		removeActiveClass();
		var targetId = $(this).attr('href');
		
		if(navParent.hasClass('fixed-nav'))
			diff = navParent.height()+navParentPadding;
		else
			diff = navParent.height()*2+navParentPadding;
			
		$('html, body').stop(true, true).animate({
				scrollTop: $(targetId).offset().top - diff
		}, {
				duration: 800
		});
		
		if(!$(this).hasClass('b-price__tab-link')){
			$(this).addClass('b-nav__link-active');
		}
		
		return false;
	});
	//--
	
	
	/* show testimonial form */
	$('.b-button__leave-testimonial')[clickEvent](function(){
		$('#testimonial-form').slideToggle(500);
		$(this).text($(this).text() == 'Скрыть форму' ? 'Оставить свой отзыв' : 'Скрыть форму');
		return false;
	});
	//--
	
	
	/* show comment form */
	$('.b-button__leave-comment')[clickEvent](function(){
		$('#comment-form').slideToggle(500);
		$(this).text($(this).text() == 'Скрыть форму' ? 'Оставить свой комментарий' : 'Скрыть форму');
		return false;
	});
	//--
	
	
	/* faq */
	$('.b-faq__ask')[clickEvent](function(){
		$(this).toggleClass('b-faq__ask-active');
		$(this).next('.b-faq__answer').slideToggle(500);
	});
	//--
	
	
	/* show call button */
	$('.b-call-me-button')[clickEvent](function(){
		$(this).css('opacity', '0');
		$('#call_button').slideToggle(300);
		return false;
	});
	$('.b-call-links__link-cancel')[clickEvent](function(){
		$('#call_button').slideToggle(300);
		$('.b-call-me-button').css('opacity', '1');
		return false;
	});
	//--
	
	
	/* language-select enlarge & cut */
	cutSelectOptions();
		
	$('#select-language').find('.selectList').hover(function(){
		if(windowWidth > 780){
			$(this).stop(true, true).animate({
				'width': '100px'
			}, 500);
			
			$('#select-language dd').each(function (i) {
				$('#select-language dd:eq('+i+')').html(str[i]);
			});
		}
		
	}, function(){
		if(windowWidth > 780){
			$(this).stop(true, true).animate({
				'width': '70px'
			}, 500);
			
			$('#select-language dd').each(function (i) {
				$('#select-language dd:eq('+i+')').html(str_cut[i]);
			});
		}
		
	});
	//--
	
	
	
	global = {
			window: $(window)
	};
	
	global.window.resize(onResize);
	onResize();	
		
});



function onResize(){
	
	windowWidth = global.window.width();
	windowHeight = global.window.height();
	
	if($('#property-nav')[0]){
		property_nav_pos = offsetPosition($('#property-nav')[0]);
	}
	
	checkNavPos();
	
	$('.b-call-me-button__call-links').css('display', 'none');
	$('.b-call-me-button').css('opacity', '1');
	

}


/* scrolling effects */
$(window).scroll(function (event) {
	
	var y = $(this).scrollTop();
	
	/* change navigation class on scrolling (card page)*/
	if($('#property-nav')[0]){
		if(navParent.hasClass('fixed-nav'))
			diff = navParent.height()+navParentPadding;
		else
			diff = navParent.height()*2+navParentPadding;
		
		var photoPos = offsetPosition($('#card-gallery')[0]) - diff - 30;
		var descriptionPos = offsetPosition($('#description')[0]) - diff - 30;
		var rulesPos = offsetPosition($('#rules')[0]) - diff - 30;
		var calendarPos = offsetPosition($('#calendar')[0]) - diff - 30;
		var mapPos = offsetPosition($('#map-box')[0]) - diff - 30;
		var testimonialsPos = offsetPosition($('#testimonials')[0]) - diff - 30;
		
		if(y > testimonialsPos){
			removeActiveClass();
			$('.b-nav__link[href="#testimonials"]').addClass('b-nav__link-active');
		}
		else if(y > mapPos){
			removeActiveClass();
			$('.b-nav__link[href="#map-box"]').addClass('b-nav__link-active');
		}
		else if(y > calendarPos){
			removeActiveClass();
			$('.b-nav__link[href="#calendar"]').addClass('b-nav__link-active');
		}
		else if(y > rulesPos){
			removeActiveClass();
			$('.b-nav__link[href="#rules"]').addClass('b-nav__link-active');
		}
		else if(y > descriptionPos){
			removeActiveClass();
			$('.b-nav__link[href="#description"]').addClass('b-nav__link-active');
		}
		else if(y > photoPos){
			removeActiveClass();
			$('.b-nav__link[href="#card-gallery"]').addClass('b-nav__link-active');
		}
		else{
			removeActiveClass();
		}
	}
	/* /change navigation class on scrolling (card page)*/
	
	
	/* fix navigation (card page) */
	if(y > property_nav_pos){
		$('.b-property-nav-wrap').removeClass('static-nav').addClass('fixed-nav');
		checkNavPos();
	}
	else{
		$('.b-property-nav-wrap').removeClass('fixed-nav').addClass('static-nav');
		checkNavPos();
	}
	/* /fix navigation (card page) */
	
	
	/* fix right column (card page) */
	var rightColHeight = $('#right-col-conteiner').height();
	var rightColFixedPos = $('.b-property-nav-wrap').height() + 10;
	var contentHeight = $('.b-card-content').height();
	
	if(y > rightColHeight && contentHeight-y > rightColHeight){
		
		$('#right-col-conteiner').addClass('right-col-fixed').css({'top': rightColFixedPos});
		if(!rightColState){
			$('#right-col-conteiner').css('opacity', '0');
			rightColState = true;
			$('#right-col-conteiner').animate({
				'opacity': 1
			}, 800);
			checkFixedRightHeight();
		}
		
	}
	else if(contentHeight-y < rightColHeight){
		$('#right-col-conteiner').removeClass('right-col-fixed');
	}
	else if (y == 0){
		$('#right-col-conteiner').removeClass('right-col-fixed');
		rightColState = false;
		$('#right-col-reserve').removeClass('b-right-reserve__hidden');
	}
	/* /fix right column (card page) */
	
});
//-- /scrolling effects


/* check navigation position (card page) */
function checkNavPos(){
	
	$('.fixed-nav #property-nav').css('width', $('.b-page-wrap').width());
	
	$('.static-nav #property-nav').css('width', '100%');
	
}
//--


/* check fixed column height (card page) */
function checkFixedRightHeight(){
	
	if(windowHeight <= $('#right-col-conteiner').height() && $('#right-col-conteiner').hasClass('right-col-fixed'))
		$('#right-col-reserve').addClass('b-right-reserve__hidden');
	else
		$('#right-col-reserve').removeClass('b-right-reserve__hidden');
		
}
//--


/* remove active class in navigation (card page) */
function removeActiveClass(){$('.b-nav__link').removeClass('b-nav__link-active').addClass('b-nav__link-inactive');}
//--


/* calendar */
$(function() {
	$( "#date_from, #date_to" ).datepicker();
		
	$.datepicker.regional['ru'] = {
	closeText: 'Закрыть',
	prevText: '&lt;',
	nextText: '&gt;',
	currentText: 'Сегодня',
	monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
	'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
	monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
	'Июл','Авг','Сен','Окт','Ноя','Дек'],
	dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
	dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
	dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
	dateFormat: 'dd.mm.yy',
	firstDay: 1,
	isRTL: false
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
	
});
//--


/* tabs */
(function($) {
  $(function() {
 
    $('ul.b-tabs').delegate('li:not(.b-tabs__tab-current)', 'click', function() {
      $(this).addClass('b-tabs__tab-current').siblings().removeClass('b-tabs__tab-current')
        .parents('div.b-tabs-block').eq(0).find('>div.b-tabs-block__box').hide().eq($(this).index()).fadeIn(500).show();
      return false;
    });
 
  })
})(jQuery)
//--


/* hiding all cities & areas on map (main page) */
function clearMap(){
	$('#active-map').removeClass();
	$('.b-city').css('display', 'none');		
}
//--


/* check modal position */
function checkModalPos(elem){
	
	if(windowHeight > $('#'+elem).height()){
		$('#'+elem).css('top', (windowHeight - $('#'+elem).height()) / 2);
	}
	else{
		$('#'+elem).css('top', '3%');
	}
	
}
//--


/* check position of the element (card page) */
function offsetPosition(element) {
	var offsetTop = 0;
	do {
			offsetTop  += element.offsetTop;
	} while (element = element.offsetParent);
	return offsetTop;
}
//--


/* language-select options cut */
function cutSelectOptions(){
	cutSelectValue();
	
	$('#select-language dd').each(function (i) {
		str[i] = $('#select-language dd:eq('+i+')').html();
		str_cut[i] = $('#select-language dd:eq('+i+')').html().substring(3, -3);
		$('#select-language dd:eq('+i+')').html(str_cut[i]);
	});
	
}
//--


/* language-select value cut */
function cutSelectValue(){
	
	var str_val_cut = $('#select-language').find('.selectedValue').html().substring(3, -3);
	$('#select-language').find('.selectedValue').html(str_val_cut);
	
}
//--