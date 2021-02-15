/* ==========================================================
 * bootstrap-formhelpers-number.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* NUMBER CLASS DEFINITION
   * ====================== */

  var BFHNumberUnits = function (element, options) {
    this.options = $.extend({}, $.fn.bfhnumberunits.defaults, options);
    this.$element = $(element);

    this.initInput();
  };

  BFHNumberUnits.prototype = {

    constructor: BFHNumberUnits,

    initInput: function() {
      var value;
      var options, option;

      options = '';
      this.selectedUnit = null;
      for (var index in this.options.dropdownItems) {
        option = this.options.dropdownItems[index];
        if (this.options.dropdownItems[index].selected) {
          this.selectedUnit = this.options.dropdownItems[index].value;
        }
        options += '<li><a tabindex="-1" href="#" data-option="' + option.value + '">' + option.text + '</a></li>';
      }

      this.$element.html(
          '<div class="input-group bfh-numberunits">' +
          '<input class="form-control bfh-numberunits-input" type="number" name="' + this.options.name + '" value="">' +
          '<div class="input-group-btn">' +
          '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
          '<span class="bfh-numberunits-unit">Action</span> ' +
          '<span class="caret"></span></button>' +
          '<ul class="dropdown-menu dropdown-menu-right">' +
          '</ul>' +
          '</div>' +
          '</div>'
      );

      this.$numberUnitsInput = this.$element.find('.bfh-numberunits-input');
      if (this.options.value) {
        this.$numberUnitsInput.val(this.options.value);
      }
      this.$numberSelectMenu = this.$element.find('.dropdown-menu');
      this.$numberSelectMenu.html(options);
      this.$numberSelectUnit = this.$element.find(".bfh-numberunits-unit");
      if (this.selectedUnit) {
        this.$numberSelectUnit.html(this.selectedUnit);
      }

      this.$numberUnitsInput.on('change.bfhnumberunits.data-api', this, BFHNumberUnits.prototype.change);

      this.$numberSelectMenu.on('click', 'li', this, BFHNumberUnits.prototype.click);

      this.formatNumber();
    },

    click: function(e) {
      e.preventDefault();
      var oldSelectedUnit, self = e.data;

      oldSelectedUnit = this.selectedUnit;
      self.selectedUnit = $(e.target).data('option');
      if (oldSelectedUnit != self.selectedUnit) {
        self.$numberSelectUnit.html(self.selectedUnit);
        self.$element.trigger('valuechange.bfhnumberunits', self);
      }
    },

    getSelectedUnit: function() {
      return this.selectedUnit;
    },

    change: function(e) {
      var $this;

      $this = e.data;

      if ($this.$element.is('.disabled') || $this.$element.attr('disabled') !== undefined) {
        return true;
      }

      $this.formatNumber();

      $this.$element.trigger('valuechange.bfhnumberunits', $this);
      return true;
    },

    getValue: function() {
      var value;
      
      value = this.$numberUnitsInput.val();
      if (value !== '-1') {
        value = String(value).replace(/\D/g, '');
      }
      if (String(value).length === 0) {
        value = this.options.min;
      }
      
      return parseInt(value);
    },

    setValue: function(value) {
      if (value !== '-1') {
        value = String(value).replace(/\D/g, '');
      }
      if (String(value).length === 0) {
        value = this.options.min;
      }

      this.$numberUnitsInput.val(parseInt(value));
    },

    formatNumber: function() {
      var value,
          maxLength,
          length,
          zero;
      
      value = this.getValue();
      
      if (value > this.options.max) {
        if (this.options.wrap === true) {
          value = this.options.min;
        } else {
          value = this.options.max;
        }
      }
      
      if (value < this.options.min) {
        if (this.options.wrap === true) {
          value = this.options.max;
        } else {
          value = this.options.min;
        }
      }
      
      if (this.options.zeros === true) {
        maxLength = String(this.options.max).length;
        length = String(value).length;
        for (zero=length; zero < maxLength; zero = zero + 1) {
          value = '0' + value;
        }
      }
      
      if (value !== this.$numberUnitsInput.val()) {
        this.$numberUnitsInput.val(value);
      }
    }

  };

  /* NUMBER PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhnumberunits;

  $.fn.bfhnumberunits = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhnumberunits');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhnumberunits', (data = new BFHNumberUnits(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhnumberunits.Constructor = BFHNumberUnits;

  $.fn.bfhnumberunits.defaults = {
    min: 0,
    max: 9999,
    zeros: false,
    keyboard: true,
    buttons: true,
    wrap: false
  };


  /* NUMBER NO CONFLICT
   * ========================== */

  $.fn.bfhnumberunits.noConflict = function () {
    $.fn.bfhnumberunits = old;
    return this;
  };


  /* NUMBER DATA-API
   * ============== */

  $(document).ready( function () {
    $('form input[type="text"].bfh-numberunits, form input[type="number"].bfh-numberunits').each(function () {
      var $number;

      $number = $(this);

      $number.bfhnumberunits($number.data());
    });
  });


  /* APPLY TO STANDARD NUMBER ELEMENTS
   * =================================== */


}(window.jQuery);
