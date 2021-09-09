$(document).ready(function() {

  $('#tweet-text').on('input', function () {
    const maxValue = 140;
    const charsTypedLength = $(this).val().length;
    const charsRemaining = maxValue - charsTypedLength;

    const counter = $(this).closest("form").find(".counter").html(charsRemaining);

    if (charsRemaining < 0) {
      counter.addClass('invalid');
    } else {
      counter.removeClass('invalid');
    }

  })

});