
$(document).ready(function() {
  $('div.errMsg').addClass('hidden');
  loadTweets();
  
  $('#form').on('submit', validateSubmit);
  
});

// ----------- functions ------------
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(twtObj) {
  const $tweetNew = $(
    `<article class="tweet-container">
      <header>
            <div class="user-info">
              <img src="${twtObj.user.avatars}">
              <h1>${twtObj.user.name}</h1>
              <h2>${twtObj.user.handle}</h2>
            </div>
          </header>
          <div class="tweet-body">
            <p>
              ${escape(twtObj.content.text)}
            </p>
          </div>
          <footer>
            <p>${timeago.format(twtObj.created_at)}</p>
            <span>
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </span>
        </footer>
  </article>`);

  return $tweetNew;

};

const loadTweets = function() {
  $.get("/tweets", function(data) {
    $('#tweet-text').val('');
    console.log(data);
    renderTweets(data);
  });
};

const validateSubmit = event => {
  event.preventDefault();
  const $tweetError = $('div.errMsg');
  $tweetError.addClass('hidden');
  $tweetError.text("");
  const tweetAreaContent = $('#tweet-text').val().length;

  if ($tweetError) {
    $tweetError.empty().toggleClass('.errMsg');
  }

  if (tweetAreaContent > 140) {
    $tweetError.removeClass('hidden');
    $tweetError.text("Your tweet is too long! We can't handle that many characters!").show().fadeOut(3500);
    return;
  }

  if (tweetAreaContent === 0) {
    $tweetError.toggleClass('hidden');
    $tweetError.text("Your tweet has no content! :(").show().fadeOut(3500);
    return;
  }
  const data = $('#form').serialize();
  // post format: url, data, success, dataType
  $.post("/tweets", data)
    .then($tweetError.hide("slow"))
    .then($('.counter').val(140))
    .then(loadTweets());
};

const renderTweets = function(arrayOfTwtObj) {
  $('#tweets').empty();
  for (const obj of arrayOfTwtObj) {
    $('#tweets').prepend(createTweetElement(obj));
  }
};