function flickrRequest() {

var key = '95b7c0c7ceb6f8c1383c57ebcc84bc01';
var searchTerm = 'poverty';
var numImages = 500;
var randomNum = Math.floor(Math.random() * (numImages-1));

var photoSearch_method = 'flickr.photos.search';
var getSizes_method = 'flickr.photos.getSizes';

var url = "https://api.flickr.com/services/rest/?method="+ photoSearch_method +"&api_key=" + key + "&tags="+ searchTerm + "&safe_search=1&per_page="+numImages;

var src;
$.getJSON(url + "&format=json&jsoncallback=?", function(data){
//$.getJSON(url, function(data){
  
  //console.log(data.photos.photo[1]);
  var photo = data.photos.photo[randomNum];
//  console.log('Here is the photo:');
//  console.log(data);
  var sizeUrl = "https://api.flickr.com/services/rest/?method="+ getSizes_method +"&api_key=" + key + "&photo_id=" + photo.id;
  //console.log(sizeUrl);
  $.getJSON(sizeUrl + "&format=json&jsoncallback=?", function(data){
    //console.log(data);
    
    if(data.sizes.size[8]){
      imgUrl = data.sizes.size[8].source;
      console.log("This is the final image" + imgUrl);
      
        //src = imgUrl;
       // $("<img/>").attr("src", src).appendTo("#images");
        

         var finalPhoto =  imgUrl;
        //console.log("This is the final image" + finalPhoto);
        //draw(finalPhoto)
        getQuotes(finalPhoto);
        //if ( i == 10 ) return false;
    } else {
      console.log('No large image size!')
    }
  });
  
  //src = "http://farm"+ photo.farm +".static.flickr.com/"+ photo.server +"/"+ photo.id +"_"+ photo.secret +".jpg";
  //$("<img/>").attr("src", src).appendTo("#images"); 
  
//    $.each(data.photos.photo, function(i,item){
//        src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
//        $("<img/>").attr("src", src).appendTo("#images");
//        if ( i == 10 ) return false;
//    });
});

}



 


function getQuotes(finalPhoto) { 

  var pageNumber = 27;
  var quoteNumber = 20;
  var pageNumberRandom = Math.floor(Math.random() * (pageNumber-1));
  var quoteRandom = Math.floor(Math.random() * (quoteNumber-1));
 
 $.ajax({
        url: 'proxy.php',
        type: 'POST',
        data: {
            //address: testHref
            address:  "http://www.movemequotes.com/tag/success/page/" +pageNumberRandom     
          },
        success: function(response) {  

          function parseQuotes(s) { // s is string
                
//                    console.log("response");
//                    console.log(response);
                    var quotePage = document.createElement('div');
                    quotePage.innerHTML = s;

                    var quotes = document.createElement('div');

                    var quotesArray = [];
                    quotes = quotePage.getElementsByTagName('P');
                    
                    //console.log(quotes);
                    //console.log("This is the first set of quotes: "+ quotes[quoteRandom].innerHTML);
                    var testQuote = quotes[quoteRandom].innerHTML; 
                    var finalQuote = testQuote.toString();
                   // String(finalQuote);
                    //console.log("This is the final quote: "+ finalQuote);

                   // finaleQuote.push(obj.text)
                   console.log("test4");
                    draw(finalPhoto, finalQuote);
                   // return finalQuote;
              
                    // if(quotes.length == 6){
                    //     console.log(j + "SORRY, NO LYRICS FOUND FOR " + tagArray[index] + ". PLEASE TRY AGAIN");
                    //     //console.log(tagArray);
                    //     //getLyrics(tagArray, linkArray, index+1);
                    //     //return;
                    //     var eMsg = document.getElementById("errorMsg");
                    //     eMsg.innerHTML = "Could not find lyrics, please try again.";
                       
                      
                    // }
                    //console.log(" HAS " + quotes.length + " SETS OF Quotes");


                    // USE LATER 
                    // for(i=6; i < quotes.length; i++){
                    //     //console.log(lyrics[i].attributes[0]);
                    //     if(quotes[i].innerText !== ''){
                    //         //console.log(lyrics[i].innerText);
                    //         quotesArray.push(quotes[i].innerText);
                    //         //console.log(splitLyrics(lyrics[i].innerText));

                    //         if(splitQuotes(quotes[i].innerText)){
                    //             //console.log("INNER TEXT:" + splitLyrics(lyrics[i].innerText));
                    //             quoteSet = splitQuotes(quotes[i].innerText);
                                
                    //             for(u = 0; u < linkArray.length; u++){
                    //                 //console.log(lyricSet);
                    //                //console.log(linkArray);
                    //                 //draw(lyricSet, linkArray, u);
                    //             }                                
                    //             return;
                    //         }
                    //         //return splitLyrics(lyrics[i].innerText);
                    //     }

                    // }
//                    if(lyricSet.length > 0){
//                        console.log(lyricSet + " " + index);
//                        return;
//                    }
                    //console.log(lyricPage.getElementsByTagName('P'));
                
                   
            }
        parseQuotes(response);
         // draw(finalQuote);
          }

        })
  }


function draw(imgSrc, finalQuote ){
        console.log("this is the final quote again, in draw: " + finalQuote);
        var textQuote = finalQuote; 
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext){
            var ctx = canvas.getContext('2d');
            console.log("test3");
            var img = new Image();
            img.onload = function(){  

              var extraCanvasWidth = 100;
              var extraCanvasHeight = 400;
              canvas.width = img.naturalWidth+extraCanvasWidth;
              canvas.height = img.naturalHeight+extraCanvasHeight;
              ctx.fillStyle = 'black';
              var bufferWidth = 60;
              var bufferHeight = 240;
              ctx.fillRect(0,0,img.width+bufferWidth,img.height+bufferHeight);

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
              

            };
            console.log("test1");
            img.src = imgSrc;
            console.log("test2");
            //imgs.push(img);

              // ctx.font = 'bold 18pt Arial';
              // ctx.fillStyle = 'white';          
              // ctx.fillText("Hello World",imgXpos,img.height+120);

              // ctx.font = 'bold 18pt Arial';
              // ctx.fillStyle = 'white';          
              // ctx.fillText(finalQuote,imgXpos,img.height+80);
        
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

  //  }
}