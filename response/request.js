
var imgs=[];
var imgCount=0;

function filmGrabRequest() {
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
                        //console.log("#"+ j + " " + movieLink);
                        movieList.push(movieLink);
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
                            console.log(imgGallery);
                            
                            //var numberArray = numberGenerator(imgGallery.length);
                            var numberArray = numberGenerator(10);
//                            var num1 = Math.floor(Math.random() * (imgGallery.length));
//                            var num2 = Math.floor(Math.random() * (imgGallery.length));
//                            var num3 = Math.floor(Math.random() * (imgGallery.length));
//                            
//                            var numberArray = [num1, num2, num3];
//                            //numberArray.sort();
//                            numberArray.sort(function(a,b) { return a - b; });
//                            console.log(numberArray);
                            
                            //var randomNumber = Math.floor(Math.random() * (imgGallery.length));
                            
                            for(x = 0; x < numberArray.length; x++){
                                var num = numberArray[x];
                                var imgLink = imgGallery[num].attributes[6].nodeValue;
                                //console.log(x + " " + imgLink);

                                var imageHolder = document.getElementById('displayed');
                                //imageHolder.innerHTML += "<img src='" + imgLink + "'>";
                                var dashPos = imgLink.search("-");
                                var pngPos = imgLink.search(".png");
                                var imgTag = imgLink.slice(dashPos+1, pngPos);
                                
                                
                                if(x == 0){

                                }
                                
                                draw(imgLink, x);
                                


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

function getLyrics(imgTag){
    console.log(imgTag);
    $.ajax({
        url: 'proxy.php',
        type: 'POST',
        data: {
            //address: testHref
            address: randomMovie
        },
        success: function(response) {
            function parseLryics(s) { // s is string

            }
        parseLryics(response);
        }
    });
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
    console.log(numberArray);
    return numberArray;
}

function draw(imgPath, index){
    var canvas = document.getElementById('tutorial');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        
        var img = new Image();
        img.onload = function(){            
            imgCount++;
            if(index == 0){
                height1 = img.naturalHeight;
            } else { 
                if (index == 1) {
                height2 = img.naturalHeight;
                }
            }
            if (imgCount == 3){
                console.log("FINAL IMAGES: " + imgs + " " + height1 + " " + height2);
                
                for(y = 0; y < imgCount; y++){
                    if(y == 0){
                        ctx.drawImage(imgs[y],0,0); 
                    }
                    if (y == 1) {
                        ctx.drawImage(imgs[y],0,height1);                    
                    }
                    if (y == 2) {
                        ctx.drawImage(imgs[y],0,height1+height2);
                    }
                }
                    
                
            }
            
            console.log(index + " " + img.naturalHeight);
        };
        img.src = imgPath;
        imgs.push(img);
        //console.log(imgs);
        

//    var canvas = document.getElementById('tutorial');
//    if (canvas.getContext){
//        var ctx = canvas.getContext('2d');
////        ctx.fillStyle = "rgb(200,0,0)";
////        ctx.fillRect (10, 10, 55, 50);
////
////        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
////        ctx.fillRect (30, 30, 55, 50);
//        
//        var img = new Image();   // Create new img element
//        img.addEventListener("load", function() {
//          // execute drawImage statements here
//        }, false);
//        img.src = imgPath; // Set source path
//        ctx.drawImage(img,0,0);
//        console.log(imgPath);
    }
}