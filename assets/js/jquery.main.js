jQuery(function() {
  initStickyScrollBlock();
  initCustomScript();
  initSlickCarousel();
  initCustomForms();
  initFlowupLabels();
  initMobileNav();
});

// initialize fixed blocks on scroll
function initStickyScrollBlock() {
  jQuery(".header").stickyScrollBlock({
    setBoxHeight: true,
    activeClass: "fixed-position",
    positionType: "fixed",
    extraTop: function () {
      var totalHeight = 0;
      jQuery("0").each(function () {
        totalHeight += jQuery(this).outerHeight();
      });
      return totalHeight;
    },
  });
}

// initialize custom form elements
function initCustomForms() {
  jcf.setOptions('Select', {
    maxVisibleItems: 8,
    wrapNative: false,
    wrapNativeOnMobile: false,
    fakeDropInBody: false,
  });
  jcf.replaceAll('.custom-form');
}

//floating input
function initFlowupLabels() {
  jQuery('form').FlowupLabels({
    /*
     * These are all the default values
     * You may exclude any/all of these options
     * if you won't be changing them
     */

    // Handles the possibility of having input boxes prefilled on page load
    feature_onInitLoad: true,

    // Class when focusing an input
    class_focused:    'focused',
    // Class when an input has text entered
    class_populated:  'populated'
  });
}

//floating input
(function($) {
  $.fn.FlowupLabels = function( options ){

    var defaults = {
            // Useful if you pre-fill input fields or if localstorage/sessionstorage is used.
            feature_onLoadInit:   true,
        // Class names used for focus and populated statuses
        class_focused:    'focused',
        class_populated:  'populated'
    },
    settings = $.extend({}, defaults, options);


    return this.each(function(){
      var $scope  = $(this);

      $scope.on('focus.flowupLabelsEvt', '.input-form', function() {
        $(this).closest('.form-row').addClass(settings.class_focused);
      })
      .on('blur.flowupLabelsEvt', '.input-form', function() {
        var $this = $(this);

        if ($this.val().length) {
          $this.closest('.form-row')
          .addClass(settings.class_populated)
          .removeClass(settings.class_focused);
      }
      else {
          $this.closest('.form-row')
          .removeClass(settings.class_populated + ' ' + settings.class_focused);
      }
    });


      // On page load, make sure it looks good
      if (settings.feature_onLoadInit) {
        $scope.find('.input-form').trigger('blur.flowupLabelsEvt');
    }
});
};
})( jQuery );


//custom script
function initCustomScript() {
  jQuery('a,input,select,button,textarea').keyboardFocus('key_focused');
}

// slick init
function initSlickCarousel() {

  ResponsiveHelper.addRange({
    "768..": {
      on: function () {
        jQuery('.company__slider').slick({
          slidesToShow: 7,
          slidesToScroll: 1,
          autoplay: true,
          loop: true,
          autoplaySpeed: 3000,
          infinite: true,
          arrows: false,
        });
      },
      off: function () {
        jQuery('.company__slider').slick('unslick');
      },
    },
  });

  

}

// mobile menu init
function initMobileNav() {
  jQuery("body").mobileNav({
    menuActiveClass: "nav-active",
    menuOpener: ".mobile-nav",
    hideOnClickOutside: true,
    
  });
}

/*
_ _      _       _
___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
|__/

Version: 1.8.1
Author: Ken Wheeler
Website: http://kenwheeler.github.io
Docs: http://kenwheeler.github.io/slick
Repo: http://github.com/kenwheeler/slick
Issues: http://github.com/kenwheeler/slick/issues

*/
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots&&o.slideCount>o.options.slidesToShow){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>0){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>0&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);if(i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s){var n="slick-slide-control"+e.instanceUid+s;i("#"+n).length&&i(this).attr({"aria-describedby":n})}}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.options.focusOnChange?e.$slides.eq(s).attr({tabindex:"0"}):e.$slides.eq(s).removeAttr("tabindex");e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&e.slideCount>e.options.slidesToShow&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&e.slideCount>e.options.slidesToShow&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t&&a.slideCount>a.options.slidesToShow?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

/*
* Accessible TAB navigation
*/
;(function($){
var isWindowsPhone = /Windows Phone/.test(navigator.userAgent);
var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

$.fn.tabNav = function(opt) {
  var options = $.extend({
    hoverClass: 'hover',
    items: 'li',
    opener: '>a',
    delay: 10
  },opt);

  if(isWindowsPhone || isTouchDevice) {
    return this;
  }

  return this.each(function() {
    var nav = $(this), items = nav.find(options.items);

    items.each(function(index, navItem) {
      var item = $(this), navActive, touchNavActive;
      var link = item.find(options.opener), timer;

      link.bind('focus', function() {
        navActive = nav.hasClass('js-nav-active');
        touchNavActive = window.TouchNav && TouchNav.isActiveOn(navItem);
        if(!navActive || touchNavActive) {
          initSimpleNav();
        }
        item.trigger(navActive && touchNavActive ? 'itemhover' : 'mouseenter');
      }).bind('blur', function() {
        item.trigger(navActive && touchNavActive ? 'itemleave' : 'mouseleave');
      });

      var initSimpleNav = function() {
        if(!initSimpleNav.done) {
          initSimpleNav.done = true;
          item.hover(function() {
            clearTimeout(timer);
            timer = setTimeout(function() {
              item.addClass(options.hoverClass);
            }, options.delay);
          }, function() {
            clearTimeout(timer);
            timer = setTimeout(function() {
              item.removeClass(options.hoverClass);
            }, options.delay);
          });
        }
      };
    });
  });
};
}(jQuery));


