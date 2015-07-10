var key = '95b7c0c7ceb6f8c1383c57ebcc84bc01';
var searchTerm = 'poverty';
var numImages = 200;
var randomNum = Math.floor(Math.random() * (numImages-1));

var photoSearch_method = 'flickr.photos.search';
var getSizes_method = 'flickr.photos.getSizes';

var url = "https://api.flickr.com/services/rest/?method="+ photoSearch_method +"&api_key=" + key + "&tags="+ searchTerm + "&safe_search=1&per_page="+numImages;

var src;
$.getJSON(url + "&format=json&jsoncallback=?", function(data){
//$.getJSON(url, function(data){
  //console.log(data);
  //console.log(data.photos.photo[1]);
  var photo = data.photos.photo[randomNum];
  
  var sizeUrl = "https://api.flickr.com/services/rest/?method="+ getSizes_method +"&api_key=" + key + "&photo_id=" + photo.id;
  
  $.getJSON(sizeUrl + "&format=json&jsoncallback=?", function(data){
    console.log(data);
    
    if(data.sizes.size[8]){
      imgUrl = data.sizes.size[8].source;
      
        src = imgUrl;
        $("<img/>").attr("src", src).appendTo("#images");
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