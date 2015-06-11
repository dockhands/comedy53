
var imgs=[];
var imgCount=0;

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

function draw(imgSrc){
   
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext){
            var ctx = canvas.getContext('2d');

            var img = new Image();
            img.onload = function(){  
              canvas.height = img.naturalHeight;
              ctx.drawImage(img,0,0);
            };
            img.src = imgSrc;
            imgs.push(img);
        
        }
       
        
  //  }
}