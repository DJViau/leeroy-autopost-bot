
/**
 * twitter stuff
 */

console.log(`
**********************
Leeroy Bot Has Started
@${CONFIG.twitter.userHandle}
**********************
`)


let tweetFetchingInterval;

initInterval();

/**
 * [initInterval description]
 */
function initInterval() {
  console.log(`${timestamp()} starting fetching interval: ${CONFIG.checkingInterval * 60} seconds`);
  let tweetFetchingInterval = setInterval(getTweets, CONFIG.checkingInterval * 60 * 1000);
  getTweets()
}


/**
 * [getTweets description]
 */
function getTweets() {
  client.get(
    'statuses/user_timeline',
    {
      screen_name: CONFIG.twitter.userHandle,
      count: 10
    },
    handleTwitterResponse
  );
}


/**
 * [handleTwitterResponse description]
 */
function handleTwitterResponse(error, tweets, response) {

  if (!error) {
    let twts = filterTweets(tweets);
    console.log(`${timestamp()} we got ${twts.length} tweets`);
    // ...
  } else {
    console.log(`${timestamp()} error: ${error}`);
  }
}


/**
 * [filterTweets description]
 */
function filterTweets(tweets) {

  // filter out twitter replies (we only want direct posts)
  tweets = tweets.filter(twt => twt.in_reply_to_status_id_str === null);

  // filter out tweets we may have already posted
  tweets = tweets.filter(twt => {
    let tweetTimestamp = new Date(twt.created_at).getTime()
    let cutoff = new Date().getTime() - (CONFIG.checkingInterval * 60 * 1000);
    // console.log(`${timestamp()} tweetTimestamp: ${tweetTimestamp} vs. cutoff: ${cutoff}`);
    return tweetTimestamp > cutoff;
  });

  return tweets;
}
