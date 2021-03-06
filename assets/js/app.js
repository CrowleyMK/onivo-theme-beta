// ;(function($, window, document, undefined){
//
//     // our plugin constructor
//     var OnePageNav = function(elem, options){
//         this.elem = elem;
//         this.$elem = $(elem);
//         this.options = options;
//         this.metadata = this.$elem.data('plugin-options');
//         this.$win = $(window);
//         this.sections = {};
//         this.didScroll = false;
//         this.$doc = $(document);
//         this.docHeight = this.$doc.height();
//     };
//
//     // the plugin prototype
//     OnePageNav.prototype = {
//         defaults: {
//             navItems: 'a',
//             currentClass: 'active',
//             changeHash: false,
//             easing: 'swing',
//             filter: '',
//             scrollSpeed: 500,
//             scrollThreshold: 0.5,
//             begin: false,
//             end: false,
//             scrollChange: false
//         },
//
//         init: function() {
//             // Introduce defaults that can be extended either
//             // globally or using an object literal.
//             this.config = $.extend({}, this.defaults, this.options, this.metadata);
//
//             this.$nav = this.$elem.find(this.config.navItems);
//
//             //Filter any links out of the nav
//             if(this.config.filter !== '') {
//                 this.$nav = this.$nav.filter(this.config.filter);
//             }
//
//             //Handle clicks on the nav
//             this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));
//
//             //Get the section positions
//             this.getPositions();
//
//             //Handle scroll changes
//             this.bindInterval();
//
//             //Update the positions on resize too
//             this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));
//
//             return this;
//         },
//
//         adjustNav: function(self, $parent) {
//             self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
//             $parent.addClass(self.config.currentClass);
//         },
//
//         bindInterval: function() {
//             var self = this;
//             var docHeight;
//
//             self.$win.on('scroll.onePageNav', function() {
//                 self.didScroll = true;
//             });
//
//             self.t = setInterval(function() {
//                 docHeight = self.$doc.height();
//
//                 //If it was scrolled
//                 if(self.didScroll) {
//                     self.didScroll = false;
//                     self.scrollChange();
//                 }
//
//                 //If the document height changes
//                 if(docHeight !== self.docHeight) {
//                     self.docHeight = docHeight;
//                     self.getPositions();
//                 }
//             }, 250);
//         },
//
//         getHash: function($link) {
//             return $link.attr('href').split('#')[1];
//         },
//
//         getPositions: function() {
//             var self = this;
//             var linkHref;
//             var topPos;
//             var $target;
//
//             self.$nav.each(function() {
//                 linkHref = self.getHash($(this));
//                 $target = $('#' + linkHref);
//
//                 if($target.length) {
//                     topPos = $target.offset().top;
//                     self.sections[linkHref] = Math.round(topPos);
//                 }
//             });
//         },
//
//         getSection: function(windowPos) {
//             var returnValue = null;
//             var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);
//
//             for(var section in this.sections) {
//                 if((this.sections[section] - windowHeight) < windowPos) {
//                     returnValue = section;
//                 }
//             }
//
//             return returnValue;
//         },
//
//         handleClick: function(e) {
//             var self = this;
//             var $link = $(e.currentTarget);
//             var $parent = $link.parent();
//             var newLoc = '#' + self.getHash($link);
//
//             if(!$parent.hasClass(self.config.currentClass)) {
//                 //Start callback
//                 if(self.config.begin) {
//                     self.config.begin();
//                 }
//
//                 //Change the highlighted nav item
//                 self.adjustNav(self, $parent);
//
//                 //Removing the auto-adjust on scroll
//                 self.unbindInterval();
//
//                 //Scroll to the correct position
//                 self.scrollTo(newLoc, function() {
//                     //Do we need to change the hash?
//                     if(self.config.changeHash) {
//                         window.location.hash = newLoc;
//                     }
//
//                     //Add the auto-adjust on scroll back in
//                     self.bindInterval();
//
//                     //End callback
//                     if(self.config.end) {
//                         self.config.end();
//                     }
//                 });
//             }
//
//             e.preventDefault();
//         },
//
//         scrollChange: function() {
//             var windowTop = this.$win.scrollTop();
//             var position = this.getSection(windowTop);
//             var $parent;
//
//             //If the position is set
//             if(position !== null) {
//                 $parent = this.$elem.find('a[href$="#' + position + '"]').parent();
//
//                 //If it's not already the current section
//                 if(!$parent.hasClass(this.config.currentClass)) {
//                     //Change the highlighted nav item
//                     this.adjustNav(this, $parent);
//
//                     //If there is a scrollChange callback
//                     if(this.config.scrollChange) {
//                         this.config.scrollChange($parent);
//                     }
//                 }
//             }
//         },
//
//         scrollTo: function(target, callback) {
//             var offset = $(target).offset().top;
//
//             $('html, body').animate({
//                 scrollTop: offset
//             }, this.config.scrollSpeed, this.config.easing, callback);
//         },
//
//         unbindInterval: function() {
//             clearInterval(this.t);
//             this.$win.unbind('scroll.onePageNav');
//         }
//     };
//
//     OnePageNav.defaults = OnePageNav.prototype.defaults;
//
//     $.fn.onePageNav = function(options) {
//         return this.each(function() {
//             new OnePageNav(this, options).init();
//         });
//     };
//
// })( jQuery, window , document );
var isTouch = window.DocumentTouch && document instanceof DocumentTouch;

