$(document).ready(function() {

  $('#tweet-text').on('input', function () {
    // console.log("this:", this); // 'this' refers to the textarea html
    // <textarea name="text" id="tweet-text"></textarea>
    const maxValue = 140;
    const charsTypedLength = $(this).val().length;
    const charsRemaining = maxValue - charsTypedLength;

    const counter = $(this).closest("form").find(".counter").html(charsRemaining);

    if (charsRemaining < 0) {
      counter.addClass('invalid');
    } else {
      counter.removeClass('invalid');
    }


    // console.log("counter var:", counter);

    // console.log("this length:", charsTypedLength);
  })

});