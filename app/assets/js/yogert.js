fragment = {
  ready: function() {
    $(document).trigger('ready.fragment');
  }
};

jQuery.fn.selectText = function(){
  var doc = document;
  var element = this[0];
  var range, selection;

  if (doc.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};


$(document).on('ready.fragment', function(event) {

  console.log('fragments loaded');

  //TODO: Ohh screw timeout, why wont the fragments loaded work?
  setTimeout(function () {


    var selectable = '.declaration, .value';
    $(selectable).attr('tabindex', '1');

    $(selectable).on('focus', function(event) {
      var decl = $(this).closest('.declaration');

      decl.addClass('active');
      decl.siblings().removeClass('active');

      $('.focus').removeClass('focus');
      $(this).addClass('focus');
      setTimeout(function () {
        $('.focus').selectText();
      }, 0);
    });
    $(selectable).on('mouseup click', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
    $(selectable).on('mousedown', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $(this).focus();
    });

    $('.marker').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $(this).closest('.declaration').removeClass('active');
      $(this).selectText();
    });

    $('.selector').on('click', function(event) {
      event.preventDefault();
      var rule = $(this).closest('.rule');
      var copyboard = rule.find('.copyboard');
      var selector = rule.find('.selector');
      var declarations = rule.find('.declaration.active');
      var cssText = '';

      declarations = declarations.clone();
      declarations.find('svg').remove();
      console.log(declarations);
      cssText = selector.text() + ' {';
      cssText += declarations.text();
      cssText += '}';
      cssText = S(cssText);
      cssText = cssText
        .replaceAll(' ', '')
        .replaceAll('\n', '')
        .replaceAll('{', ' {\n  ')
        .replaceAll(':', ': ')
        .replaceAll(';', ';\n  ')
        .replaceAll('  }', '}');
      copyboard.val(cssText.s).addClass('show').show().select();
      $('.overlay').show();
    });


    $('.declaration').bind('keydown', 'up', function(event) {
      event.preventDefault();
      event.stopPropagation();
      var $this = $(this);
      var prev = $this.prev();
      if (prev.length === 0) { return; }
      $this.removeClass('active');
      prev.focus();
    });
    $('.value').bind('keydown', 'up', function(event) {
      event.preventDefault();
      event.stopPropagation();
      var $this = $(this);
      var decl = $this.closest('.declaration');
      var prev = decl.prev();
      if (prev.length === 0) { return; }
      var prevValue = prev.find('.value');
      prev.removeClass('active');
      prevValue.focus();
    });
    $('.declaration').bind('keydown', 'down', function(event) {
      event.preventDefault();
      event.stopPropagation();
      var $this = $(this);
      var next = $this.next();
      if (next.length === 0) { return; }
      $this.removeClass('active');
      next.focus();
    });
    $('.value').bind('keydown', 'down', function(event) {
      event.preventDefault();
      event.stopPropagation();
      var $this = $(this);
      var decl = $this.closest('.declaration');
      var next = decl.next();
      if (next.length === 0) { return; }
      var nextValue = next.find('.value');
      next.removeClass('active');
      nextValue.focus();
    });
    $('.declaration').bind('keydown', 'right', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $(this).find('.value').focus();
    });
    $('.value').bind('keydown', 'left', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $(this).closest('.declaration').focus();
    });
    $('.declaration, .value').bind('keydown', 'tab space', function(event) {
      event.preventDefault();
      event.stopPropagation();

      var nextGroup;
      var next;

      var spaceKey = event.which === 32;
      if (spaceKey) {
        $(this).closest('.declaration').removeClass('active');
      }

      nextGroup = $(this).closest('.row-group').next('.row-group');
      if (nextGroup.length === 0) {
        nextGroup = $(this).closest('.rule').next('.rule').find('.row-group:first');
      }
      if (nextGroup.length === 0) {
        nextGroup = $(this).closest('.rules').find('.rule:first .row-group:first');
      }

      next = nextGroup.find('.active:first');
      if (next.length === 0) {
        nextGroup.find('.declaration:first').focus();
      } else {
        next.focus();
      }
    });
    $('.declaration, .value').bind('keydown', 'shift+tab', function(event) {
      event.preventDefault();
      event.stopPropagation();

      var prevGroup;
      var prev;

      prevGroup = $(this).closest('.row-group').prev('.row-group');
      console.log('1',prevGroup[0]);
      if (prevGroup.length === 0) {
        console.log($(this).closest('.rule'));
        prevGroup = $(this).closest('.rule').prev('.rule').find('.row-group:last');
      }
      if (prevGroup.length === 0) {
        prevGroup = $(this).closest('.rules').find('.rule:last .row-group:last');
      }

      prev = prevGroup.find('.active:first');
      if (prev.length === 0) {
        prevGroup.find('.declaration:first').focus();
      } else {
        prev.focus();
      }
    });

    $('.copyboard').on('copy', function(event) {
      setTimeout(function () {
        $('.copyboard.show').removeClass('show').hide();
      }, 0);
    });
    $('.copyboard').on('keydown', 'esc', function(event) {
      event.preventDefault();
      $(this).hide();
    });
    $('.overlay').on('click', function(event) {
      event.preventDefault();
      $('.overlay, .copyboard.show').removeClass('show').hide();
    });

  }, 500);

});
