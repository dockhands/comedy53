
var imgs=[];
var imgCount=0;

function filmGrabRequest() {
    var eMsg = document.getElementById("errorMsg");
    eMsg.innerHTML = "";
    var canvas = document.getElementById('tutorial');
    var ctx = canvas.getContext('2d');
    imgs=[];
    imgCount = 0;
    if(canvas.getContext){
        ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
    }
    $.ajax({
        url: 'proxy.php',
        type: 'POST',
        data: {
            address: 'http://film-grab.com/movies-a-z/'
        },
        success: function(response) {
            function parseTableHtml(s) { // s is string
                
                //the div contains the entire response from the request
                var div = document.createElement('div');
                div.innerHTML = s;
                
                //mainContent will be the dom structure containing elements from the main post
                var mainContent = document.createElement('div');
                mainContent = div.getElementsByClassName('post-889');
                
                //logs the dom structure to console
                //console.log(mainContent);
                
                //prints the length of the list of movies
                //console.log(mainContent[0].children[1].children.length);
                moviesLength = mainContent[0].children[1].children.length;
                
                
                //console.log(mainContent[0].children[1].children.length);
                
                //empty array for containing the movie hrefs
                movieList = [];
                
                //go through each of the elements
                for(j=0; j < moviesLength; j++){
                    if(mainContent[0].children[1].children[j].nodeName == "P"){
                        //console.log(mainContent[0].children[1].children[j].nodeName);
                        movieLink = mainContent[0].children[1].children[j].children[0].href;                        
                    }
                    
                    //and search for those with 2010 or 2011/01 in the date
                    if(movieLink.search("2010") > 0 || movieLink.search("2011/01") > 0){
                        if(movieLink.search("translation") > 0 || movieLink.search("pauline") > 0 || movieLink.search("milk") > 0 || movieLink.search("carrie") > 0 || movieLink.search("brazil") > 0 || movieLink.search("king-of-comedy") > 0 || movieLink.search("nosferatu") > 0 || movieLink.search("this-is-england") > 0 || movieLink.search("hardcore") > 0 || movieLink.search("dont-look") > 0 || movieLink.search("breathless") > 0 || movieLink.search("the-fly") > 0 || movieLink.search("temptation") > 0 || movieLink.search("rosemarys") > 0 || movieLink.search("adventureland") > 0 || movieLink.search("five-easy-pieces") > 0 || movieLink.search("buffalo") > 0 || movieLink.search("aguirre") > 0 || movieLink.search("hired-hand") > 0 || movieLink.search("wendy-and") > 0 || movieLink.search("brick") > 0 || movieLink.search("indian-runner") > 0 || movieLink.search("eternal-sunshine") > 0 || movieLink.search("woyzeck") > 0 || movieLink.search("easy-rider") > 0 ){
                            
                        } else {
                            movieList.push(movieLink);
                        }
                        
                        //console.log("#"+ j + " " + movieLink);
                        
                    }
//                    console.log(j + " " + moviesLength);
                }
                testHref = mainContent[0].children[1].children[0].children[0].href;
                //console.log(testHref);
                //console.log(mainContent[0].children[1].children[i].textContent);
                //console.log(mainContent[0].children[1].children[i].children[0].href);
            }
            parseTableHtml(response);
            var randomMovieNum = Math.floor(Math.random() * (movieList.length-1));
            var randomMovie = movieList[randomMovieNum];
            console.log(randomMovie);
//            for(var i=0; i < movieList.length; i++){
//                console.log(movieList[i]);
//            }
            
                $.ajax({
                    url: 'proxy.php',
                    type: 'POST',
                    data: {
                        //address: testHref
                        address: randomMovie
                    },
                    success: function(response) {
                        function parseHtml(s) { // s is string
                            //the div contains the entire response from the request
                            var moviePage = document.createElement('div');
                            moviePage.innerHTML = s;

                            //mainContent will be the dom structure containing elements from the main post
                            var imgGallery = document.createElement('div');
                            imgGallery = moviePage.getElementsByClassName('attachment-thumbnail');

                            //logs the dom structure to console
                            //console.log(imgGallery);
                            
                            //generate an array of 3 numbers from 1-imgGallery.length
                            var numberArray = numberGenerator(imgGallery.length);
                            
                            var linkArray = [];
                            var tagArray = [];
                            lyrics = [];
                            
                            for(x = 0; x < numberArray.length; x++){
                                var num = numberArray[x];
                                var imgLink = imgGallery[num].attributes[6].nodeValue;
                                

                                var imageHolder = document.getElementById('displayed');
                                //imageHolder.innerHTML += "<img src='" + imgLink + "'>";
                                var dashPos = imgLink.search("-");
                                var pngPos = imgLink.search(".png");
                                var imgTag = imgLink.slice(dashPos+1, pngPos);
                                
                                console.log("Img tag: " + imgTag);
                                //if(getLyrics(imgTag)){
                                //    console.log
                                //}
                                linkArray.push(imgLink);
                                tagArray.push(imgTag);
                                if(x == 2){
                                    //for(y = 0; y < tagArray.length; y++){
                                        //lyrics = getLyrics(tagArray[y]);
                                        
                                        
                                    //}
                                    getLyrics(tagArray, linkArray, 0);
                                }
                                //draw(imgLink, x);
                                


                            }
                        }
                        parseHtml(response);
                    }
                });
            //}
            
            
    //        $.ajax({
    //            url: 'proxy.php',
    //            type: 'POST',
    //            data: {
    //                address: 'http://film-grab.com/movies-a-z/'
    //            },
    //            success: function(response) {
            
    //            }
    //        });
            // response now contains full HTML of google.com
            //var test = response.getElementById('post-889');
    //        var el1 = document.createElement(response);
    //        console.log(el1);
    //        var div = document.createElement('div');
    //        div.innerHTML = response;
    //        var elements = div.childNodes;
    //        console.log(div.innerHTML);
    //        var postElement = div.getElementById('post-889');
    //        console.log(postElement);
        }
    });
}

