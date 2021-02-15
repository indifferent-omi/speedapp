/*
 * This file is part of the Speedwapp package.
 *
 * (c) Akambi Fagbohoun <contact@akambi-fagbohoun.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */


//    'use strict';
function sliderToolbar() {
    //caching
    //the main wrapper of the gallery
    this.$fp_gallery = $('#fp_gallery')
    //the main container for the thumbs structure
    this.$fp_thumbContainer = $('#fp_thumbContainer');
    //wrapper of jquery ui slider
    
    this.$fp_scrollWrapper = $('#fp_scrollWrapper');
    //total number of images
    this.nmb_images = 0;
    //which gallery is clicked (index)
    this.gallery_idx = -1;
    //scroller wrapper
    this.$fp_thumbScroller = $('#fp_thumbScroller');
    //jquery ui slider
    this.$slider = $('#slider');
    //jquery ui slider
    this.slider_is_open = false;

    this.max_slider = null;
    //the links of the galleries (the cities)
//    this.$fp_galleries = $('#fp_galleryList > li');
//    this.$fp_galleries = $('nav.gn-menu-wrapper > div > ul > li');
    this.$selector_container = $('nav.gn-menu-wrapper > div > ul');

//this.current image being viewed
    this.current = 0;

    //some control flags:
    //prevent fast clicks on next and previous
    this.photo_nav = true;
    
    this.navListItems = $('.toolbar-menu li');
 
    this.init();
}

sliderToolbar.prototype = {
    init: function() {
		
        var self = this;
        //User clicks on a city / gallery;
        this.$selector_container.on('click', 'li', function(e) {
            e.stopPropagation();
            self.$selector_container.find('li').removeClass('current');
            var $gallery = $(this);
            var gallery_index = self.$selector_container.find('li').index($gallery);
            self.$fp_gallery.show();
            if (self.gallery_idx == gallery_index) {
                if (self.$fp_thumbContainer.data('opened') == true) {
                    self.$fp_scrollWrapper.fadeOut();
                    self.$fp_thumbContainer.stop()
                            .animate({'width': '0px'}, 200, function() {
                                self.closeGallery();
                            });
                } else {
                    if (self.$fp_thumbContainer.data('opened') == true) {
                        self.closeGallery();
                    } else {
                        $gallery.addClass('current');
                        self.openGallery();
                    }
                }
                return;
            }
            
            $gallery.addClass('current');
            self.gallery_idx = gallery_index;
            //close the gallery and slider if opened
            if (self.$fp_thumbContainer.data('opened') == true) {
                self.$fp_scrollWrapper.fadeOut();
                self.$fp_thumbContainer.stop()
                        .animate({'width': '0px'}, 200, function() {
                            self.openGallery();
                        });
            } else {
                self.openGallery();
            }
        });

        //while the gallery scrolls we want that the slider scrolls as well
        this.$fp_thumbScroller.scroll(function() {
            self.$slider.slider('value', self.max_slider - parseInt(self.$fp_thumbScroller.scrollTop(), 10));
        });

        //User clicks next button (thumbs)
        $('#fp_next_thumb').click(function() {
            self.slideThumb(1);
        });

        //User clicks previous button (thumbs)
        $('#fp_prev_thumb').click(function() {
            self.slideThumb(0);
        });
    },
    
    //opens a gallery after cliking on a toolbar icon
    openGallery: function () {
        var self = this;
        
        //this.current gets reseted
        this.current = 0;
        //wrapper of each content div, where each image is
        var $fp_content_wrapper = this.$fp_thumbContainer.find('.container:nth-child(' + parseInt(this.gallery_idx + 1) + ')');
        //hide all the other galleries thumbs wrappers
        this.$fp_thumbScroller.find('.container').not($fp_content_wrapper).hide();
        //and show this one
        $fp_content_wrapper.show();
        //total number of images
        this.nmb_images = $fp_content_wrapper.children('div').length;
        //calculate height,
        //padding top 
        //and padding bottom for content wrapper
        var h_height = 0;
        var padding_t = 0;
        var padding_b = 0;
        //center of screen
        var center = this.$fp_gallery.height() / 2;
        console.log(center);
        var one_divs_h = 0;
        /*
         Note:
         the padding top is the center minus half of the height of the first content div
         the padding bottom is the center minus half of the height of the last content div
         */
        $fp_content_wrapper.children('div').each(function(i) {
            var $div = $(this);
            var div_height = $div.height();
            if ((i & 1) === 1) {
                h_height += div_height;
            }
            //if first one, lets calculate the padding left
            if (i === 0) {
                padding_t = ((self.$fp_gallery.height() - self.$fp_scrollWrapper.height) / 2);
            }
            //if last one, lets calculate the padding right
            if (i == (self.nmb_images - 1)) {
                padding_b = center - (div_height / 2);
                one_divs_h = div_height;
            }
        }).end().css({
//            'height': h_height + 'px',
            'width': '232px',
//            'padding-top': padding_t + 'px',
            //'padding-bottom': padding_b + 'px'
            'padding': 0
        });

        console.log(h_height);
        this.$fp_scrollWrapper.css({
            'margin-top': padding_t + 'px',
        });
        //scroll all Top;
//        this.$fp_thumbScroller.scrollTop(h_height);

        //innitialize the slider

        //open the gallery and show the slider
        this.$fp_gallery.show();
        $fp_content_wrapper.nanoScroller({ sliderMaxHeight: 100, alwaysVisible: true });
        this.$fp_thumbContainer.animate({'width': '232px'}, 200, function() {
            $(this).data('opened', true);
            self.$fp_scrollWrapper.fadeIn();
            //new add
            $(this).find('#seachboxcpnt').show();
            
        });
        //scroll all bottom;
        this.$fp_thumbScroller.stop()
                .animate({'scrollTop': '0px'}, 2000, 'easeInOutExpo');

        //User clicks on a content div (image)
        $fp_content_wrapper.find('.content')
                .bind('click', function(e) {
                    var $current = $(this);
                    console.log('content');
                    //track the this.current one
                    self.current = $current.index();
                    //center and show this image
                    //the second parameter set to true means we want to 
                    //display the picture after the image is centered on the screen
//                    centerImage($current, true, 600);
                });

        $(document)
            .on('click', function(e) {
                if ((typeof e !== 'undefined')
                        && 
                        (
                            ($(e.target).parents('div#fp_gallery').length === 1)
                            || ($(e.target).parents('nav#toolbtnicon').length === 1)
                            || ($(e.target).parents('div.animation-tooltip').length === 1)
                        )
                    )
                {
                    return true;
                }
                self.closeAllGallery();
            });

    },

        // close a gallery after cliking on a toolbar icon
    closeGallery: function () {
        this.$fp_thumbContainer.data('opened', false);
        this.$fp_gallery.hide();
        this.$fp_thumbContainer.find('#seachboxcpnt').hide();
        this.gallery_idx = -1;
        this.$selector_container.find('li').removeClass('current');
    },

    closeAllGallery: function()
    {
        var self = this;
        if (this.$fp_thumbContainer.data('opened') == true) {
            this.$fp_scrollWrapper.fadeOut();
            this.$fp_thumbContainer.stop()
                    .animate({'width': '0px'}, 200, function() {
                        self.closeGallery();
                    });
        }
        this.$fp_thumbContainer.data('opened', false);
        this.$fp_gallery.hide();
        this.gallery_idx = -1;
    }
}

