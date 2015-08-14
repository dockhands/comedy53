
var imgs=[];
var imgCount=0;
var tweet = "hello tweet";
var text = "hello text";

function familyTweet(username, today) {
    var canvas = document.getElementById('tutorial');

    var loadingCircle = document.getElementById('loading');

    loadingCircle.style.display = 'block';
    canvas.style.display = 'none';
    
    console.log('fc request start');
  
    var randomDay = Math.floor(Math.random() * (30));
    
//    var monthNames = ["January", "February", "March", "April", "May", "June",
//      "July", "August", "September", "October", "November", "December"
//    ];
//
//    var d = new Date();
//    console.log("The current month is " + monthNames[d.getMonth()] + " The date is: " + d.getDate());
    console.log(getComicUrl(today));
    //getDate();
    //var comicLink = 'http://familycircus.com/comics/july-'+randomDay+'-2015/';  
    var comicLink = getComicUrl(today);
    
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
              
              tweetRequest(imgSource, username, today)
              //draw(imgSource);
              //console.log(comicImg[0].src);
                
            }
            parseTableHtml(response);
        }
    });
            //}
            
}


function tweetRequest(imgSource, username, today){

  $.ajax({
    url: 'scripts/get_tweets.php',
    type: 'POST',
    data: {
            name: username,
            today: today
    },
    success: function(response) {
      if (typeof response.errors === 'undefined' || response.errors.length < 1) {
        
        var $tweets = $('<p></p>');
        var tweetArray = [];
        $.each(response, function(i, obj) {
          $tweets.append('<p>' + obj.text + '</p>');
          console.log(obj);         
          //console.log("this is the text inside the tweet Request " + tweet);draw(imgSource, obj.text);
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
//            img.crossOrigin = "Anonymous";
//            src = "http://example.com/image"; // insert image url here
//            img.src = src;
//            console.log(img);
            //img .setAttribute('crossOrigin', 'anonymous');
            img.onload = function(){
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight+60;
              ctx.drawImage(img,0,0);
              ctx.fillStyle="white";
              ctx.fillRect(0,605,620,200);

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
              //var x = (canvas.width - maxWidth) / 2;
              var x = (canvas.width) / 2;
              var y = 640;
              var text = 'All the world \'s a stage, and all the men and women merely players.';
              
              ctx.font = 'bold 18pt Arial';
              ctx.fillStyle = '#000';
              tweet = tweet.replace(/&amp;/g, '&');
              wrapText(ctx, tweet, x, y, maxWidth, lineHeight);
              $('#loading').hide();
              canvas.style.display = 'block';
            };
            img.src = imgSrc;
            imgs.push(img);            

            //ctx.drawImage(tweet,0,0);

           console.log("this is the text inside the draw " + text);

        }
       
        
  //  }
}

function createFBLink(canvas){
  var dataURL = canvas.toDataURL('image/jpeg');
  $('#fb-share').html('<div class="fb-share-button" data-href="'+dataURL+'" data-layout="button">HELLO</div>');
  $('#fb-share').show();
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';
  context.textAlign = 'center';
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

function getRandomDay(month){

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      console.log('31 days!');
      var randomDay = Math.floor(Math.random() *  (31 - 1) + 1);
      return randomDay;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      console.log('30 days!');
      var randomDay = Math.floor(Math.random() *  (30 - 1) + 1);
      return randomDay;
      break;
    case 2:
      console.log('28 days!');
      var randomDay = Math.floor(Math.random() *  (28 - 1) + 1);
      return randomDay;
      break;
  }
}

function getComicUrl(today) {
  var d = new Date();
  var year = d.getFullYear();
  var monthNames = ["january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];
  var month = monthNames[d.getMonth()];
  var day = d.getDate();
  
  
  if(today){

  } else {

    var randomMonth = Math.floor(Math.random() *  (12 - 1) + 1);
    day = getRandomDay(randomMonth);
    
    if(randomMonth > d.getMonth()){
      year = year-1;
    }
    
    if(randomMonth == d.getMonth() && day > d.getDate()){
      day = d.getDate();
    }   
    month = monthNames[randomMonth];
  }
  
  return 'http://familycircus.com/comics/'+month+'-'+day+'-'+year+'/';
  

  
  console.log(d.getFullYear()-1);
  
  //var randomDay = Math.floor(Math.random() * (30));

  //console.log("The current month is " + monthNames[d.getMonth()] + " The date is: " + d.getDate());
  
  
}

$( document ).ready(function() {
  $( "#getToday" ).click(function() {
    var user = $('#celebSelect').val();
    console.log(user);
    familyTweet(user, true);
  });
  $( "#getRandom" ).click(function() {
    familyTweet('random', false);
  });
  
  $( "#getBieber" ).click(function() {
    familyTweet('justinbieber', false);
  });
  $( "#getSmith" ).click(function() {
    familyTweet('officialjaden', false);
  });
  $( "#getKardashian" ).click(function() {
    familyTweet('kimkardashian', false);
  });
});