function getLyrics(tagArray, linkArray, index){
    //console.log(imgTag);
    lyricSet = [];
    if(index > 2){
        console.log("COULD NOT FIND LYRICS");
        return;
    }
    $.ajax({
        url: 'proxy.php',
        type: 'POST',
        data: {
            //address: testHref
            address: "http://www.lyricfind.com/services/lyrics-search/try-our-search/?q=" + tagArray[index] + "+" + tagArray[index+1] + "+" + tagArray[index+2]
        },
        success: function(response) {            
            
                
                
            
            function parseLryics(s, tagArray) { // s is string
                
//                    console.log("response");
//                    console.log(response);
                    var lyricPage = document.createElement('div');
                    lyricPage.innerHTML = s;

                    var lyrics = document.createElement('div');

                    var lyricsArray = [];
                    lyrics = lyricPage.getElementsByTagName('P');
                    
              
                    console.log(lyrics);
                    if(lyrics.length == 6){
                        console.log(j + "SORRY, NO LYRICS FOUND FOR " + tagArray[index] + ". PLEASE TRY AGAIN");
                        //console.log(tagArray);
                        //getLyrics(tagArray, linkArray, index+1);
                        //return;
                        var eMsg = document.getElementById("errorMsg");
                        eMsg.innerHTML = "Could not find lyrics, please try again.";
                        filmGrabRequest();
                      
                    }
                    console.log(tagArray[index] + " HAS " + lyrics.length + " SETS OF LYRICS");
                    for(i=6; i < lyrics.length; i++){
                        //console.log(lyrics[i].attributes[0]);
                        if(lyrics[i].innerText !== ''){
                            //console.log(lyrics[i].innerText);
                            lyricsArray.push(lyrics[i].innerText);
                            //console.log(splitLyrics(lyrics[i].innerText));

                            if(splitLyrics(lyrics[i].innerText)){
                                //console.log("INNER TEXT:" + splitLyrics(lyrics[i].innerText));
                                lyricSet = splitLyrics(lyrics[i].innerText);
                                
                                for(u = 0; u < linkArray.length; u++){
                                    //console.log(lyricSet);
                                   //console.log(linkArray);
                                    draw(lyricSet, linkArray, u);
                                }                                
                                return;
                            }
                            //return splitLyrics(lyrics[i].innerText);
                        }

                    }
//                    if(lyricSet.length > 0){
//                        console.log(lyricSet + " " + index);
//                        return;
//                    }
                    //console.log(lyricPage.getElementsByTagName('P'));
                
                   
            }
        parseLryics(response, tagArray);
        }
    });

//    if(lyricSet){
//        console.log("LYRIC SET:");
//        console.log(lyricSet);
//    } else {
//        console.log("NO LYRIC SET");
//    }
}

function splitLyrics(fullLyrics){
    var splitArray = fullLyrics.split('/');
    if(splitArray.length == 4 || splitArray.length == 5){
        var lyric0 = splitArray[0] + "... " + splitArray[1];
        var lyric1 = splitArray[2];
        var lyric2 = splitArray[3];
        lyricOutput = [lyric0, lyric1, lyric2];
        return lyricOutput;
    } else {
        return null;
    }
    //console.log(splitArray.length);
}

