/*
 * This file is part of the Speedwapp package.
 *
 * (c) Akambi Fagbohoun <contact@akambi-fagbohoun.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'jqueryuiwidget',
            'jquery_easing'
        ], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function($) {
    'use strict';

    $(document).ready(function() {


        $(document).on("click", ".asalah_color_switcher", function()
        {
            var color = $(this).attr("name");
            var dataString = 'color=' + color;
            var uri = $("#color-switcher").attr('data-uri');

            $.ajax
                    ({
                        type: "POST",
                        url: uri,
                        data: dataString,
                        cache: false,
                        success: function(response)
                        {
                            $("#color-switcher").html(response);
                        }
                    });

            $('#asalah_color_switcher_picker').css('backgroundColor', '#' + color);
        });

// Close button action

        $(document).on("click", ".right_aside_control.closed_switcher", function()
        {
            $('.right_aside_control').addClass('opened_switcher');
            $('.right_aside').addClass('opened_switcher');
            $('.right_aside_control').removeClass('closed_switcher');
            $('.right_aside').removeClass('closed_switcher');
            var event = new Event('open');
            document.dispatchEvent(event);

            $(document).on("click", ".asalah_html_bg_switcher", function()
            {
                var bg = $(this).attr("src");
                var bg_att = 'url("' + bg + '")'
                $('html').css("background", bg_att)
            });

            // Check Reviews On or Off 
            $("select[name='asalah_body_layout_switcher']").change(function() {
                var selected_swithcer_layout = $("select[name='asalah_body_layout_switcher'] option:selected ").val();

                if (selected_swithcer_layout == 'boxed_body') {
                    $('body').removeClass('fluid_body');
                    $('body').addClass('boxed_body');

                } else if (selected_swithcer_layout == 'fluid_body') {
                    $('body').removeClass('boxed_body');
                    $('body').addClass('fluid_body');
                }
            });

        });

        $(document).on("click", ".right_aside_control.opened_switcher", function()
        {
            $('.right_aside_control').addClass('closed_switcher');
            $('.right_aside').addClass('closed_switcher');
            $('.right_aside_control').removeClass('opened_switcher');
            $('.right_aside').removeClass('opened_switcher');
            var event = new Event('close');
            document.dispatchEvent(event);
        });

//    return switcherPanel;
    });
}));
