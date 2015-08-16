<?php
  // from https://parall.ax/blog/view/3109/retrieving-tweets-from-the-twitter-v1-1-api-using-oauth-php-javascript

  require_once('twitter_proxy.php');

  // Twitter OAuth Config options
  $oauth_access_token = '335764078-kwzGdmKiC5BmUHPY5l5ZXogyHQ4Miy9hDnHNwm8P';
  $oauth_access_token_secret = '52UiWBj0PHhWMKZd6Y6vs2URn8Y6S9Y74jUHKs27l834i';
  $consumer_key = '7mQci9wW4hkzFA2JnVwOc2Kkb';
  $consumer_secret = '3QShPb1i7ogvdyJ77AhzsmUZGAfge9tYZHhwRWArop0zWZDmJi';
  
//  $user_id = 'justinbieber';
  //$screen_name = 'justinbieber';
  
  //$celebArray = ['MileyCyrus','thegarybusey', 'lindsaylohan', 'charliesheen', 'thecampaignbook', 'kanyewest', 'officialjaden', 'cher'];
  $celebArray = array('MileyCyrus','thegarybusey', 'lindsaylohan', 'charliesheen', 'thecampaignbook', 'kanyewest', 'officialjaden', 'cher');

  if($_POST['name'] == 'random'){
    $min = 0;
    $max = count($celebArray)-1;
    $randomUser = rand($min, $max);
    $user_id = $celebArray[$randomUser];
    $screen_name = $user_id;
  } else {    
    $user_id = $_POST['name'];
    $screen_name = $_POST['name'];
  }
  
  if($_POST['today'] == 'true'){
    $count = 1;  
  } else {
    $count = 30;
  }

  $ignore_replies = 'true';// Ignore @replies
  $ignore_retweets ='true'; // Ignore retweets

  $twitter_url = 'statuses/user_timeline.json';
  $twitter_url .= '?user_id=' . $user_id;
  $twitter_url .= '&screen_name=' . $screen_name;
  $twitter_url .= '&count=' . $count;
  
  // Create a Twitter Proxy object from our twitter_proxy.php class
  $twitter_proxy = new TwitterProxy(
      $oauth_access_token,			// 'Access token' on https://apps.twitter.com
      $oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
      $consumer_key,					// 'API key' on https://apps.twitter.com
      $consumer_secret,				// 'API secret' on https://apps.twitter.com
      $user_id,						// User id (http://gettwitterid.com/)
      $screen_name,					// Twitter handle
      $count							// The number of tweets to pull out
  );

  // Invoke the get method to retrieve results via a cURL request
  $tweets = $twitter_proxy->get($twitter_url);
  //print_r($tweets);
  echo $tweets;

?>