/*!
* JavaScript Custom Forms
*
* Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
* Released under the MIT license (LICENSE.txt)
*
* Version: 1.1.3
*/
;(function(root, factory) {
'use strict';
if (typeof define === 'function' && define.amd) {
  define(['jquery'], factory);
} else if (typeof exports === 'object') {
  module.exports = factory(require('jquery'));
} else {
  root.jcf = factory(jQuery);
}
}(this, function($) {
'use strict';

// define version
var version = '1.1.3';

// private variables
var customInstances = [];

// default global options
var commonOptions = {
  optionsKey: 'jcf',
  dataKey: 'jcf-instance',
  rtlClass: 'jcf-rtl',
  focusClass: 'jcf-focus',
  pressedClass: 'jcf-pressed',
  disabledClass: 'jcf-disabled',
  hiddenClass: 'jcf-hidden',
  resetAppearanceClass: 'jcf-reset-appearance',
  unselectableClass: 'jcf-unselectable'
};

// detect device type
var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
  isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
if(isIOS) isIOS = parseFloat(isIOS[2].replace(/_/g, '.'));
commonOptions.ios = isIOS;

// create global stylesheet if custom forms are used
var createStyleSheet = function() {
  var styleTag = $('<style>').appendTo('head'),
    styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

  // crossbrowser style handling
  var addCSSRule = function(selector, rules, index) {
    if (styleSheet.insertRule) {
      styleSheet.insertRule(selector + '{' + rules + '}', index);
    } else {
      styleSheet.addRule(selector, rules, index);
    }
  };

  // add special rules
  addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
  addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
  addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
  addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');

  // detect rtl pages
  var html = $('html'), body = $('body');
  if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
    html.addClass(commonOptions.rtlClass);
  }

  // handle form reset event
  html.on('reset', function() {
    setTimeout(function() {
      api.refreshAll();
    }, 0);
  });

  // mark stylesheet as created
  commonOptions.styleSheetCreated = true;
};

// simplified pointer events handler
(function() {
  var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled,
    touchEventsSupported = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
    eventList, eventMap = {}, eventPrefix = 'jcf-';

  // detect events to attach
  if (pointerEventsSupported) {
    eventList = {
      pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
      pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
      pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
      pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
    };
  } else {
    eventList = {
      pointerover: 'mouseover',
      pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
      pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
      pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
    };
  }

  // create event map
  $.each(eventList, function(targetEventName, fakeEventList) {
    $.each(fakeEventList.split(' '), function(index, fakeEventName) {
      eventMap[fakeEventName] = targetEventName;
    });
  });

  // jQuery event hooks
  $.each(eventList, function(eventName, eventHandlers) {
    eventHandlers = eventHandlers.split(' ');
    $.event.special[eventPrefix + eventName] = {
      setup: function() {
        var self = this;
        $.each(eventHandlers, function(index, fallbackEvent) {
          if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
          else self['on' + fallbackEvent] = fixEvent;
        });
      },
      teardown: function() {
        var self = this;
        $.each(eventHandlers, function(index, fallbackEvent) {
          if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
          else self['on' + fallbackEvent] = null;
        });
      }
    };
  });

  // check that mouse event are not simulated by mobile browsers
  var lastTouch = null;
  var mouseEventSimulated = function(e) {
    var dx = Math.abs(e.pageX - lastTouch.x),
      dy = Math.abs(e.pageY - lastTouch.y),
      rangeDistance = 25;

    if (dx <= rangeDistance && dy <= rangeDistance) {
      return true;
    }
  };

  // normalize event
  var fixEvent = function(e) {
    var origEvent = e || window.event,
      touchEventData = null,
      targetEventName = eventMap[origEvent.type];

    e = $.event.fix(origEvent);
    e.type = eventPrefix + targetEventName;

    if (origEvent.pointerType) {
      switch (origEvent.pointerType) {
        case 2: e.pointerType = 'touch'; break;
        case 3: e.pointerType = 'pen'; break;
        case 4: e.pointerType = 'mouse'; break;
        default: e.pointerType = origEvent.pointerType;
      }
    } else {
      e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
    }

    if (!e.pageX && !e.pageY) {
      touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
      e.pageX = touchEventData.pageX;
      e.pageY = touchEventData.pageY;
    }

    if (origEvent.type === 'touchend') {
      lastTouch = { x: e.pageX, y: e.pageY };
    }
    if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
      return;
    } else {
      return ($.event.dispatch || $.event.handle).call(this, e);
    }
  };
}());

// custom mousewheel/trackpad handler
(function() {
  var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '),
    shimEventName = 'jcf-mousewheel';

  $.event.special[shimEventName] = {
    setup: function() {
      var self = this;
      $.each(wheelEvents, function(index, fallbackEvent) {
        if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
        else self['on' + fallbackEvent] = fixEvent;
      });
    },
    teardown: function() {
      var self = this;
      $.each(wheelEvents, function(index, fallbackEvent) {
        if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
        else self['on' + fallbackEvent] = null;
      });
    }
  };

  var fixEvent = function(e) {
    var origEvent = e || window.event;
    e = $.event.fix(origEvent);
    e.type = shimEventName;

    // old wheel events handler
    if ('detail'      in origEvent) { e.deltaY = -origEvent.detail;      }
    if ('wheelDelta'  in origEvent) { e.deltaY = -origEvent.wheelDelta;  }
    if ('wheelDeltaY' in origEvent) { e.deltaY = -origEvent.wheelDeltaY; }
    if ('wheelDeltaX' in origEvent) { e.deltaX = -origEvent.wheelDeltaX; }

    // modern wheel event handler
    if ('deltaY' in origEvent) {
      e.deltaY = origEvent.deltaY;
    }
    if ('deltaX' in origEvent) {
      e.deltaX = origEvent.deltaX;
    }

    // handle deltaMode for mouse wheel
    e.delta = e.deltaY || e.deltaX;
    if (origEvent.deltaMode === 1) {
      var lineHeight = 16;
      e.delta *= lineHeight;
      e.deltaY *= lineHeight;
      e.deltaX *= lineHeight;
    }

    return ($.event.dispatch || $.event.handle).call(this, e);
  };
}());

// extra module methods
var moduleMixin = {
  // provide function for firing native events
  fireNativeEvent: function(elements, eventName) {
    $(elements).each(function() {
      var element = this, eventObject;
      if (element.dispatchEvent) {
        eventObject = document.createEvent('HTMLEvents');
        eventObject.initEvent(eventName, true, true);
        element.dispatchEvent(eventObject);
      } else if (document.createEventObject) {
        eventObject = document.createEventObject();
        eventObject.target = element;
        element.fireEvent('on' + eventName, eventObject);
      }
    });
  },
  // bind event handlers for module instance (functions beggining with "on")
  bindHandlers: function() {
    var self = this;
    $.each(self, function(propName, propValue) {
      if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
        // dont use $.proxy here because it doesn't create unique handler
        self[propName] = function() {
          return propValue.apply(self, arguments);
        };
      }
    });
  }
};

// public API
var api = {
  version: version,
  modules: {},
  getOptions: function() {
    return $.extend({}, commonOptions);
  },
  setOptions: function(moduleName, moduleOptions) {
    if (arguments.length > 1) {
      // set module options
      if (this.modules[moduleName]) {
        $.extend(this.modules[moduleName].prototype.options, moduleOptions);
      }
    } else {
      // set common options
      $.extend(commonOptions, moduleName);
    }
  },
  addModule: function(proto) {
    // add module to list
    var Module = function(options) {
      // save instance to collection
      if (!options.element.data(commonOptions.dataKey)) {
        options.element.data(commonOptions.dataKey, this);
      }
      customInstances.push(this);

      // save options
      this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options);

      // bind event handlers to instance
      this.bindHandlers();

      // call constructor
      this.init.apply(this, arguments);
    };

    // parse options from HTML attribute
    var getInlineOptions = function(element) {
      var dataOptions = element.data(commonOptions.optionsKey),
        attrOptions = element.attr(commonOptions.optionsKey);

      if (dataOptions) {
        return dataOptions;
      } else if (attrOptions) {
        try {
          return $.parseJSON(attrOptions);
        } catch (e) {
          // ignore invalid attributes
        }
      }
    };

    // set proto as prototype for new module
    Module.prototype = proto;

    // add mixin methods to module proto
    $.extend(proto, moduleMixin);
    if (proto.plugins) {
      $.each(proto.plugins, function(pluginName, plugin) {
        $.extend(plugin.prototype, moduleMixin);
      });
    }

    // override destroy method
    var originalDestroy = Module.prototype.destroy;
    Module.prototype.destroy = function() {
      this.options.element.removeData(this.options.dataKey);

      for (var i = customInstances.length - 1; i >= 0; i--) {
        if (customInstances[i] === this) {
          customInstances.splice(i, 1);
          break;
        }
      }

      if (originalDestroy) {
        originalDestroy.apply(this, arguments);
      }
    };

    // save module to list
    this.modules[proto.name] = Module;
  },
  getInstance: function(element) {
    return $(element).data(commonOptions.dataKey);
  },
  replace: function(elements, moduleName, customOptions) {
    var self = this,
      instance;

    if (!commonOptions.styleSheetCreated) {
      createStyleSheet();
    }

    $(elements).each(function() {
      var moduleOptions,
        element = $(this);

      instance = element.data(commonOptions.dataKey);
      if (instance) {
        instance.refresh();
      } else {
        if (!moduleName) {
          $.each(self.modules, function(currentModuleName, module) {
            if (module.prototype.matchElement.call(module.prototype, element)) {
              moduleName = currentModuleName;
              return false;
            }
          });
        }
        if (moduleName) {
          moduleOptions = $.extend({ element: element }, customOptions);
          instance = new self.modules[moduleName](moduleOptions);
        }
      }
    });
    return instance;
  },
  refresh: function(elements) {
    $(elements).each(function() {
      var instance = $(this).data(commonOptions.dataKey);
      if (instance) {
        instance.refresh();
      }
    });
  },
  destroy: function(elements) {
    $(elements).each(function() {
      var instance = $(this).data(commonOptions.dataKey);
      if (instance) {
        instance.destroy();
      }
    });
  },
  replaceAll: function(context) {
    var self = this;
    $.each(this.modules, function(moduleName, module) {
      $(module.prototype.selector, context).each(function() {
        if (this.className.indexOf('jcf-ignore') < 0) {
          self.replace(this, moduleName);
        }
      });
    });
  },
  refreshAll: function(context) {
    if (context) {
      $.each(this.modules, function(moduleName, module) {
        $(module.prototype.selector, context).each(function() {
          var instance = $(this).data(commonOptions.dataKey);
          if (instance) {
            instance.refresh();
          }
        });
      });
    } else {
      for (var i = customInstances.length - 1; i >= 0; i--) {
        customInstances[i].refresh();
      }
    }
  },
  destroyAll: function(context) {
    if (context) {
      $.each(this.modules, function(moduleName, module) {
        $(module.prototype.selector, context).each(function(index, element) {
          var instance = $(element).data(commonOptions.dataKey);
          if (instance) {
            instance.destroy();
          }
        });
      });
    } else {
      while (customInstances.length) {
        customInstances[0].destroy();
      }
    }
  }
};

// always export API to the global window object
window.jcf = api;

return api;
})); 

