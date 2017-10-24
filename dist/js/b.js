'use strict';

$(function () {
	var $navbar = $('.navbar');
	$(window).on('scroll', function () {
		if ($(this).scrollTop() >= $(this).height() - 70) {
			$navbar.css('backgroundColor', 'rgba(244, 244, 244, 1)');
		} else {
			$navbar.css('backgroundColor', 'rgba(244, 244, 244, 0.2)');
		}
	});

	$('body').scrollspy({
		target: '#scrollspy'
	});
	$('[data-spy="scroll"]').each(function () {
		var $spy = $(this).scrollspy('refresh');
	});
});
'use strict';

$(function () {
    var img1 = ['product1.png', 'product2.png', 'product3.png', 'product4.png'];
    var img2 = ['product11.png', 'product12.png', 'product13.png', 'product14.png'];
    var $selector = $('.m-product > .container > .js-selector > div').children('.js-setBgColor');
    var imgs = $selector.find('img');
    for (var i = 0; i < $selector.length; i++) {
        $selector.get()[i].index = i;
        $selector.eq(i).mouseover(function () {
            for (var i = 0; i < $selector.length; i++) {
                $selector.eq(i).removeClass('active');
                imgs.eq(i).attr('src', '../img/' + img2[i]);
            }
            $(this).addClass('active');
            $(this).find('img').attr('src', '../img/' + img1[this.index]);
        });
    }
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body = $(document.body);
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector = (this.options.target || '') + ' .nav li > a';
    this.offsets = [];
    this.targets = [];
    this.activeTarget = null;
    this.scrollHeight = 0;

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this));
    this.refresh();
    this.process();
  }

  ScrollSpy.VERSION = '3.3.7';

  ScrollSpy.DEFAULTS = {
    offset: 10
  };

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  };

  ScrollSpy.prototype.refresh = function () {
    var that = this;
    var offsetMethod = 'offset';
    var offsetBase = 0;

    this.offsets = [];
    this.targets = [];
    this.scrollHeight = this.getScrollHeight();

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position';
      offsetBase = this.$scrollElement.scrollTop();
    }

    this.$body.find(this.selector).map(function () {
      var $el = $(this);
      var href = $el.data('target') || $el.attr('href');
      var $href = /^#./.test(href) && $(href);

      return $href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]] || null;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).each(function () {
      that.offsets.push(this[0]);
      that.targets.push(this[1]);
    });
  };

  ScrollSpy.prototype.process = function () {
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight = this.getScrollHeight();
    var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
    var offsets = this.offsets;
    var targets = this.targets;
    var activeTarget = this.activeTarget;
    var i;

    if (this.scrollHeight != scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null;
      return this.clear();
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
    }
  };

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target;

    this.clear();

    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';

    var active = $(selector).parents('li').addClass('active');

    if (active.parent('.dropdown-menu').length) {
      active = active.closest('li.dropdown').addClass('active');
    }

    active.trigger('activate.bs.scrollspy');
  };

  ScrollSpy.prototype.clear = function () {
    $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
  };

  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.scrollspy');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data) $this.data('bs.scrollspy', data = new ScrollSpy(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.scrollspy;

  $.fn.scrollspy = Plugin;
  $.fn.scrollspy.Constructor = ScrollSpy;

  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old;
    return this;
  };

  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this);
      Plugin.call($spy, $spy.data());
    });
  });
}(jQuery);
// $(function () {
//     // JS
//     var video = document.querySelector('video'),
//         container = document.querySelector('#m-video');

//     function getOS() {
//         var ua = window.navigator.userAgent.toLowerCase(),
//             iPhone = /iphone/i.test(ua) ? true : false,
//             android = /android/i.test(ua) ? true : false;

//         return {
//             android: android,
//             iPhone: iPhone
//         };
//     }

//     if (getOS().android) {
//         //alert('android');
//     } else if (getOS().iPhone) {
//         //alert('android');
//     } else {
//         video.src = 'https://daqianduan_16.coding.me/Hello-world/1.mp4';

//     }
//     var setVideoDimensions = function () {
//         var w = video.videoWidth,
//             h = video.videoHeight;

//         var videoRatio = (w / h).toFixed(2);

//         var containerStyles = window.getComputedStyle(container),
//             minW = parseInt(containerStyles.getPropertyValue('width')),
//             minH = parseInt(containerStyles.getPropertyValue('height'));

//         var widthRatio = minW / w,
//             heightRatio = minH / h;

//         if (widthRatio > heightRatio) {
//             var newWidth = minW;
//             var newHeight = Math.ceil(newWidth / videoRatio);
//         } else {
//             var newHeight = minH;
//             var newWidth = Math.ceil(newHeight * videoRatio);
//         }

//         video.style.width = newWidth + 'px';
//         video.style.height = newHeight + 'px';
//     }
//     video.addEventListener('loadedmetadata', setVideoDimensions, false);
//     window.addEventListener('resize', setVideoDimensions, false);
//     video.addEventListener('canplay', function () {
//         document.getElementById('video_cover').style.display = 'none';
//     })
// })
"use strict";