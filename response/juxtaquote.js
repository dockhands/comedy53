function flickrRequest() {

  var canvas = document.getElementById('tutorial');

  var loadingCircle = document.getElementById('loading');
  
  loadingCircle.style.display = 'block';
  canvas.style.display = 'none';
  
  //$('#loading').show();
  var key = '95b7c0c7ceb6f8c1383c57ebcc84bc01';
  var searchTerm = 'poverty';
  var numImages = 500;
  var randomNum = Math.floor(Math.random() * (numImages-1));

  var photoSearch_method = 'flickr.photos.search';
  var getSizes_method = 'flickr.photos.getSizes';

  var url = "https://api.flickr.com/services/rest/?method="+ photoSearch_method +"&api_key=" + key + "&tags="+ searchTerm + "&safe_search=1&per_page="+numImages;

  var src;
  $.getJSON(url + "&format=json&jsoncallback=?", function(data){
    var photo = data.photos.photo[randomNum];
    var sizeUrl = "https://api.flickr.com/services/rest/?method="+ getSizes_method +"&api_key=" + key + "&photo_id=" + photo.id;
    $.getJSON(sizeUrl + "&format=json&jsoncallback=?", function(data){

    
      if(data.sizes.size[8]){
        imgUrl = data.sizes.size[8].source;
        console.log("This is the final image" + imgUrl);        

           var finalPhoto =  imgUrl;

          getQuotes(finalPhoto);

      } else {
        console.log('No large image size!');
        flickrRequest();
      }
    });
  });
}

function getQuotes(finalPhoto) { 

  var pageNumber = 27;
  var quoteNumber = 20;
  var pageNumberRandom = Math.floor(Math.random() * (pageNumber-1));
  var quoteRandom = Math.floor(Math.random() * (quoteNumber-1 - 6) + 6);
  console.log(quoteRandom);
  $.ajax({
    url: 'proxy.php',
    type: 'POST',
    data: {
        //address: testHref
        address:  "http://www.movemequotes.com/tag/success/page/" +pageNumberRandom     
    },
    success: function(response) {  

      function parseQuotes(s) { // s is string                
      //console.log(response);
        var quotePage = document.createElement('div');
        quotePage.innerHTML = s;
        console.log(quotePage);
        var quotes = document.createElement('div');

        var quotesArray = [];
        quotes = quotePage.getElementsByTagName('P');

        console.log(quotes);

        var testQuote = quotes[quoteRandom].innerText; 
        var finalQuote = testQuote.toString();
        
        if(finalQuote == ''){
          getQuotes(finalPhoto);
        } else {
          draw(finalPhoto, finalQuote);
        }
        
      }
      parseQuotes(response);
    }

  })
}

function draw(imgSrc, finalQuote ){
        console.log("this is the final quote again, in draw: " + finalQuote);
        var textQuote = finalQuote; 
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext){
            var ctx = canvas.getContext('2d');
            //console.log("test3");
            var img = new Image();
            img.crossOrigin = "Anonymous";
            
            img.onload = function(){  

              var extraCanvasWidth = 60;
              
              ctx.font = '22pt Times New Roman';
              var totalLines = getLines(ctx, finalQuote, (img.width+bufferWidth)/2,img.height+150, img.width -10, 26);
              
              var extraCanvasHeight = 175;
              
              //console.log(totalLines);
              
              canvas.width = img.naturalWidth + extraCanvasWidth;
              canvas.height = img.naturalHeight + extraCanvasHeight + (25 * totalLines);
              
              ctx.fillStyle = 'black';
              var bufferWidth = 60;
              var bufferHeight = 240;
              ctx.fillRect(0,0,canvas.width,canvas.height);

              var imgXpos = 30;
              var imgYpos = 30;

              ctx.strokeStyle = 'white';
              ctx.lineWidth=5;
              ctx.strokeRect(20,20,img.width+20,img.height+20);

              
              ctx.drawImage(img, imgXpos, imgYpos);
              //ctx.rect(x, y, w, h);
              //ctx.stroke();
              ctx.fillStyle = 'white'; 
              ctx.font = '42pt Times New Roman';
              wrapText(ctx, "S U C C E S S", (img.width+bufferWidth)/2,img.height+100, img.width, 42);
              ctx.font = '22pt Times New Roman';
              ctx.fillStyle = 'white';  
              console.log("this is in draw, writing final text" + textQuote);

              
              wrapText(ctx, finalQuote, (img.width+bufferWidth)/2,img.height+150, img.width -10, 26);
              $('#loading').hide();
              canvas.style.display = 'block';
            };
            //console.log("test1");
            img.src = imgSrc;
            //console.log("test2");
            //imgs.push(img);

              // ctx.font = 'bold 18pt Arial';
              // ctx.fillStyle = 'white';          
              // ctx.fillText("Hello World",imgXpos,img.height+120);

              // ctx.font = 'bold 18pt Arial';
              // ctx.fillStyle = 'white';          
              // ctx.fillText(finalQuote,imgXpos,img.height+80);
        
        }
}

function getLines (context, text, x, y, maxWidth, lineHeight){
  var words = text.split(' ');
  var line = '';
  var numLines = 1;
  context.textAlign = 'center';
  
  for(var m = 0; m < words.length; m++) {
    var testLine = line + words[m] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    //console.log(metrics);
    //console.log(testWidth + " " + maxWidth);
    if (testWidth > maxWidth && m > 0) {
      numLines += 1;
      line = words[m] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
    if(m == words.length-1){
      return numLines;
    }
  }
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {

  var words = text.split(' ');
  var line = '';
  //var numLines = 1;
  context.textAlign = 'center';
  //var canvas = document.getElementById('tutorial');
  
  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    //context.textAlign = 'center';
    if (testWidth > maxWidth && n > 0) {
      //numLines += 1;
      //console.log(numLines)
      //canvas.height = canvas.height + (50 * numLines);
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

function saveImage(){
  var canvas = document.getElementById('tutorial');
  
  var dataURL = canvas.toDataURL('image/jpeg');
//  canvas.setAttribute('crossOrigin', 'Anonymous');
  console.log(dataURL)
//  var image = new Image();
//  image.crossOrigin = "Anonymous";
// // image.setAttribute('crossOrigin', 'anonymous');
//  image.src = dataURL;
  
  $.ajax({
    type: "POST",
    url: "saveImage.php",
    data: { 
       imgBase64: dataURL
    }
  }).done(function(o) {
    console.log('saved'); 
    // If you want the file to be visible in the browser 
    // - please modify the callback in javascript. All you
    // need is to return the url to the file, you just saved 
    // and than put the image in your browser.
  });
}
$( document ).ready(function() {
//    console.log( "ready!" );
  $( "#getJuxta" ).click(function() {
    flickrRequest();
  });
  $( "#saveJuxta" ).click(function() {
    saveImage();
  });
});