/*!
* JavaScript Custom Forms : Select Module
*
* Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
* Released under the MIT license (LICENSE.txt)
*
* Version: 1.1.3
*/
;(function($, window) {
'use strict';

jcf.addModule({
  name: 'Select',
  selector: 'select',
  options: {
    element: null,
    multipleCompactStyle: false
  },
  plugins: {
    ListBox: ListBox,
    ComboBox: ComboBox,
    SelectList: SelectList
  },
  matchElement: function(element) {
    return element.is('select');
  },
  init: function() {
    this.element = $(this.options.element);
    this.createInstance();
  },
  isListBox: function() {
    return this.element.is('[size]:not([jcf-size]), [multiple]');
  },
  createInstance: function() {
    if (this.instance) {
      this.instance.destroy();
    }
    if (this.isListBox() && !this.options.multipleCompactStyle) {
      this.instance = new ListBox(this.options);
    } else {
      this.instance = new ComboBox(this.options);
    }
  },
  refresh: function() {
    var typeMismatch = (this.isListBox() && this.instance instanceof ComboBox) ||
              (!this.isListBox() && this.instance instanceof ListBox);

    if (typeMismatch) {
      this.createInstance();
    } else {
      this.instance.refresh();
    }
  },
  destroy: function() {
    this.instance.destroy();
  }
});

// combobox module
function ComboBox(options) {
  this.options = $.extend({
    wrapNative: true,
    wrapNativeOnMobile: true,
    fakeDropInBody: true,
    useCustomScroll: true,
    flipDropToFit: true,
    maxVisibleItems: 10,
    fakeAreaStructure: '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
    fakeDropStructure: '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
    optionClassPrefix: 'jcf-option-',
    selectClassPrefix: 'jcf-select-',
    dropContentSelector: '.jcf-select-drop-content',
    selectTextSelector: '.jcf-select-text',
    dropActiveClass: 'jcf-drop-active',
    flipDropClass: 'jcf-drop-flipped'
  }, options);
  this.init();
}
$.extend(ComboBox.prototype, {
  init: function() {
    this.initStructure();
    this.bindHandlers();
    this.attachEvents();
    this.refresh();
  },
  initStructure: function() {
    // prepare structure
    this.win = $(window);
    this.doc = $(document);
    this.realElement = $(this.options.element);
    this.fakeElement = $(this.options.fakeAreaStructure).insertAfter(this.realElement);
    this.selectTextContainer = this.fakeElement.find(this.options.selectTextSelector);
    this.selectText = $('<span></span>').appendTo(this.selectTextContainer);
    makeUnselectable(this.fakeElement);

    // copy classes from original select
    this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));

    // handle compact multiple style
    if (this.realElement.prop('multiple')) {
      this.fakeElement.addClass('jcf-compact-multiple');
    }

    // detect device type and dropdown behavior
    if (this.options.isMobileDevice && this.options.wrapNativeOnMobile && !this.options.wrapNative) {
      this.options.wrapNative = true;
    }

    if (this.options.wrapNative) {
      // wrap native select inside fake block
      this.realElement.prependTo(this.fakeElement).css({
        position: 'absolute',
        height: '100%',
        width: '100%'
      }).addClass(this.options.resetAppearanceClass);
    } else {
      // just hide native select
      this.realElement.addClass(this.options.hiddenClass);
      this.fakeElement.attr('title', this.realElement.attr('title'));
      this.fakeDropTarget = this.options.fakeDropInBody ? $('body') : this.fakeElement;
    }
  },
  attachEvents: function() {
    // delayed refresh handler
    var self = this;
    this.delayedRefresh = function() {
      setTimeout(function() {
        self.refresh();
        if (self.list) {
          self.list.refresh();
          self.list.scrollToActiveOption();
        }
      }, 1);
    };

    // native dropdown event handlers
    if (this.options.wrapNative) {
      this.realElement.on({
        focus: this.onFocus,
        change: this.onChange,
        click: this.onChange,
        keydown: this.onChange
      });
    } else {
      // custom dropdown event handlers
      this.realElement.on({
        focus: this.onFocus,
        change: this.onChange,
        keydown: this.onKeyDown
      });
      this.fakeElement.on({
        'jcf-pointerdown': this.onSelectAreaPress
      });
    }
  },
  onKeyDown: function(e) {
    if (e.which === 13) {
      this.toggleDropdown();
    } else if (this.dropActive) {
      this.delayedRefresh();
    }
  },
  onChange: function() {
    this.refresh();
  },
  onFocus: function() {
    if (!this.pressedFlag || !this.focusedFlag) {
      this.fakeElement.addClass(this.options.focusClass);
      this.realElement.on('blur', this.onBlur);
      this.toggleListMode(true);
      this.focusedFlag = true;
    }
  },
  onBlur: function() {
    if (!this.pressedFlag) {
      this.fakeElement.removeClass(this.options.focusClass);
      this.realElement.off('blur', this.onBlur);
      this.toggleListMode(false);
      this.focusedFlag = false;
    }
  },
  onResize: function() {
    if (this.dropActive) {
      this.hideDropdown();
    }
  },
  onSelectDropPress: function() {
    this.pressedFlag = true;
  },
  onSelectDropRelease: function(e, pointerEvent) {
    this.pressedFlag = false;
    if (pointerEvent.pointerType === 'mouse') {
      this.realElement.focus();
    }
  },
  onSelectAreaPress: function(e) {
    // skip click if drop inside fake element or real select is disabled
    var dropClickedInsideFakeElement = !this.options.fakeDropInBody && $(e.target).closest(this.dropdown).length;
    if (dropClickedInsideFakeElement || e.button > 1 || this.realElement.is(':disabled')) {
      return;
    }

    // toggle dropdown visibility
    this.selectOpenedByEvent = e.pointerType;
    this.toggleDropdown();

    // misc handlers
    if (!this.focusedFlag) {
      if (e.pointerType === 'mouse') {
        this.realElement.focus();
      } else {
        this.onFocus(e);
      }
    }
    this.pressedFlag = true;
    this.fakeElement.addClass(this.options.pressedClass);
    this.doc.on('jcf-pointerup', this.onSelectAreaRelease);
  },
  onSelectAreaRelease: function(e) {
    if (this.focusedFlag && e.pointerType === 'mouse') {
      this.realElement.focus();
    }
    this.pressedFlag = false;
    this.fakeElement.removeClass(this.options.pressedClass);
    this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
  },
  onOutsideClick: function(e) {
    var target = $(e.target),
      clickedInsideSelect = target.closest(this.fakeElement).length || target.closest(this.dropdown).length;

    if (!clickedInsideSelect) {
      this.hideDropdown();
    }
  },
  onSelect: function() {
    this.refresh();

    if (this.realElement.prop('multiple')) {
      this.repositionDropdown();
    } else {
      this.hideDropdown();
    }

    this.fireNativeEvent(this.realElement, 'change');
  },
  toggleListMode: function(state) {
    if (!this.options.wrapNative) {
      if (state) {
        // temporary change select to list to avoid appearing of native dropdown
        this.realElement.attr({
          size: 4,
          'jcf-size': ''
        });
      } else {
        // restore select from list mode to dropdown select
        if (!this.options.wrapNative) {
          this.realElement.removeAttr('size jcf-size');
        }
      }
    }
  },
  createDropdown: function() {
    // destroy previous dropdown if needed
    if (this.dropdown) {
      this.list.destroy();
      this.dropdown.remove();
    }

    // create new drop container
    this.dropdown = $(this.options.fakeDropStructure).appendTo(this.fakeDropTarget);
    this.dropdown.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
    makeUnselectable(this.dropdown);

    // handle compact multiple style
    if (this.realElement.prop('multiple')) {
      this.dropdown.addClass('jcf-compact-multiple');
    }

    // set initial styles for dropdown in body
    if (this.options.fakeDropInBody) {
      this.dropdown.css({
        position: 'absolute',
        top: -9999
      });
    }

    // create new select list instance
    this.list = new SelectList({
      useHoverClass: true,
      handleResize: false,
      alwaysPreventMouseWheel: true,
      maxVisibleItems: this.options.maxVisibleItems,
      useCustomScroll: this.options.useCustomScroll,
      holder: this.dropdown.find(this.options.dropContentSelector),
      multipleSelectWithoutKey: this.realElement.prop('multiple'),
      element: this.realElement
    });
    $(this.list).on({
      select: this.onSelect,
      press: this.onSelectDropPress,
      release: this.onSelectDropRelease
    });
  },
  repositionDropdown: function() {
    var selectOffset = this.fakeElement.offset(),
      selectWidth = this.fakeElement.outerWidth(),
      selectHeight = this.fakeElement.outerHeight(),
      dropHeight = this.dropdown.css('width', selectWidth).outerHeight(),
      winScrollTop = this.win.scrollTop(),
      winHeight = this.win.height(),
      calcTop, calcLeft, bodyOffset, needFlipDrop = false;

    // check flip drop position
    if (selectOffset.top + selectHeight + dropHeight > winScrollTop + winHeight && selectOffset.top - dropHeight > winScrollTop) {
      needFlipDrop = true;
    }

    if (this.options.fakeDropInBody) {
      bodyOffset = this.fakeDropTarget.css('position') !== 'static' ? this.fakeDropTarget.offset().top : 0;
      if (this.options.flipDropToFit && needFlipDrop) {
        // calculate flipped dropdown position
        calcLeft = selectOffset.left;
        calcTop = selectOffset.top - dropHeight - bodyOffset;
      } else {
        // calculate default drop position
        calcLeft = selectOffset.left;
        calcTop = selectOffset.top + selectHeight - bodyOffset;
      }

      // update drop styles
      this.dropdown.css({
        width: selectWidth,
        left: calcLeft,
        top: calcTop
      });
    }

    // refresh flipped class
    this.dropdown.add(this.fakeElement).toggleClass(this.options.flipDropClass, this.options.flipDropToFit && needFlipDrop);
  },
  showDropdown: function() {
    // do not show empty custom dropdown
    if (!this.realElement.prop('options').length) {
      return;
    }

    // create options list if not created
    if (!this.dropdown) {
      this.createDropdown();
    }

    // show dropdown
    this.dropActive = true;
    this.dropdown.appendTo(this.fakeDropTarget);
    this.fakeElement.addClass(this.options.dropActiveClass);
    this.refreshSelectedText();
    this.repositionDropdown();
    this.list.setScrollTop(this.savedScrollTop);
    this.list.refresh();

    // add temporary event handlers
    this.win.on('resize', this.onResize);
    this.doc.on('jcf-pointerdown', this.onOutsideClick);
  },
  hideDropdown: function() {
    if (this.dropdown) {
      this.savedScrollTop = this.list.getScrollTop();
      this.fakeElement.removeClass(this.options.dropActiveClass + ' ' + this.options.flipDropClass);
      this.dropdown.removeClass(this.options.flipDropClass).detach();
      this.doc.off('jcf-pointerdown', this.onOutsideClick);
      this.win.off('resize', this.onResize);
      this.dropActive = false;
      if (this.selectOpenedByEvent === 'touch') {
        this.onBlur();
      }
    }
  },
  toggleDropdown: function() {
    if (this.dropActive) {
      this.hideDropdown();
    } else {
      this.showDropdown();
    }
  },
  refreshSelectedText: function() {
    // redraw selected area
    var selectedIndex = this.realElement.prop('selectedIndex'),
      selectedOption = this.realElement.prop('options')[selectedIndex],
      selectedOptionImage = selectedOption ? selectedOption.getAttribute('data-image') : null,
      selectedOptionText = '',
      selectedOptionClasses,
      self = this;

    if (this.realElement.prop('multiple')) {
      $.each(this.realElement.prop('options'), function(index, option) {
        if (option.selected) {
          selectedOptionText += (selectedOptionText ? ', ' : '') + option.innerHTML;
        }
      });
      if (!selectedOptionText) {
        selectedOptionText = self.realElement.attr('placeholder') || '';
      }
      this.selectText.removeAttr('class').html(selectedOptionText);
    } else if (!selectedOption) {
      if (this.selectImage) {
        this.selectImage.hide();
      }
      this.selectText.removeAttr('class').empty();
    } else if (this.currentSelectedText !== selectedOption.innerHTML || this.currentSelectedImage !== selectedOptionImage) {
      selectedOptionClasses = getPrefixedClasses(selectedOption.className, this.options.optionClassPrefix);
      this.selectText.attr('class', selectedOptionClasses).html(selectedOption.innerHTML);

      if (selectedOptionImage) {
        if (!this.selectImage) {
          this.selectImage = $('<img>').prependTo(this.selectTextContainer).hide();
        }
        this.selectImage.attr('src', selectedOptionImage).show();
      } else if (this.selectImage) {
        this.selectImage.hide();
      }

      this.currentSelectedText = selectedOption.innerHTML;
      this.currentSelectedImage = selectedOptionImage;
    }
  },
  refresh: function() {
    // refresh fake select visibility
    if (this.realElement.prop('style').display === 'none') {
      this.fakeElement.hide();
    } else {
      this.fakeElement.show();
    }

    // refresh selected text
    this.refreshSelectedText();

    // handle disabled state
    this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
  },
  destroy: function() {
    // restore structure
    if (this.options.wrapNative) {
      this.realElement.insertBefore(this.fakeElement).css({
        position: '',
        height: '',
        width: ''
      }).removeClass(this.options.resetAppearanceClass);
    } else {
      this.realElement.removeClass(this.options.hiddenClass);
      if (this.realElement.is('[jcf-size]')) {
        this.realElement.removeAttr('size jcf-size');
      }
    }

    // removing element will also remove its event handlers
    this.fakeElement.remove();

    // remove other event handlers
    this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
    this.realElement.off({
      focus: this.onFocus
    });
  }
});

