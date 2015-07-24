
var imgs=[];
var imgCount=0;
var tweet = "hello tweet";
var text = "hello text";




function fcRequest() {
    console.log('fc request start');
  
    var randomDay = Math.floor(Math.random() * (30));
    var comicLink = 'http://familycircus.com/comics/may-'+randomDay+'-2015/';
    $.ajax({
        url: 'scripts/proxy.php',
        type: 'POST',
        data: {
            address: comicLink
        },
        success: function(response) {
            function parseTableHtml(s) { // s is string
                
                //the div contains the entire response from the request
                var comic = document.createElement('div');
                comic.innerHTML = s;
                console.log(comic);
                //mainContent will be the dom structure containing elements from the main post
                //var mainContent = document.createElement('div');
//                comicPane = comic.getElementsByTagName('li #comicpanel');
                comicPane = comic.getElementsByTagName('LI');
              
              for(var i = 0; i < comicPane.length; i++){
                if(comicPane[i].id == 'comicpanel'){
                  comicPanel = comicPane[i];
                }
              }
              //comicPanel.getElementsByTagName('img');
              console.log(comicPanel.getElementsByTagName('img'));
              comicImg = comicPanel.getElementsByTagName('img');
              imgSource = comicImg[0].src;
              
              tweetRequest(imgSource)
              //draw(imgSource);
              //console.log(comicImg[0].src);
                
            }
            parseTableHtml(response);
        }
    });
            //}
            
}


function tweetRequest(imgSource){

  $.ajax({
    url: 'get_tweets.php',
    type: 'GET',
    success: function(response) {
      if (typeof response.errors === 'undefined' || response.errors.length < 1) {
        
        var $tweets = $('<p></p>');
        var tweetArray = [];
        $.each(response, function(i, obj) {
          $tweets.append('<p>' + obj.text + '</p>');
                    
          //draw(imgSource, obj.text);
          var tweet = obj.text; 
          console.log("this is the text inside the tweet Request " + tweet);
        
          tweetArray.push(obj.text);
        });
        
        var randomTweet = Math.floor(Math.random() * (tweetArray.length));
        draw(imgSource, tweetArray[randomTweet]);
        //$('.tweets-container').html($tweets);
        

      } else {
        $('.tweets-container p:first').text('Response error');
      }
      
    },


    error: function(errors) {
      $('.tweets-container p:first').text('Request error');
    }
  });
};

function draw(imgSrc, tweet){

  
   
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext){
            var ctx = canvas.getContext('2d');

            var img = new Image();
            img.onload = function(){
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight+60;
              ctx.drawImage(img,0,0);
              ctx.fillStyle="white";
              ctx.fillRect(20,605,600,200);

              ctx.font="30px Georgia";
              ctx.fillStyle ="black";
              //ctx.fillText("Hello World!",20,610);

              ctx.font="80px Georgia";
              ctx.fillStyle ="black";
              //ctx.fillText("Hello World!asfasdfasfasdf",20,310);

              //ctx.fillStyle="white";
              //ctx.fillRect(20,310,200,200);
             
              //text drawing
              var maxWidth = 460;
              var lineHeight = 25;
              var x = (canvas.width - maxWidth) / 2;
              var y = 640;
              var text = 'All the world \'s a stage, and all the men and women merely players.';
              
              ctx.font = 'bold 18pt Arial';
              ctx.fillStyle = '#000';              
              wrapText(ctx, tweet, x, y, maxWidth, lineHeight);
              
            };
            img.src = imgSrc;
            imgs.push(img);

            

            //ctx.drawImage(tweet,0,0);

           console.log("this is the text inside the draw " + text);

        }
       
        
  //  }
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
        //context.textAlign = 'center';
        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          //context.textAlign = 'center';
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        
        context.fillText(line, x, y);
      }
