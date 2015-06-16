//document.domain = 'http://film-grab.com/movies-a-z/';
// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  var url = 'http://updates.html5rocks.com';
    
    var movieURL = 'http://film-grab.com/movies-a-z/';
  var xhr = createCORSRequest('GET', movieURL);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function(e) {
    alert('Woops, there was an error making the request.');
      console.log(e);
       console.log(this.responseText);
  };

  xhr.send();
    
}
//// Make the actual CORS request.
//function openPage() {
//    var xmlhttp = new XMLHttpRequest();
//    var pageURL = 'request.js';
//    xmlhttp.open("GET", pageURL,true);
//    xmlhttp.send();
//    xmlhttp.onload = function() {
//        var text = xmlhttp.responseText;
//        //console.log(text);
//        if ((xmlhttp.status == 200) && (xmlhttp.readyState == 4))
//        {
//            eval(xmlhttp.responseText);
//        }
//    }
//    
//}