// listbox module
function ListBox(options) {
  this.options = $.extend({
    wrapNative: true,
    useCustomScroll: true,
    fakeStructure: '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
    selectClassPrefix: 'jcf-select-',
    listHolder: '.jcf-list-wrapper'
  }, options);
  this.init();
}
$.extend(ListBox.prototype, {
  init: function() {
    this.bindHandlers();
    this.initStructure();
    this.attachEvents();
  },
  initStructure: function() {
    this.realElement = $(this.options.element);
    this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
    this.listHolder = this.fakeElement.find(this.options.listHolder);
    makeUnselectable(this.fakeElement);

    // copy classes from original select
    this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
    this.realElement.addClass(this.options.hiddenClass);

    this.list = new SelectList({
      useCustomScroll: this.options.useCustomScroll,
      holder: this.listHolder,
      selectOnClick: false,
      element: this.realElement
    });
  },
  attachEvents: function() {
    // delayed refresh handler
    var self = this;
    this.delayedRefresh = function(e) {
      if (e && e.which === 16) {
        // ignore SHIFT key
        return;
      } else {
        clearTimeout(self.refreshTimer);
        self.refreshTimer = setTimeout(function() {
          self.refresh();
          self.list.scrollToActiveOption();
        }, 1);
      }
    };

    // other event handlers
    this.realElement.on({
      focus: this.onFocus,
      click: this.delayedRefresh,
      keydown: this.delayedRefresh
    });

    // select list event handlers
    $(this.list).on({
      select: this.onSelect,
      press: this.onFakeOptionsPress,
      release: this.onFakeOptionsRelease
    });
  },
  onFakeOptionsPress: function(e, pointerEvent) {
    this.pressedFlag = true;
    if (pointerEvent.pointerType === 'mouse') {
      this.realElement.focus();
    }
  },
  onFakeOptionsRelease: function(e, pointerEvent) {
    this.pressedFlag = false;
    if (pointerEvent.pointerType === 'mouse') {
      this.realElement.focus();
    }
  },
  onSelect: function() {
    this.fireNativeEvent(this.realElement, 'change');
    this.fireNativeEvent(this.realElement, 'click');
  },
  onFocus: function() {
    if (!this.pressedFlag || !this.focusedFlag) {
      this.fakeElement.addClass(this.options.focusClass);
      this.realElement.on('blur', this.onBlur);
      this.focusedFlag = true;
    }
  },
  onBlur: function() {
    if (!this.pressedFlag) {
      this.fakeElement.removeClass(this.options.focusClass);
      this.realElement.off('blur', this.onBlur);
      this.focusedFlag = false;
    }
  },
  refresh: function() {
    this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
    this.list.refresh();
  },
  destroy: function() {
    this.list.destroy();
    this.realElement.insertBefore(this.fakeElement).removeClass(this.options.hiddenClass);
    this.fakeElement.remove();
  }
});

