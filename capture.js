var page = require('webpage').create();
page.open('http://github.com/', function() {
  page.render('github.png');
//    SaveToDisk("https://filmgrab.files.wordpress.com/2015/01/1423.jpg", "TestImage.jpg");
  phantom.exit();
});

//function SaveToDisk(fileURL, fileName) {
//    // for non-IE
//    if (!window.ActiveXObject) {
//        var save = document.createElement('a');
//        save.href = fileURL;
//        save.target = '_blank';
//        save.download = fileName || 'unknown';
//
//        var event = document.createEvent('Event');
//        event.initEvent('click', true, true);
//        save.dispatchEvent(event);
//        (window.URL || window.webkitURL).revokeObjectURL(save.href);
//    }
//
//    // for IE
//    else if ( !! window.ActiveXObject && document.execCommand)     {
//        var _window = window.open(fileURL, '_blank');
//        _window.document.close();
//        _window.document.execCommand('SaveAs', true, fileName || fileURL)
//        _window.close();
//    }
//}