/**
 * @name SutrixHRM
 * @description Define global variables and functions
 * @version 1.0
 */
var SutrixHRM = (function($, window, undefined) {
  var $window = $(window);
  function globalFunct() {
  }

  function homePage() {
    $('#login-form').off('submit.login').on('submit.login', function(){
      /*var username = $('#username').val().trim();
      var password = $('#password').val().trim();*/
      if($('#username').val().trim() !== 'admin' || $('#password').val().trim() !== 'admin') {
        return false;
      }
    });
  }

  function staffPage() {
    var details = $('[data-details]');
    var control = $('[data-control]');
    var position = window.location.hash.substr(1);
    var option = $('#department option');
    option.filter('[value="'+ position +'"]').attr('selected', 'selected');

    option.each(function(){
      val = $(this).val();
      if(val === position && val !== '') {
        $('[data-staff]').removeClass('hide');
      }
    });

    control.off('click.control').on('click.control', function() {
      var elm = $(this);
      if(elm.data('control') === 'save') {
        details.removeClass('editing');
        elm.addClass('hide').siblings().removeClass('hide');
      } else {
        details.addClass('editing');
        elm.addClass('hide').siblings().removeClass('hide');
      }
    });

    $('#filter-form').off('submit.filter').on('submit.filter', function() {
      var pos = $('#department option:selected').val();
      if(pos !== '') {
        $('[data-staff]').removeClass('hide');
        window.location.hash = $('#department option:selected').val();
      } else {
        document.location = window.location.href.replace(window.location.hash, "" );
      }
      return false;
    });
    $('#staff-info-form').off('submit.filter').on('submit.filter', function() {
      return false;
    });

    $('[data-id]').off('click.showInfo').on('click.showInfo', function() {
      $(this).addClass('active').siblings().removeClass();
      $('[data-staff-info]').removeClass('hide');
      $('[data-details]').removeClass('editing');
      $('[data-control="save"]').addClass('hide').siblings().removeClass('hide');
    });
  }

  function dashboardPage() {
    if($('.dashboard-page').length) {
      $('[data-chart] li').each(function() {
        var elm = $(this);
        var val = elm.find('span').html().split(" ")[0];
        elm.css('height', val+'%');
      });
    }
  }

  function addNewPage() {
    $('#add-new-staff').off('submit.addNew').on('submit.addNew', function() {
      if(!$(this).is('[data-invalid]')) {
        document.location = $(this).attr('action')+'#'+$('#department option:selected').val();
      }
      return false;
    });

    $('#upload-img').on('change', function(){
      readerFiles.call(this);
    });

    var readerFiles = function() {
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e){
          $('.upload-block').find('img').attr('src', e.target.result);
        };
        reader.readAsDataURL(this.files[0]);
      }
    };

    function imageIsLoaded(e) {
      $('.upload-block').find('img').attr('src', e.target.result);
    };
  }

  return {
    globalFunct: globalFunct,
    page: {
      homePage: homePage,
      staffPage: staffPage,
      dashboardPage: dashboardPage,
      addNewPage: addNewPage
    }
  };

})(jQuery, window);

jQuery(function() {
  SutrixHRM.globalFunct();
  SutrixHRM.page.homePage();
  SutrixHRM.page.staffPage();
  SutrixHRM.page.dashboardPage();
  SutrixHRM.page.addNewPage();
});
