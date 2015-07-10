
var imgs=[];
var imgCount=0;

function imgRequest() {
    console.log('image request start');
    $.ajax({
        url: 'proxy.php',
        type: 'POST',
        data: {
            address: 'http://www.googleimageripper.com/#!/?search=true&key=success&page_start=1&safemode=on&tbs=any&silu=yes&autoremove_not_found=yes'
        },
        success: function(response) {
            function parseTableHtml(s) { // s is string
                
              //the div contains the entire response from the request
              var page = document.createElement('div');
              page.innerHTML = s;
              console.log(page);
              //mainContent will be the dom structure containing elements from the main post
              //var mainContent = document.createElement('div');
                
              //comicPane = comic.getElementsByTagName('LI');
              
//              for(var i = 0; i < comicPane.length; i++){
//                if(comicPane[i].id == 'comicpanel'){
//                  comicPanel = comicPane[i];
//                }
//              }
              
              //comicPanel.getElementsByTagName('img');
//              console.log(comicPanel.getElementsByTagName('img'));
//              comicImg = comicPanel.getElementsByTagName('img');
//              imgSource = comicImg[0].src;
//              draw(imgSource);
              //console.log(comicImg[0].src);
                
            }
            parseTableHtml(response);
        }
    });
            //}
            
}

$( document ).ready(function() {
    console.log( "ready!" );
    
    setTimeout(function(){
    
      var searchBtn = document.getElementsByClassName('gsc-search-button gsc-search-button-v2');
      //var searchBtn2 = document.getElementsByClassName('gsc-search-button');
      console.log( searchBtn );
      
      searchBtn2.onclick = function() { alert("moot!"); };
      
//      searchBtn.click(function() {
//        console.log( "clicked search!" );
//      });
      $('.gsc-search-button gsc-search-button-v2').click(function() {
        console.log( "clicked search!" );
      });
      console.log( "timeout!" );
    }, 500);
});

//function draw(imgSrc){
//   
//        var canvas = document.getElementById('tutorial');
//        if (canvas.getContext){
//            var ctx = canvas.getContext('2d');
//
//            var img = new Image();
//            img.onload = function(){  
//              canvas.height = img.naturalHeight;
//              ctx.drawImage(img,0,0);
//            };
//            img.src = imgSrc;
//            imgs.push(img);
//        
//        }
//}