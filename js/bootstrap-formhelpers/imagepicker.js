/* ==========================================================
 * bootstrap-formhelpers-imagepicker.js
 * ==========================================================
 * Copyright 2014 Akambi Fagbohoun
 *
 * ========================================================== */


+function ($) {

    'use strict';


    /* IMAGEPICKER CLASS DEFINITION
     * ========================= */

    var toggle = '[data-toggle=bfh-imagepicker]',
            BFHImagePicker = function (element, options) {
                this.options = $.extend({}, $.fn.bfhimagepicker.defaults, options);
                this.$element = $(element);

                this.initPopover();
            };

    BFHImagePicker.prototype = {
        constructor: BFHImagePicker,
        patternSelected: function (self, imagepicker, oldImage, newImage) {
            if (self.options.close === true) {
                console.log(666);
                clearMenus();
            }
            if (newImage !== self.$element.val()) {
                self.$element.val('url(' + newImage + ')');
                self.$element.trigger('change.bfhimagepicker');
            }
        },
        initPalette: function (page) {

            var patternThumbList, thumbListPagination, self = this;

            patternThumbList = this.$element.find('select');
            thumbListPagination = this.$element.find('nav');

            var baseUrl = Routing.generate('get_patterns');
            var target = baseUrl;
            if (page > 1) {
                target += '?page=' + page;
            }
            if (patternThumbList.data('template') == target) {
                return;
            }
            patternThumbList.data('template', target);
            if (jXhr && jXhr.readystate != 4) {
                jXhr.abort();
            }
            var jXhr = $.ajax({
                url: window.app_domain+patternThumbList.data('template'),
                type: "GET",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true,
                },
                context: patternThumbList,
                success: function (response, status, xhr) {
                    var options = '<option value=""></option>';
                    for (var i = 0, l = response.patterns.length; i < l; i++) {
                        var pattern = response.patterns[i];
                        options += '<option  data-img-label="' + pattern.title + '" data-img-src="' + pattern.image + '" value="' + pattern.image + '">' + pattern.title + '</option>';
                    }

                    $(this).html(options);
                    $(this).removeClass('loaderCollection');
                    $(this).imagepicker({
                        show_label: true,
                        changed: function (oldImage, newImage) {
                            BFHImagePicker.prototype.patternSelected(self, this, oldImage, newImage);
                        }
                    });

                    var page = parseInt(response.pagination.page);
                    var pages_count = parseInt(response.pagination.pages_count);
                    var pagination = '<ul class="pagination">';
                    if (page > 1) {
                        pagination += '<li><a data-page="1" href="' + baseUrl + '?page=1"><<</a></li>' +
                                '<li><a data-page="' + (page - 1) + '" href="' + baseUrl + '?page=' + (page - 1) + '"><</a></li>';
                    }

                    var current;
                    var min = Math.max(page - 3, 1);
                    var max = Math.min(page + 3, pages_count);
                    // display p numbers only from p-3 to p+3 but don't go <1 or >pages_count#}
                    for (var p = min; p <= max; p++) {
                        if (p === page) {
                            current = ' class="active"';
                        } else {
                            current = '';
                        }
                        pagination += '<li' + current + '><a data-page="' + p + '" href="' + baseUrl + '?page=' + p + '">' + p + '</a></li>';
                    }

                    if (page < pages_count) {
                        pagination += '<li><a data-page="' + (page + 1) + '" href="' + baseUrl + '?page=' + (page + 1) + '">></a></li>' +
                                '<li><a data-page="' + pages_count + '" href="' + baseUrl + '?page=' + pages_count + '">>></a></li>';
                    }
                    pagination += '</ul>';

                    thumbListPagination.html(pagination);
                    self.$element.find('ul.pagination li a')
                            .on('click touchstart', self, BFHImagePicker.prototype.goToPage);
                },
                error: function () {
                    // initSubFamilySidebar();
                    $(this).removeClass('loaderCollection');
                    // showErrorMsgBox();
                }
            });
        },
        goToPage: function (e) {
            e.preventDefault();
            var self = e.data;
            var page = $(e.target).data('page');
            self.initPalette(page);
        },
        initPopover: function () {
            var iconLeft,
                    iconRight;

            iconLeft = '';
            iconRight = '';
            if (this.options.align === 'right') {
                iconRight = '<span class="input-group-addon"><span class="bfh-imagepicker-icon"></span></span>';
            } else {
                iconLeft = '<span class="input-group-addon"><span class="bfh-imagepicker-icon"></span></span>';
            }

            this.$element.html(
                    '<div class="input-group bfh-imagepicker-toggle" data-toggle="bfh-imagepicker">' +
//                    iconLeft +
                    '<div name="' + this.options.name + '" class="' + this.options.input + '">' +
                    '<div class="image_picker_image patternthumbnail picker" style=""></div>' +
                    '</div>' +
//                    iconRight +
                    '</div>' +
                    '<div class="bfh-colorpicker-popover">' +
                    '<div><button class="">Choose file</button></div>' +
                    '<div class="bfh-colorpicker-palette bfh-imagepicker-palette">' +
                    '<select class="image-picker">' +
                    '</select>' +
                    '<nav>' +
                    '</nav>' +
                    '</div>' +
                    '</div>'
                    );

            this.$element
                    .on('click.bfhimagepicker.data-api touchstart.bfhimagepicker.data-api', toggle, BFHImagePicker.prototype.toggle)
                    .on('click.bfhimagepicker.data-api touchstart.bfhimagepicker.data-api', '.bfh-imagepicker-popover', function () {
                        return false;
                    })
                    .on('change', '.bfh-imagepicker-popover', function () {
                        return false;
                    });

            this.initPalette();

            this.$element.val(this.options.pattern);
        },
        toggle: function (e) {
            var $this,
                    $parent,
                    isActive;

            $this = $(this);
            $parent = getParent($this);

            if ($parent.is('.disabled') || $parent.attr('disabled') !== undefined) {
                return true;
            }

            isActive = $parent.hasClass('open');

            clearMenus();

            if (!isActive) {
                $parent.trigger(e = $.Event('show.bfhimagepicker'));

                if (e.isDefaultPrevented()) {
                    return true;
                }

                $parent
                        .toggleClass('open')
                        .trigger('shown.bfhimagepicker');

                $this.focus();
            }

            return false;
        }
    };

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function clearMenus(e) {
        var $parent;
        if ((typeof e !== 'undefined')
                && (
                ($(e.target).parent('div.bfh-imagepicker').length === 1)
                || ($(e.target).parents('nav').length === 1)
                ))
        {
            return true;
        }

        $(toggle).each(function (e) {
            $parent = getParent($(this));

            if (!$parent.hasClass('open')) {
                return true;
            }

            $parent.trigger(e = $.Event('hide.bfhimagepicker'));

            if (e.isDefaultPrevented()) {
                return true;
            }

            $parent
                    .removeClass('open')
                    .trigger('hidden.bfhimagepicker');
        });
    }

    function getParent($this) {
        return $this.closest('.bfh-imagepicker');
    }


    /* IMAGEPICKER PLUGIN DEFINITION
     * ========================== */

    var old = $.fn.bfhimagepicker;

    $.fn.bfhimagepicker = function (option) {
        return this.each(function () {
            var $this,
                    data,
                    options;

            $this = $(this);
            data = $this.data('bfhimagepicker');
            options = typeof option === 'object' && option;
            this.type = 'bfhimagepicker';

            if (!data) {
                $this.data('bfhimagepicker', (data = new BFHImagePicker(this, options)));
            }
            if (typeof option === 'string') {
                data[option].call($this);
            }
        });
    };

    $.fn.bfhimagepicker.Constructor = BFHImagePicker;

    $.fn.bfhimagepicker.defaults = {
        align: 'right',
        input: 'form-control',
        placeholder: '',
        name: '',
        pattern: '',
        close: true
    };


    /* IMAGEPICKER NO CONFLICT
     * ========================== */

    $.fn.bfhimagepicker.noConflict = function () {
        $.fn.bfhimagepicker = old;
        return this;
    };


    /* IMAGEPICKER VALHOOKS
     * ========================== */

    var origHook;
    if ($.valHooks.div) {
        origHook = $.valHooks.div;
    }
    $.valHooks.div = {
        get: function (el) {
            if ($(el).hasClass('bfh-imagepicker')) {
                return $(el).find('div.picker').css('background-image');
            } else if (origHook) {
                return origHook.get(el);
            }
        },
        set: function (el, val) {
            if ($(el).hasClass('bfh-imagepicker')) {
//                $(el).find('.bfh-imagepicker-icon').css('background-image', val);
                $(el).find('div.picker').css('background-image', val);
            } else if (origHook) {
                return origHook.set(el, val);
            }
        }
    };


    /* IMAGEPICKER DATA-API
     * ============== */

    $(document).ready(function () {
        $('div.bfh-imagepicker').each(function () {
            var $imagepicker;

            $imagepicker = $(this);

            $imagepicker.bfhimagepicker($imagepicker.data());
        });
    });


    /* APPLY TO STANDARD IMAGEPICKER ELEMENTS
     * =================================== */

    $(document)
            .on('click.bfhimagepicker.data-api', clearMenus);

}(window.jQuery);