function scrollHeader() {
    // Has scrolled class on header
    if ($(document).scrollTop() > 80) {
        $("nav").addClass("scrolled");
        $("#divider").removeClass("dividerVertical").addClass("dividerVertical60");
    } else {
        $("nav").removeClass("scrolled");
        $("#divider").removeClass("dividerVertical60").addClass("dividerVertical");
    }
}

function showPricesForInterval (interval) {

    var classicUnitPrice = 699,
        premiumUnitPrice = 1499;

    if(interval) {
        if(interval == 3) {
            $('.interval').html(interval + ' meseca');
        } else {
            $('.interval').html(interval + ' meseci');
        }
        $('#classicPrice').html(classicUnitPrice * interval);
        $('#premiumPrice').html(premiumUnitPrice * interval);
        // $('#classicOldPrice').html(classicOldUnitPrice * interval);
        // $('#premiumOldPrice').html(premiumOldUnitPrice * interval);
    } else {
        $('.interval').html('mesečno');
        $('#classicPrice').html(classicUnitPrice);
        $('#premiumPrice').html(premiumUnitPrice);
        // $('#classicOldPrice').html(classicOldUnitPrice);
        // $('#premiumOldPrice').html(premiumOldUnitPrice);
    }

    if(interval == 3 || interval == '') {
        $('.interval6').addClass('hidden');
        $('.interval12').addClass('hidden');
        $('#promoOfferHelp').addClass('hidden');
    }

    if(interval == 6) {
        $('.interval12').addClass('hidden');
        $('.interval6').removeClass('hidden');
        $('#promoOfferHelp').removeClass('hidden');
    }
    if(interval == 12) {
        $('.interval6').addClass('hidden');
        $('.interval12').removeClass('hidden');
        $('#promoOfferHelp').removeClass('hidden');
    }
}

jQuery(document).ready(function($){

    // ON SCROLL EVENTS
    if (!isTouch){
        $(document).scroll(function() {
            scrollHeader();
        });
    };

    // TOUCH SCROLL
    $(document).on({
        'touchmove': function(e) {
            scrollHeader();
        }
    });

    //Smooth scroll to top
    $('#toTop').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });

    //Activate One Page scroll to navigation
    //$('#navigation').onePageNav();

    $('#interval').on('change',function(){
        var Me = $(this);
        showPricesForInterval(Me.val());
    });
});
