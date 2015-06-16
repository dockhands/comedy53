
var imgs=[];
var imgCount=0;
var tweet = "hello tweet";
var text = "hello text";




function fcRequest() {
    console.log('fc request start');
    $.ajax({
        url: 'proxy.php',
        type: 'POST',
        data: {
            address: 'http://familycircus.com/'
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
              draw(imgSource);
              //console.log(comicImg[0].src);
                
            }
            parseTableHtml(response);
        }
    });
            //}
            
}


function tweetRequest(){

  $.ajax({
    url: 'get_tweets.php',
    type: 'GET',
    success: function(response) {
      if (typeof response.errors === 'undefined' || response.errors.length < 1) {
        
        var $tweets = $('<p></p>');
        $.each(response, function(i, obj) {
          $tweets.append('<p>' + obj.text + '</p>');

        var tweet = obj.text; 
        console.log("this is the text inside the tweet Request " + tweet);
        
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
};

function draw(imgSrc){

  
   
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext){
            var ctx = canvas.getContext('2d');

            var img = new Image();
            img.onload = function(){  
              canvas.height = img.naturalHeight;
              ctx.drawImage(img,0,0);
              ctx.fillStyle="blue";
              ctx.fillRect(20,610,600,200);

              ctx.font="30px Georgia";
              context.fillStyle ="black";
              ctx.fillText("Hello World!",20,610);

              ctx.font="80px Georgia";
              context.fillStyle ="black";
              ctx.fillText("Hello World!asfasdfasfasdf",20,310);

              ctx.fillStyle="blue";
              ctx.fillRect(20,310,200,200);
             
              
            };
            img.src = imgSrc;
            imgs.push(img);

            

            //ctx.drawImage(tweet,0,0);

           console.log("this is the text inside the draw " + text);

        }
       
        
  //  }
}