// options list module
function SelectList(options) {
  this.options = $.extend({
    holder: null,
    maxVisibleItems: 10,
    selectOnClick: true,
    useHoverClass: false,
    useCustomScroll: false,
    handleResize: true,
    multipleSelectWithoutKey: false,
    alwaysPreventMouseWheel: false,
    indexAttribute: 'data-index',
    cloneClassPrefix: 'jcf-option-',
    containerStructure: '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
    containerSelector: '.jcf-list-content',
    captionClass: 'jcf-optgroup-caption',
    disabledClass: 'jcf-disabled',
    optionClass: 'jcf-option',
    groupClass: 'jcf-optgroup',
    hoverClass: 'jcf-hover',
    selectedClass: 'jcf-selected',
    scrollClass: 'jcf-scroll-active'
  }, options);
  this.init();
}
$.extend(SelectList.prototype, {
  init: function() {
    this.initStructure();
    this.refreshSelectedClass();
    this.attachEvents();
  },
  initStructure: function() {
    this.element = $(this.options.element);
    this.indexSelector = '[' + this.options.indexAttribute + ']';
    this.container = $(this.options.containerStructure).appendTo(this.options.holder);
    this.listHolder = this.container.find(this.options.containerSelector);
    this.lastClickedIndex = this.element.prop('selectedIndex');
    this.rebuildList();
  },
  attachEvents: function() {
    this.bindHandlers();
    this.listHolder.on('jcf-pointerdown', this.indexSelector, this.onItemPress);
    this.listHolder.on('jcf-pointerdown', this.onPress);

    if (this.options.useHoverClass) {
      this.listHolder.on('jcf-pointerover', this.indexSelector, this.onHoverItem);
    }
  },
  onPress: function(e) {
    $(this).trigger('press', e);
    this.listHolder.on('jcf-pointerup', this.onRelease);
  },
  onRelease: function(e) {
    $(this).trigger('release', e);
    this.listHolder.off('jcf-pointerup', this.onRelease);
  },
  onHoverItem: function(e) {
    var hoverIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute));
    this.fakeOptions.removeClass(this.options.hoverClass).eq(hoverIndex).addClass(this.options.hoverClass);
  },
  onItemPress: function(e) {
    if (e.pointerType === 'touch' || this.options.selectOnClick) {
      // select option after "click"
      this.tmpListOffsetTop = this.list.offset().top;
      this.listHolder.on('jcf-pointerup', this.indexSelector, this.onItemRelease);
    } else {
      // select option immediately
      this.onSelectItem(e);
    }
  },
  onItemRelease: function(e) {
    // remove event handlers and temporary data
    this.listHolder.off('jcf-pointerup', this.indexSelector, this.onItemRelease);

    // simulate item selection
    if (this.tmpListOffsetTop === this.list.offset().top) {
      this.listHolder.on('click', this.indexSelector, { savedPointerType: e.pointerType }, this.onSelectItem);
    }
    delete this.tmpListOffsetTop;
  },
  onSelectItem: function(e) {
    var clickedIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute)),
      pointerType = e.data && e.data.savedPointerType || e.pointerType || 'mouse',
      range;

    // remove click event handler
    this.listHolder.off('click', this.indexSelector, this.onSelectItem);

    // ignore clicks on disabled options
    if (e.button > 1 || this.realOptions[clickedIndex].disabled) {
      return;
    }

    if (this.element.prop('multiple')) {
      if (e.metaKey || e.ctrlKey || pointerType === 'touch' || this.options.multipleSelectWithoutKey) {
        // if CTRL/CMD pressed or touch devices - toggle selected option
        this.realOptions[clickedIndex].selected = !this.realOptions[clickedIndex].selected;
      } else if (e.shiftKey) {
        // if SHIFT pressed - update selection
        range = [this.lastClickedIndex, clickedIndex].sort(function(a, b) {
          return a - b;
        });
        this.realOptions.each(function(index, option) {
          option.selected = (index >= range[0] && index <= range[1]);
        });
      } else {
        // set single selected index
        this.element.prop('selectedIndex', clickedIndex);
      }
    } else {
      this.element.prop('selectedIndex', clickedIndex);
    }

    // save last clicked option
    if (!e.shiftKey) {
      this.lastClickedIndex = clickedIndex;
    }

    // refresh classes
    this.refreshSelectedClass();

    // scroll to active item in desktop browsers
    if (pointerType === 'mouse') {
      this.scrollToActiveOption();
    }

    // make callback when item selected
    $(this).trigger('select');
  },
  rebuildList: function() {
    // rebuild options
    var self = this,
      rootElement = this.element[0];

    // recursively create fake options
    this.storedSelectHTML = rootElement.innerHTML;
    this.optionIndex = 0;
    this.list = $(this.createOptionsList(rootElement));
    this.listHolder.empty().append(this.list);
    this.realOptions = this.element.find('option');
    this.fakeOptions = this.list.find(this.indexSelector);
    this.fakeListItems = this.list.find('.' + this.options.captionClass + ',' + this.indexSelector);
    delete this.optionIndex;

    // detect max visible items
    var maxCount = this.options.maxVisibleItems,
      sizeValue = this.element.prop('size');
    if (sizeValue > 1 && !this.element.is('[jcf-size]')) {
      maxCount = sizeValue;
    }

    // handle scrollbar
    var needScrollBar = this.fakeOptions.length > maxCount;
    this.container.toggleClass(this.options.scrollClass, needScrollBar);
    if (needScrollBar) {
      // change max-height
      this.listHolder.css({
        maxHeight: this.getOverflowHeight(maxCount),
        overflow: 'auto'
      });

      if (this.options.useCustomScroll && jcf.modules.Scrollable) {
        // add custom scrollbar if specified in options
        jcf.replace(this.listHolder, 'Scrollable', {
          handleResize: this.options.handleResize,
          alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel
        });
        return;
      }
    }

    // disable edge wheel scrolling
    if (this.options.alwaysPreventMouseWheel) {
      this.preventWheelHandler = function(e) {
        var currentScrollTop = self.listHolder.scrollTop(),
          maxScrollTop = self.listHolder.prop('scrollHeight') - self.listHolder.innerHeight();

        // check edge cases
        if ((currentScrollTop <= 0 && e.deltaY < 0) || (currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
          e.preventDefault();
        }
      };
      this.listHolder.on('jcf-mousewheel', this.preventWheelHandler);
    }
  },
  refreshSelectedClass: function() {
    var self = this,
      selectedItem,
      isMultiple = this.element.prop('multiple'),
      selectedIndex = this.element.prop('selectedIndex');

    if (isMultiple) {
      this.realOptions.each(function(index, option) {
        self.fakeOptions.eq(index).toggleClass(self.options.selectedClass, !!option.selected);
      });
    } else {
      this.fakeOptions.removeClass(this.options.selectedClass + ' ' + this.options.hoverClass);
      selectedItem = this.fakeOptions.eq(selectedIndex).addClass(this.options.selectedClass);
      if (this.options.useHoverClass) {
        selectedItem.addClass(this.options.hoverClass);
      }
    }
  },
  scrollToActiveOption: function() {
    // scroll to target option
    var targetOffset = this.getActiveOptionOffset();
    if (typeof targetOffset === 'number') {
      this.listHolder.prop('scrollTop', targetOffset);
    }
  },
  getSelectedIndexRange: function() {
    var firstSelected = -1, lastSelected = -1;
    this.realOptions.each(function(index, option) {
      if (option.selected) {
        if (firstSelected < 0) {
          firstSelected = index;
        }
        lastSelected = index;
      }
    });
    return [firstSelected, lastSelected];
  },
  getChangedSelectedIndex: function() {
    var selectedIndex = this.element.prop('selectedIndex'),
      targetIndex;

    if (this.element.prop('multiple')) {
      // multiple selects handling
      if (!this.previousRange) {
        this.previousRange = [selectedIndex, selectedIndex];
      }
      this.currentRange = this.getSelectedIndexRange();
      targetIndex = this.currentRange[this.currentRange[0] !== this.previousRange[0] ? 0 : 1];
      this.previousRange = this.currentRange;
      return targetIndex;
    } else {
      // single choice selects handling
      return selectedIndex;
    }
  },
  getActiveOptionOffset: function() {
    // calc values
    var dropHeight = this.listHolder.height(),
      dropScrollTop = this.listHolder.prop('scrollTop'),
      currentIndex = this.getChangedSelectedIndex(),
      fakeOption = this.fakeOptions.eq(currentIndex),
      fakeOptionOffset = fakeOption.offset().top - this.list.offset().top,
      fakeOptionHeight = fakeOption.innerHeight();

    // scroll list
    if (fakeOptionOffset + fakeOptionHeight >= dropScrollTop + dropHeight) {
      // scroll down (always scroll to option)
      return fakeOptionOffset - dropHeight + fakeOptionHeight;
    } else if (fakeOptionOffset < dropScrollTop) {
      // scroll up to option
      return fakeOptionOffset;
    }
  },
  getOverflowHeight: function(sizeValue) {
    var item = this.fakeListItems.eq(sizeValue - 1),
      listOffset = this.list.offset().top,
      itemOffset = item.offset().top,
      itemHeight = item.innerHeight();

    return itemOffset + itemHeight - listOffset;
  },
  getScrollTop: function() {
    return this.listHolder.scrollTop();
  },
  setScrollTop: function(value) {
    this.listHolder.scrollTop(value);
  },
  createOption: function(option) {
    var newOption = document.createElement('span');
    newOption.className = this.options.optionClass;
    newOption.innerHTML = option.innerHTML;
    newOption.setAttribute(this.options.indexAttribute, this.optionIndex++);

    var optionImage, optionImageSrc = option.getAttribute('data-image');
    if (optionImageSrc) {
      optionImage = document.createElement('img');
      optionImage.src = optionImageSrc;
      newOption.insertBefore(optionImage, newOption.childNodes[0]);
    }
    if (option.disabled) {
      newOption.className += ' ' + this.options.disabledClass;
    }
    if (option.className) {
      newOption.className += ' ' + getPrefixedClasses(option.className, this.options.cloneClassPrefix);
    }
    return newOption;
  },
  createOptGroup: function(optgroup) {
    var optGroupContainer = document.createElement('span'),
      optGroupName = optgroup.getAttribute('label'),
      optGroupCaption, optGroupList;

    // create caption
    optGroupCaption = document.createElement('span');
    optGroupCaption.className = this.options.captionClass;
    optGroupCaption.innerHTML = optGroupName;
    optGroupContainer.appendChild(optGroupCaption);

    // create list of options
    if (optgroup.children.length) {
      optGroupList = this.createOptionsList(optgroup);
      optGroupContainer.appendChild(optGroupList);
    }

    optGroupContainer.className = this.options.groupClass;
    return optGroupContainer;
  },
  createOptionContainer: function() {
    var optionContainer = document.createElement('li');
    return optionContainer;
  },
  createOptionsList: function(container) {
    var self = this,
      list = document.createElement('ul');

    $.each(container.children, function(index, currentNode) {
      var item = self.createOptionContainer(currentNode),
        newNode;

      switch (currentNode.tagName.toLowerCase()) {
        case 'option': newNode = self.createOption(currentNode); break;
        case 'optgroup': newNode = self.createOptGroup(currentNode); break;
      }
      list.appendChild(item).appendChild(newNode);
    });
    return list;
  },
  refresh: function() {
    // check for select innerHTML changes
    if (this.storedSelectHTML !== this.element.prop('innerHTML')) {
      this.rebuildList();
    }

    // refresh custom scrollbar
    var scrollInstance = jcf.getInstance(this.listHolder);
    if (scrollInstance) {
      scrollInstance.refresh();
    }

    // refresh selectes classes
    this.refreshSelectedClass();
  },
  destroy: function() {
    this.listHolder.off('jcf-mousewheel', this.preventWheelHandler);
    this.listHolder.off('jcf-pointerdown', this.indexSelector, this.onSelectItem);
    this.listHolder.off('jcf-pointerover', this.indexSelector, this.onHoverItem);
    this.listHolder.off('jcf-pointerdown', this.onPress);
  }
});

