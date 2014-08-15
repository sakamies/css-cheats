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
//TODO: support selecting multiple ranges? so chen clicking .selector, it would select all .active declarations, ready for copy & paste


$(document).on('ready.fragment', function(event) {

  console.log('fragments loaded');

  //TODO: Ohh screw timeout, why wont the fragments loaded work?
  setTimeout(function () {


    var selectable = '.declaration, .value';
    $(selectable).attr('tabindex', '1');

    $(selectable).on('focus', function(event) {
      var decl = $(this).closest('.declaration');

      /*$('.selected').removeClass('selected');
      $(this).addClass('selected');*/
      $(this).selectText();

      decl.addClass('active');
      decl.siblings().removeClass('active');

    });
    $(selectable).on('mousedown mouseup click', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
    $(selectable).on('click', function(event) {
      event.preventDefault();
      $(this).focus();
    });

    $('.marker').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $(this).closest('.declaration').removeClass('active');
      $(this).selectText();
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

    $(document).on('beforecopy' , function(event) {
      //TODO: before copy, copy rules and selected declarations text to textarea and copy text from there, so we don't get extra crap to pasteboard
      console.log('kopi!');
    });


  }, 500);

});
