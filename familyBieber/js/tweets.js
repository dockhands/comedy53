$(function(){

	$.ajax({
		url: 'get_tweets.php',
		type: 'GET',
		success: function(response) {

			if (typeof response.errors === 'undefined' || response.errors.length < 1) {
				

				var $tweets = $('<p></p>');
				$.each(response, function(i, obj) {
					$tweets.append('<p>' + obj.text + '</p>');
					
				var tweet = obj.text	
				console.log("got the tweets FOR sep function, they are: " + tweet);
				});

				$('.tweets-container').html($tweets);
				
				

			} else {
				$('.tweets-container p:first').text('Response error');
			}
		},
		error: function(errors) {
			$('.tweets-container p:first').text('Request error');
		}
	});
});