// helper functions
var getPrefixedClasses = function(className, prefixToAdd) {
  return className ? className.replace(/[\s]*([\S]+)+[\s]*/gi, prefixToAdd + '$1 ') : '';
};
var makeUnselectable = (function() {
  var unselectableClass = jcf.getOptions().unselectableClass;
  function preventHandler(e) {
    e.preventDefault();
  }
  return function(node) {
    node.addClass(unselectableClass).on('selectstart', preventHandler);
  };
}());

}(jQuery, this));


/*!
* JavaScript Custom Forms : File Module
*
* Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
* Released under the MIT license (LICENSE.txt)
*
* Version: 1.1.3
*/
;(function($) {
'use strict';

jcf.addModule({
  name: 'File',
  selector: 'input[type="file"]',
  options: {
    fakeStructure: '<span class="jcf-file"><span class="jcf-fake-input"></span><span class="jcf-upload-button"><span class="jcf-button-content"></span></span></span>',
    buttonText: 'Choose file',
    placeholderText: 'No file chosen',
    realElementClass: 'jcf-real-element',
    extensionPrefixClass: 'jcf-extension-',
    selectedFileBlock: '.jcf-fake-input',
    buttonTextBlock: '.jcf-button-content'
  },
  matchElement: function(element) {
    return element.is('input[type="file"]');
  },
  init: function() {
    this.initStructure();
    this.attachEvents();
    this.refresh();
  },
  initStructure: function() {
    this.doc = $(document);
    this.realElement = $(this.options.element).addClass(this.options.realElementClass);
    this.fakeElement = $(this.options.fakeStructure).insertBefore(this.realElement);
    this.fileNameBlock = this.fakeElement.find(this.options.selectedFileBlock);
    this.buttonTextBlock = this.fakeElement.find(this.options.buttonTextBlock).text(this.options.buttonText);

    this.realElement.appendTo(this.fakeElement).css({
      position: 'absolute',
      opacity: 0
    });
  },
  attachEvents: function() {
    this.realElement.on({
      'jcf-pointerdown': this.onPress,
      change: this.onChange,
      focus: this.onFocus
    });
  },
  onChange: function() {
    this.refresh();
  },
  onFocus: function() {
    this.fakeElement.addClass(this.options.focusClass);
    this.realElement.on('blur', this.onBlur);
  },
  onBlur: function() {
    this.fakeElement.removeClass(this.options.focusClass);
    this.realElement.off('blur', this.onBlur);
  },
  onPress: function() {
    this.fakeElement.addClass(this.options.pressedClass);
    this.doc.on('jcf-pointerup', this.onRelease);
  },
  onRelease: function() {
    this.fakeElement.removeClass(this.options.pressedClass);
    this.doc.off('jcf-pointerup', this.onRelease);
  },
  getFileName: function() {
    var resultFileName = '',
      files = this.realElement.prop('files');

    if (files && files.length) {
      $.each(files, function(index, file) {
        resultFileName += (index > 0 ? ', ' : '') + file.name;
      });
    } else {
      resultFileName = this.realElement.val().replace(/^[\s\S]*(?:\\|\/)([\s\S^\\\/]*)$/g, '$1');
    }

    return resultFileName;
  },
  getFileExtension: function() {
    var fileName = this.realElement.val();
    return fileName.lastIndexOf('.') < 0 ? '' : fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
  },
  updateExtensionClass: function() {
    var currentExtension = this.getFileExtension(),
      currentClassList = this.fakeElement.prop('className'),
      cleanedClassList = currentClassList.replace(new RegExp('(\\s|^)' + this.options.extensionPrefixClass + '[^ ]+','gi'), '');

    this.fakeElement.prop('className', cleanedClassList);
    if (currentExtension) {
      this.fakeElement.addClass(this.options.extensionPrefixClass + currentExtension);
    }
  },
  refresh: function() {
    var selectedFileName = this.getFileName() || this.options.placeholderText;
    this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
    this.fileNameBlock.text(selectedFileName);
    this.updateExtensionClass();
  },
  destroy: function() {
    // reset styles and restore element position
    this.realElement.insertBefore(this.fakeElement).removeClass(this.options.realElementClass).css({
      position: '',
      opacity: ''
    });
    this.fakeElement.remove();

    // remove event handlers
    this.realElement.off({
      'jcf-pointerdown': this.onPress,
      change: this.onChange,
      focus: this.onFocus,
      blur: this.onBlur
    });
    this.doc.off('jcf-pointerup', this.onRelease);
  }
});

}(jQuery));

//keyboard focus js
!function(a){function b(b,d,e){e=e.replace(/\./g,"");var f;b.on("mousedown.keyboardFocus",d,function(b){a(b.target).removeClass(e)}),b.on("focus.keyboardFocus",d,function(b){c&&(f=a(b.target),f.addClass(e),f.trigger("keyboardFocus"))}),b.on("blur.keyboardFocus",d,function(b){f=a(b.target),f.removeClass(e),c&&f.trigger("keyboardBlur")})}var c=!0;a(document).on("keydown.keyboardFocusGlobal",function(a){c=!0}),a(document).on("mousedown.keyboardFocusGlobal",function(a){c=!1}),a.keyboardFocus=function(c){if(!c)throw new Error("Please pass a mapping of selectors to focus class names to `keyboardFocus`.");for(var d in c)c.hasOwnProperty(d)&&b(a(document),d,c[d])},a.offKeyboardFocus=function(){a(document).off(".keyboardFocus")},a.fn.keyboardFocus=function(a){if(!a)throw new Error("Please pass your focus class names into `$(...).keyboardFocus(...)`.");return b(this,null,a),this},a.fn.offKeyboardFocus=function(){this.off(".keyboardFocus")}}(jQuery);