//this function takes care of generating the random numbers for us
function numberGenerator(galleryLength){
    var num1 = Math.floor(Math.random() * (galleryLength));
    var num2 = Math.floor(Math.random() * (galleryLength));
    var num3 = Math.floor(Math.random() * (galleryLength));

    var numberArray = [num1, num2, num3];
    //numberArray.sort();
    numberArray.sort(function(a,b) { return a - b; });
    
    for(i=0; i < numberArray.length; i++){
        if(numberArray[i] == numberArray[i+1]){
            //if it detects a duplicate, return the same function (recursive)
            console.log('!!!!!! DUPE !!!!!!!' + numberArray);
            return numberGenerator(galleryLength);
        }
    }
    //console.log(numberArray);
    return numberArray;
}

function draw(lyricsArray, imgArray, index){
    console.log("DRAWING " + imgArray[index] + " IMAGES, INDEX = " + index);
    //for(index = 0; index < imgArray.length; index++){
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext){
            var ctx = canvas.getContext('2d');

            var img = new Image();
            img.onload = function(){            
                imgCount++;
                if(index == 0){
                    height1 = img.naturalHeight;
                    imgWidth = img.naturalWidth;
                } else { 
                    if (index == 1) {
                    height2 = img.naturalHeight;
                    } else {
                        if (index == 2) {
                            height3 = img.naturalHeight;
                        }
                    }
                }
                if (imgCount == 3){
                    canvas.height = height1+height2+height3;
                    console.log("FINAL IMAGES: " + imgs + " " + height1 + " " + height2);

                    for(y = 0; y < imgCount; y++){
                        ctx.font = "44px Arial";
                        ctx.fillStyle = "white";
                        ctx.textAlign="center"; 
                        ctx.strokeStyle = "black";
                        ctx.shadowColor = "rgba(0,0,0,1)";
                        ctx.shadowOffsetX = 2;
                        ctx.shadowOffsetY = 2;
                        ctx.shadowBlur = 2;
                        
                        if(y == 0){
                            ctx.drawImage(imgs[y],0,0);                            
                            ctx.fillText(lyricsArray[0],imgWidth/2,height1-30,imgWidth*.9);
                            //ctx.strokeText(lyricsArray[0],imgWidth/2,height1-30,800);
                        } else {
                            
                            if (y == 1) {
                                ctx.drawImage(imgs[y],0,height1);
                                ctx.fillText(lyricsArray[1],imgWidth/2,height1+height2-30,imgWidth*.9);
                               // ctx.strokeText(lyricsArray[1],imgWidth/2,height1+height2-30,800);
                            } else {
                                if (y == 2) {
                                    ctx.drawImage(imgs[y],0,height1+height2);
                                    console.log("Last Lyric: " + lyricsArray[2]);
                                    ctx.fillText(lyricsArray[2],imgWidth/2,height1+height2+height3-30,imgWidth*.9);
                                    
                                  //  ctx.strokeText(lyricsArray[2],imgWidth/2,height1+height2+height3-30,800);
                                }                            
                            }
                        }
                    }


                }
                console.log(index + " " + img.naturalHeight);
            };
            img.src = imgArray[index];
            imgs.push(img);
        
        }
       
        
  //  }
}

//function draw(imgPath, index){
//    var canvas = document.getElementById('tutorial');
//    if (canvas.getContext){
//        var ctx = canvas.getContext('2d');
//        
//        var img = new Image();
//        img.onload = function(){            
//            imgCount++;
//            if(index == 0){
//                height1 = img.naturalHeight;
//            } else { 
//                if (index == 1) {
//                height2 = img.naturalHeight;
//                }
//            }
//            if (imgCount == 3){
//                console.log("FINAL IMAGES: " + imgs + " " + height1 + " " + height2);
//                
//                for(y = 0; y < imgCount; y++){
//                    if(y == 0){
//                        ctx.drawImage(imgs[y],0,0); 
//                    }
//                    if (y == 1) {
//                        ctx.drawImage(imgs[y],0,height1);                    
//                    }
//                    if (y == 2) {
//                        ctx.drawImage(imgs[y],0,height1+height2);
//                    }
//                }
//                    
//                
//            }
//            
//            console.log(index + " " + img.naturalHeight);
//        };
//        img.src = imgPath;
//        imgs.push(img);
//        //console.log(imgs);
//        
//
////    var canvas = document.getElementById('tutorial');
////    if (canvas.getContext){
////        var ctx = canvas.getContext('2d');
//////        ctx.fillStyle = "rgb(200,0,0)";
//////        ctx.fillRect (10, 10, 55, 50);
//////
//////        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
//////        ctx.fillRect (30, 30, 55, 50);
////        
////        var img = new Image();   // Create new img element
////        img.addEventListener("load", function() {
////          // execute drawImage statements here
////        }, false);
////        img.src = imgPath; // Set source path
////        ctx.drawImage(img,0,0);
////        console.log(imgPath);
//    }
//}