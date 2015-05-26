function filmGrabRequest() {
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
                console.log(mainContent);
                
                //prints the length of the list of movies
                console.log(mainContent[0].children[1].children.length);
                moviesLength = mainContent[0].children[1].children.length;
                
                
                //console.log(mainContent[0].children[1].children.length);
                
                //go through each of the elements
                for(j=0; j < moviesLength; j++){
                    if(mainContent[0].children[1].children[j].nodeName == "P"){
                        //console.log(mainContent[0].children[1].children[j].nodeName);
                        var movieLink = mainContent[0].children[1].children[j].children[0].href;                        
                    }
                    
                    //and search for those with 2010 or 2011/01 in the date
                    if(movieLink.search("2010") > 0 || movieLink.search("2011/01") > 0){
                        console.log("#"+ j + " " + movieLink);
                    }
//                    console.log(j + " " + moviesLength);
                }
                testHref = mainContent[0].children[1].children[0].children[0].href;
                console.log(testHref);
                //console.log(mainContent[0].children[1].children[i].textContent);
                //console.log(mainContent[0].children[1].children[i].children[0].href);
            }
            parseTableHtml(response);
            
            for(var i=0; i < 1; i++){
                $.ajax({
                    url: 'proxy.php',
                    type: 'POST',
                    data: {
                        address: testHref
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
                        }
                        parseHtml(response);
                    }
                });
            }
            
            
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