/*! Picturefill - v3.0.1 - 2015-09-30
* http://scottjehl.github.io/picturefill
* Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
*/
!function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<41&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"  "===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){z[b]=!1,aa()},d.onload=function(){z[b]=1===d.width,aa()},d.src=c,"pending"}function f(){L=!1,O=a.devicePixelRatio,M={},N={},s.DPR=O||1,P.width=Math.max(a.innerWidth||0,y.clientWidth),P.height=Math.max(a.innerHeight||0,y.clientHeight),P.vw=P.width/100,P.vh=P.height/100,r=[P.height,P.width,O].join("-"),P.em=s.getEmValue(),P.rem=P.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===A.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||_(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),W.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):X.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):W.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(S),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(T),m>=l)return n;g=c(U),h=[],","===g.slice(-1)?(g=g.replace(V,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=function(){},u=b.createElement("img"),v=u.getAttribute,w=u.setAttribute,x=u.removeAttribute,y=b.documentElement,z={},A={algorithm:""},B="data-pfsrc",C=B+"set",D=navigator.userAgent,E=/rident/.test(D)||/ecko/.test(D)&&D.match(/rv\:(\d+)/)&&RegExp.$1>35,F="currentSrc",G=/\s+\+?\d+(e\d+)?w/,H=/(\([^)]+\))?\s*(.+)/,I=a.picturefillCFG,J="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",K="font-size:100%!important;",L=!0,M={},N={},O=a.devicePixelRatio,P={px:1,"in":96},Q=b.createElement("a"),R=!1,S=/^[ \t\n\r\u000c]+/,T=/^[, \t\n\r\u000c]+/,U=/^[^ \t\n\r\u000c]+/,V=/[,]+$/,W=/^\d+$/,X=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Y=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},Z=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},$=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=Z(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in M))if(M[b]=!1,d&&(e=b.match(a)))M[b]=e[1]*P[e[2]];else try{M[b]=new Function("e",c(b))(P)}catch(f){}return M[b]}}(),_=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},aa=function(a){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),R=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}};o=a.console&&console.warn?function(a){console.warn(a)}:t,F in u||(F="src"),z["image/jpeg"]=!0,z["image/gif"]=!0,z["image/png"]=!0,z["image/svg+xml"]=b.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in u,s.supSizes="sizes"in u,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){u.srcset="data:,a",a.src="data:,a",s.supSrcset=u.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=A,s.supSrcset&&(s.sel+=",img["+C+"]"),s.DPR=O||1,s.u=P,s.types=z,q=s.supSrcset&&!s.supSizes,s.setSize=t,s.makeUrl=Z(function(a){return Q.href=a,Q.href}),s.qsa=function(a,b){return a.querySelectorAll(b)},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?$(a):!0},s.calcLength=function(a){var b=$(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?z[a]:!0},s.parseSize=Z(function(a){var b=(a||"").match(H);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=y.style.cssText,e=a.style.cssText;c.style.cssText=J,y.style.cssText=K,a.style.cssText=K,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),y.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in N)||A.uT){var b=s.calcLength(n(a));N[a]=b?b:P.width}return N[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)_(b[c],a.sizes)}return b},s.setRes.res=_,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[F],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=E&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=v.call(a,"src"),j.src?w.call(a,B,j.src):x.call(a,B)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=v.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:v.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&G.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g),h&&s.supSrcset&&!j.supported&&(e?(w.call(a,C,e),a.srcset=""):x.call(a,C)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!R||L||O!==a.devicePixelRatio)&&f()},s.supPicture?(aa=t,s.fillImg=t):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=y.clientHeight,i=function(){L=Math.max(a.innerWidth||0,y.clientWidth)!==P.width||y.clientHeight!==h,h=y.clientHeight,L&&s.fillImgs()};Y(a,"resize",g(i,99)),Y(b,"readystatechange",e)}(),s.picturefill=aa,s.fillImgs=aa,s.teardownRun=t,aa._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(A[b]=a[0],R&&s.fillImgs({reselect:!0}))}};for(;I&&I.length;)a.picturefillCFG.push(I.shift());a.picturefill=aa,"object"==typeof module&&"object"==typeof module.exports?module.exports=aa:"function"==typeof define&&define.amd&&define("picturefill",function(){return aa}),s.supPicture||(z["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);

/*
* Responsive Layout helper
*/
window.ResponsiveHelper = (function($){
// init variables
var handlers = [],
  prevWinWidth,
  win = $(window),
  nativeMatchMedia = false;

// detect match media support
if(window.matchMedia) {
  if(window.Window && window.matchMedia === Window.prototype.matchMedia) {
    nativeMatchMedia = true;
  } else if(window.matchMedia.toString().indexOf('native') > -1) {
    nativeMatchMedia = true;
  }
}

// prepare resize handler
function resizeHandler() {
  var winWidth = win.width();
  if(winWidth !== prevWinWidth) {
    prevWinWidth = winWidth;

    // loop through range groups
    $.each(handlers, function(index, rangeObject){
      // disable current active area if needed
      $.each(rangeObject.data, function(property, item) {
        if(item.currentActive && !matchRange(item.range[0], item.range[1])) {
          item.currentActive = false;
          if(typeof item.disableCallback === 'function') {
            item.disableCallback();
          }
        }
      });

      // enable areas that match current width
      $.each(rangeObject.data, function(property, item) {
        if(!item.currentActive && matchRange(item.range[0], item.range[1])) {
          // make callback
          item.currentActive = true;
          if(typeof item.enableCallback === 'function') {
            item.enableCallback();
          }
        }
      });
    });
  }
}
win.bind('load resize orientationchange', resizeHandler);

// test range
function matchRange(r1, r2) {
  var mediaQueryString = '';
  if(r1 > 0) {
    mediaQueryString += '(min-width: ' + r1 + 'px)';
  }
  if(r2 < Infinity) {
    mediaQueryString += (mediaQueryString ? ' and ' : '') + '(max-width: ' + r2 + 'px)';
  }
  return matchQuery(mediaQueryString, r1, r2);
}

// media query function
function matchQuery(query, r1, r2) {
  if(window.matchMedia && nativeMatchMedia) {
    return matchMedia(query).matches;
  } else if(window.styleMedia) {
    return styleMedia.matchMedium(query);
  } else if(window.media) {
    return media.matchMedium(query);
  } else {
    return prevWinWidth >= r1 && prevWinWidth <= r2;
  }
}

// range parser
function parseRange(rangeStr) {
  var rangeData = rangeStr.split('..');
  var x1 = parseInt(rangeData[0], 10) || -Infinity;
  var x2 = parseInt(rangeData[1], 10) || Infinity;
  return [x1, x2].sort(function(a, b){
    return a - b;
  });
}

// export public functions
return {
  addRange: function(ranges) {
    // parse data and add items to collection
    var result = {data:{}};
    $.each(ranges, function(property, data){
      result.data[property] = {
        range: parseRange(property),
        enableCallback: data.on,
        disableCallback: data.off
      };
    });
    handlers.push(result);

    // call resizeHandler to recalculate all events
    prevWinWidth = null;
    resizeHandler();
  }
};
}(jQuery));

/*
 * jQuery sticky box plugin
 */
;(function($, $win) {
  'use strict';

  function StickyScrollBlock($stickyBox, options) {
    this.options = options;
    this.$stickyBox = $stickyBox;
    this.init();
  }

  var StickyScrollBlockPrototype = {
    init: function() {
      this.findElements();
      this.attachEvents();
      this.makeCallback('onInit');
    },

    findElements: function() {
      // find parent container in which will be box move
      this.$container = this.$stickyBox.closest(this.options.container);
      // define box wrap flag
      this.isWrap = this.options.positionType === 'fixed' && this.options.setBoxHeight;
      // define box move flag
      this.moveInContainer = !!this.$container.length;
      // wrapping box to set place in content
      if (this.isWrap) {
        this.$stickyBoxWrap = this.$stickyBox.wrap('<div class="' + this.getWrapClass() + '"/>').parent();
      }
      //define block to add active class
      this.parentForActive = this.getParentForActive();
      this.isInit = true;
    },

    attachEvents: function() {
      var self = this;

      // bind events
      this.onResize = function() {
        if (!self.isInit) return;
        self.resetState();
        self.recalculateOffsets();
        self.checkStickyPermission();
        self.scrollHandler();
      };

      this.onScroll = function() {
        self.scrollHandler();
      };

      // initial handler call
      this.onResize();

      // handle events
      $win.on('load resize orientationchange', this.onResize)
          .on('scroll', this.onScroll);
    },

    defineExtraTop: function() {
      // define box's extra top dimension
      var extraTop;

      if (typeof this.options.extraTop === 'number') {
        extraTop = this.options.extraTop;
      } else if (typeof this.options.extraTop === 'function') {
        extraTop = this.options.extraTop();
      }

      this.extraTop = this.options.positionType === 'absolute' ?
          extraTop :
          Math.min(this.winParams.height - this.data.boxFullHeight, extraTop);
    },

    checkStickyPermission: function() {
      // check the permission to set sticky
      this.isStickyEnabled = this.moveInContainer ?
          this.data.containerOffsetTop + this.data.containerHeight > this.data.boxFullHeight + this.data.boxOffsetTop + this.options.extraBottom :
          true;
    },

    getParentForActive: function() {
      if (this.isWrap) {
        return this.$stickyBoxWrap;
      }

      if (this.$container.length) {
        return this.$container;
      }

      return this.$stickyBox;
    },

    getWrapClass: function() {
      // get set of container classes
      try {
        return this.$stickyBox.attr('class').split(' ').map(function(name) {
          return 'sticky-wrap-' + name;
        }).join(' ');
      } catch (err) {
        return 'sticky-wrap';
      }
    },

    resetState: function() {
      // reset dimensions and state
      this.stickyFlag = false;
      this.$stickyBox.css({
        '-webkit-transition': '',
        '-webkit-transform': '',
        transition: '',
        transform: '',
        position: '',
        width: '',
        left: '',
        top: ''
      }).removeClass(this.options.activeClass);

      if (this.isWrap) {
        this.$stickyBoxWrap.removeClass(this.options.activeClass).removeAttr('style');
      }

      if (this.moveInContainer) {
        this.$container.removeClass(this.options.activeClass);
      }
    },

    recalculateOffsets: function() {
      // define box and container dimensions
      this.winParams = this.getWindowParams();

      this.data = $.extend(
          this.getBoxOffsets(),
          this.getContainerOffsets()
      );

      this.defineExtraTop();
    },

    getBoxOffsets: function() {
      function offetTop(obj){
        obj.top = 0;
        return obj
      }
      var boxOffset = this.$stickyBox.css('position') ==='fixed' ? offetTop(this.$stickyBox.offset()) : this.$stickyBox.offset();
      var boxPosition = this.$stickyBox.position();

      return {
        // sticky box offsets
        boxOffsetLeft: boxOffset.left,
        boxOffsetTop: boxOffset.top,
        // sticky box positions
        boxTopPosition: boxPosition.top,
        boxLeftPosition: boxPosition.left,
        // sticky box width/height
        boxFullHeight: this.$stickyBox.outerHeight(true),
        boxHeight: this.$stickyBox.outerHeight(),
        boxWidth: this.$stickyBox.outerWidth()
      };
    },

    getContainerOffsets: function() {
      var containerOffset = this.moveInContainer ? this.$container.offset() : null;

      return containerOffset ? {
        // container offsets
        containerOffsetLeft: containerOffset.left,
        containerOffsetTop: containerOffset.top,
        // container height
        containerHeight: this.$container.outerHeight()
      } : {};
    },

    getWindowParams: function() {
      return {
        height: window.innerHeight || document.documentElement.clientHeight
      };
    },

    makeCallback: function(name) {
      if (typeof this.options[name] === 'function') {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },

    destroy: function() {
      this.isInit = false;
      // remove event handlers and styles
      $win.off('load resize orientationchange', this.onResize)
          .off('scroll', this.onScroll);
      this.resetState();
      this.$stickyBox.removeData('StickyScrollBlock');
      if (this.isWrap) {
        this.$stickyBox.unwrap();
      }
      this.makeCallback('onDestroy');
    }
  };

  var stickyMethods = {
    fixed: {
      scrollHandler: function() {
        this.winScrollTop = $win.scrollTop();
        var isActiveSticky = this.winScrollTop -
            (this.options.showAfterScrolled ? this.extraTop : 0) -
            (this.options.showAfterScrolled ? this.data.boxHeight + this.extraTop : 0) >
            this.data.boxOffsetTop - this.extraTop;

        if (isActiveSticky) {
          this.isStickyEnabled && this.stickyOn();
        } else {
          this.stickyOff();
        }
      },

      stickyOn: function() {
        if (!this.stickyFlag) {
          this.stickyFlag = true;
          this.parentForActive.addClass(this.options.activeClass);
          this.$stickyBox.css({
            width: this.data.boxWidth,
            position: this.options.positionType
          });
          if (this.isWrap) {
            this.$stickyBoxWrap.css({
              height: this.data.boxFullHeight
            });
          }
          this.makeCallback('fixedOn');
        }
        this.setDynamicPosition();
      },

      stickyOff: function() {
        if (this.stickyFlag) {
          this.stickyFlag = false;
          this.resetState();
          this.makeCallback('fixedOff');
        }
      },

      setDynamicPosition: function() {
        this.$stickyBox.css({
          top: this.getTopPosition(),
          left: this.data.boxOffsetLeft - $win.scrollLeft()
        });
      },

      getTopPosition: function() {
        if (this.moveInContainer) {
          var currScrollTop = this.winScrollTop + this.data.boxHeight + this.options.extraBottom;

          return Math.min(this.extraTop, (this.data.containerHeight + this.data.containerOffsetTop) - currScrollTop);
        } else {
          return this.extraTop;
        }
      }
    },
    absolute: {
      scrollHandler: function() {
        this.winScrollTop = $win.scrollTop();
        var isActiveSticky = this.winScrollTop > this.data.boxOffsetTop - this.extraTop;

        if (isActiveSticky) {
          this.isStickyEnabled && this.stickyOn();
        } else {
          this.stickyOff();
        }
      },

      stickyOn: function() {
        if (!this.stickyFlag) {
          this.stickyFlag = true;
          this.parentForActive.addClass(this.options.activeClass);
          this.$stickyBox.css({
            width: this.data.boxWidth,
            transition: 'transform ' + this.options.animSpeed + 's ease',
            '-webkit-transition': 'transform ' + this.options.animSpeed + 's ease',
          });

          if (this.isWrap) {
            this.$stickyBoxWrap.css({
              height: this.data.boxFullHeight
            });
          }

          this.makeCallback('fixedOn');
        }

        this.clearTimer();
        this.timer = setTimeout(function() {
          this.setDynamicPosition();
        }.bind(this), this.options.animDelay * 1000);
      },

      stickyOff: function() {
        if (this.stickyFlag) {
          this.clearTimer();
          this.stickyFlag = false;

          this.timer = setTimeout(function() {
            this.setDynamicPosition();
            setTimeout(function() {
              this.resetState();
            }.bind(this), this.options.animSpeed * 1000);
          }.bind(this), this.options.animDelay * 1000);
          this.makeCallback('fixedOff');
        }
      },

      clearTimer: function() {
        clearTimeout(this.timer);
      },

      setDynamicPosition: function() {
        var topPosition = Math.max(0, this.getTopPosition());

        this.$stickyBox.css({
          transform: 'translateY(' + topPosition + 'px)',
          '-webkit-transform': 'translateY(' + topPosition + 'px)'
        });
      },

      getTopPosition: function() {
        var currTopPosition = this.winScrollTop - this.data.boxOffsetTop + this.extraTop;

        if (this.moveInContainer) {
          var currScrollTop = this.winScrollTop + this.data.boxHeight + this.options.extraBottom;
          var diffOffset = Math.abs(Math.min(0, (this.data.containerHeight + this.data.containerOffsetTop) - currScrollTop - this.extraTop));

          return currTopPosition - diffOffset;
        } else {
          return currTopPosition;
        }
      }
    }
  };

  // jQuery plugin interface
  $.fn.stickyScrollBlock = function(opt) {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];

    var options = $.extend({
      container: null,
      positionType: 'fixed', // 'fixed' or 'absolute'
      activeClass: 'fixed-position',
      setBoxHeight: true,
      showAfterScrolled: false,
      extraTop: 0,
      extraBottom: 0,
      animDelay: 0.1,
      animSpeed: 0.2
    }, opt);

    return this.each(function() {
      var $stickyBox = jQuery(this);
      var instance = $stickyBox.data('StickyScrollBlock');

      if (typeof opt === 'object' || typeof opt === 'undefined') {
        StickyScrollBlock.prototype = $.extend(stickyMethods[options.positionType], StickyScrollBlockPrototype);
        $stickyBox.data('StickyScrollBlock', new StickyScrollBlock($stickyBox, options));
      } else if (typeof method === 'string' && instance) {
        if (typeof instance[method] === 'function') {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };

  // module exports
  window.StickyScrollBlock = StickyScrollBlock;
}(jQuery, jQuery(window)));

/*
 * Simple Mobile Navigation
 */
;(function($) {
  function MobileNav(options) {
    this.options = $.extend({
      container: null,
      hideOnClickOutside: false,
      menuActiveClass: 'nav-active',
      menuOpener: '.nav-opener',
      menuDrop: '.nav-drop',
      toggleEvent: 'click',
      outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
    }, options);
    this.initStructure();
    this.attachEvents();
  }
  MobileNav.prototype = {
    initStructure: function() {
      this.page = $('html');
      this.container = $(this.options.container);
      this.opener = this.container.find(this.options.menuOpener);
      this.drop = this.container.find(this.options.menuDrop);
    },
    attachEvents: function() {
      var self = this;

      if(activateResizeHandler) {
        activateResizeHandler();
        activateResizeHandler = null;
      }

      this.outsideClickHandler = function(e) {
        if(self.isOpened()) {
          var target = $(e.target);
          if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
            self.hide();
          }
        }
      };

      this.openerClickHandler = function(e) {
        e.preventDefault();
        self.toggle();
      };

      this.opener.on(this.options.toggleEvent, this.openerClickHandler);
    },
    isOpened: function() {
      return this.container.hasClass(this.options.menuActiveClass);
    },
    show: function() {
      this.container.addClass(this.options.menuActiveClass);
      if(this.options.hideOnClickOutside) {
        this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    hide: function() {
      this.container.removeClass(this.options.menuActiveClass);
      if(this.options.hideOnClickOutside) {
        this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    toggle: function() {
      if(this.isOpened()) {
        this.hide();
      } else {
        this.show();
      }
    },
    destroy: function() {
      this.container.removeClass(this.options.menuActiveClass);
      this.opener.off(this.options.toggleEvent, this.clickHandler);
      this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
    }
  };

  var activateResizeHandler = function() {
    var win = $(window),
        doc = $('html'),
        resizeClass = 'resize-active',
        flag, timer;
    var removeClassHandler = function() {
      flag = false;
      doc.removeClass(resizeClass);
    };
    var resizeHandler = function() {
      if(!flag) {
        flag = true;
        doc.addClass(resizeClass);
      }
      clearTimeout(timer);
      timer = setTimeout(removeClassHandler, 500);
    };
    win.on('resize orientationchange', resizeHandler);
  };

  $.fn.mobileNav = function(opt) {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];

    return this.each(function() {
      var $container = jQuery(this);
      var instance = $container.data('MobileNav');

      if (typeof opt === 'object' || typeof opt === 'undefined') {
        $container.data('MobileNav', new MobileNav($.extend({
          container: this
        }, opt)));
      } else if (typeof method === 'string' && instance) {
        if (typeof instance[method] === 'function') {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };
}(jQuery));

//document.addEventListener("touchstart", function(){}, true);






