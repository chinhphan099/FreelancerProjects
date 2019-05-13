(function($, window, undefined) {
  'use strict';

  var pluginName = 'lession',
    lession_item = '<div class="item" id="{{id}}">'+
                      '<h2 class="title">{{title}}</h2>' +
                      '<div class="content">{{content}}</div>' +
                      '<button type="button" class="button btn-primary">{{submitBtnText}}</button>' +
                      '<button type="button" class="button btn-secondary">{{resetBtnText}}</button>' +
                    '</div',
    select = '<select rel="{{result}}">',
    option = '<option value="{{valueOption}}">{{suggest}}</option>';

  var first = function() {
    this.vars.paging += '<li><a href="#!" rel="1">1' + '<span>/' + this.vars.totalPages + '</a></li><li class="unavailable"><span>...</span></li>';
  };
  var middle = function(from, to) {
    console.log(typeof from, typeof to);
    for(var i = from; i <= to; i++) {
      if(i === this.vars.currentpage) {
        this.vars.paging += '<li class="active"><a href="#!" rel="' + i + '">' + i + '<span>/' + this.vars.totalPages + '</a></li>';
      }
      else {
        this.vars.paging += '<li><a href="#!" rel="' + i + '">' + i + '<span>/' + this.vars.totalPages + '</a></li>';
      }
    }
  };
  var last = function() {
    this.vars.paging += '<li class="unavailable"><span>...</span></li><li><a href="#!" rel="' + this.vars.totalPages + '">' + this.vars.totalPages + '<span>/' + this.vars.totalPages + '</span>' + '</a></li>';
  };

  var generatePagination = function() {
    var that = this;
    this.vars.paging = '';

    // Prev button
    if(this.vars.currentpage !== 1) {
      this.vars.paging += '<li class="prev-page"><a href="#!"><i class="ion-ios-arrow-back"></i></a></li>';
    }
    else {
      this.vars.paging += '<li class="prev-page invisible"><a href="#!"><i class="ion-ios-arrow-back"></i></a></li>';
    }
    // Next button - mobile
    if(this.vars.currentpage !== this.vars.totalPages) {
      this.vars.paging += '<li class="next-page hidden-md-up"><a href="#!"><i class="ion-ios-arrow-forward"></i></a></li>';
    }
    else {
      this.vars.paging += '<li class="next-page hidden-md-up invisible"><a href="#!"><i class="ion-ios-arrow-forward"></i></a></li>';
    }

    // Numberic
    this.vars.paging += '<li class="number"><ul class="clearfix">'
    if(this.vars.totalPages > 7) {
      if(this.vars.currentpage - 1 <= 3 && this.vars.totalPages - this.vars.currentpage > 3) {
        middle.call(this, 1, 5);
        last.call(this);
      }
      else if(this.vars.currentpage - 1 > 3 && this.vars.totalPages - this.vars.currentpage <= 3) {
        first.call(this);
        middle.call(this, this.vars.totalPages - 4, this.vars.totalPages);
      }
      else if(this.vars.currentpage - 1 > 3 && this.vars.totalPages - this.vars.currentpage > 3) {
        first.call(this);
        middle.call(this, this.vars.currentpage - 1, this.vars.currentpage + 1);
        last.call(this);
      }
    }
    else {
      middle.call(this, 1, this.vars.totalPages);
    }
    this.vars.paging += '</ul></li>'

    // Next button - Desktop
    if(this.vars.currentpage !== this.vars.totalPages) {
      this.vars.paging += '<li class="next-page hidden-sm-down"><a href="#!"><i class="ion-ios-arrow-forward"></i></a></li>';
    }
    else {
      this.vars.paging += '<li class="next-page hidden-sm-down visible"><a href="#!"><i class="ion-ios-arrow-forward"></i></a></li>';
    }

    // Print pagination
    this.options.pagingElm.html(this.vars.paging);
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options, this.element.data(pluginName));
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var url = new URL(window.location.href);
      this.vars = {
        database: database,
        perpage: this.options.perpage,
        totalItems: database.length,
        totalPages: Math.ceil(database.length / this.options.perpage)
      };
      this.vars.currentpage = (Number.isInteger(parseInt(url.searchParams.get('page'))) && !!url.searchParams.get('page')) ? parseInt(url.searchParams.get('page')) : 1;
      this.loadData(this.vars.currentpage);
    },
    loadData: function(page) {
      var load_from = page * this.vars.perpage - this.vars.perpage;
      var load_end = page * this.vars.perpage;
      this.element.empty();
      this.checkpage(page);

      // Correct Page
      for(var i = load_from, n = load_end; i < n; i++) {
        if(typeof this.vars.database[i] !== "undefined") {
          this.vars.lession_item = lession_item;
          this.vars.lession_item = this.vars.lession_item.replace('{{id}}', 'question_' + parseInt(i + 1));
          this.vars.lession_item = this.vars.lession_item.replace('{{title}}', this.vars.database[i].title);
          this.vars.lession_item = this.vars.lession_item.replace('{{content}}', this.vars.database[i].conversation);
          this.vars.lession_item = this.vars.lession_item.replace('{{submitBtnText}}', this.options.submitBtnText);
          this.vars.lession_item = this.vars.lession_item.replace('{{resetBtnText}}', this.options.resetBtnText);
          this.generalDdl(i);
        }
      }
      generatePagination.call(this);
      this.afterLoadData();
      this.listener();
    },
    checkpage: function(page) {
      // Incorrect Page
      if(this.vars.totalPages < page || page < 1) {
        $('main').empty().html('<div class="not-found">' + l10n.errorPageMsg + '</div>');
        return false;
      }

      if(page === 1) { // First page
        $('.next').removeClass('hidden');
        $('.prev').addClass('hidden');
      }
      else if(page === this.vars.totalPages) {// Last page
        $('.next').addClass('hidden');
        $('.prev').removeClass('hidden');
      }
      else {
        $('.next').removeClass('hidden');
        $('.prev').removeClass('hidden');
      }
      history.pushState(null, null, '?page=' + this.vars.currentpage);
    },
    generalDdl: function(index) {
      var optionlist;
      if(!!this.vars.database[index].answer_suggests) {
        for(var i = 0, n = this.vars.database[index].result.length; i < n; i++) {
          optionlist = '';
          this.vars.select = select;
          this.vars.select = select.replace('{{result}}', this.vars.database[index].result[i].indexResult);
          for(var j = 0, m = this.vars.database[index].answer_suggests.length; j < m; j++) {
            this.vars.option = option;
            this.vars.option = this.vars.option.replace(/{{suggest}}/gi, this.vars.database[index].answer_suggests[j]);
            this.vars.option = this.vars.option.replace(/{{valueOption}}/gi, j + 1);
            optionlist += this.vars.option;
          }
          this.vars.select = this.vars.select + '<option value="0">Select Answer</option>' + optionlist + '</select>'
          this.vars.lession_item = this.vars.lession_item.replace('[blank_' + (i + 1) + ']', this.vars.select);
        }
      }
      else {
        for(var i = 0, n = this.vars.database[index].result.length; i < n; i++) {
          optionlist = '';
          this.vars.select = select;
          this.vars.select = select.replace('{{result}}', this.vars.database[index].result[i].indexResult);
          for(var j = 0, m = this.vars.database[index].result[i].answer_suggests.length; j < m; j++) {
            this.vars.option = option;
            this.vars.option = this.vars.option.replace(/{{suggest}}/gi, this.vars.database[index].result[i].answer_suggests[j]);
            this.vars.option = this.vars.option.replace(/{{valueOption}}/gi, j + 1);
            optionlist += this.vars.option;
          }
          this.vars.select = this.vars.select + '<option value="0">Select Answer</option>' + optionlist + '</select>'
          this.vars.lession_item = this.vars.lession_item.replace('[blank_' + (i + 1) + ']', this.vars.select);
        }
      }
      this.element.append($(this.vars.lession_item));
    },
    afterLoadData: function() {
      var that = this;
      $('.item', this.element).each(function(index, element) {
        var key = $(element).attr('id'),
          item = JSON.parse(localStorage.getItem(key));
        if (!!item) {
          var anwser = item.anwser;
          if(item.isPassed) {
            $(this).addClass('passed');
            $(this).find('.btn-primary').text(that.options.passBtnText).prop('disabled', true);
          }
          $('#' + key + ' select').each(function(index, elm) {
            $(elm).val(anwser[index]);
          });
        }
      });
    },
    listener: function() {
      var that = this, newlink, anwser, key
      $('.btn-primary', this.element).off('click.check' + pluginName).on('click.check' + pluginName, function() {
        var item = $(this).closest('.item');
        $('select', item).each(function(index, select) {
          if($(this).val() !== $(this).attr('rel')) {
            $(this).removeClass('correct').addClass('error');
          }
          else {
            $(this).removeClass('error').addClass('correct')
          }
        });
        if($('select', $(this).closest('.item')).hasClass('error')) {
          that.saveData(item, false);
          return;
        }
        else {
          that.saveData(item, true);
          $(this).closest('.item').addClass('passed');
          $(this).text(that.options.passBtnText).prop('disabled', true);
        }
      });

      $('.btn-secondary', this.element).off('click.reset' + pluginName).on('click.reset' + pluginName, function() {
        $(this).closest('.item').removeClass('passed');
        $('select', $(this).closest('.item')).removeClass().val(0).prop('disabled', false);
        $('.btn-primary', $(this).closest('.item')).text(that.options.submitBtnText).prop('disabled', false);
        key = $(this).closest('.item').attr('id');
        $('#' + key + ' select').each(function () {
          $(this).val(0);
        });
        localStorage.removeItem(key);
      });

      $('select', this.element).off('change.change' + pluginName).on('change.change' + pluginName, function() {
        $(this).removeClass();
      });

      $('.control-direction').off('click.control' + pluginName).on('click.control' + pluginName, function(e) {
        e.preventDefault();
        if($(this).hasClass('next')) {
          ++that.vars.currentpage;
        }
        if($(this).hasClass('prev')) {
          --that.vars.currentpage;
        }
        that.loadData(that.vars.currentpage);
      });

      // Pagination event
      $('a', '.pagination').off('click.paging' + pluginName).on('click.paging' + pluginName, function(e) {
        e.preventDefault();
        if(!!$(this).closest('.number').length) {
          that.vars.currentpage = parseInt($(this).attr('rel'));
        }
        else if(!!$(this).closest('.next-page').length) {
          ++that.vars.currentpage;
        }
        else if(!!$(this).closest('.prev-page').length) {
          --that.vars.currentpage;
        }
        that.loadData(that.vars.currentpage);
      });
    },
    saveData: function(item, isPassed) {
      var key = item.attr('id'), anwser = [], item;
      $('#' + key + ' select').each(function (index, elm) {
        anwser.push($(elm).val());
        item = {
          anwser: anwser,
          isPassed: isPassed
        };
      });
      if (typeof(Storage) !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(item));
      }
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    submitBtnText: l10n.submitBtnText,
    resetBtnText: l10n.resetBtnText,
    passBtnText: l10n.passBtnText,
    pagingElm: $('.pagination'),
    totalNumberPaging: 7
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
