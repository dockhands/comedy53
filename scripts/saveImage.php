<?php
  //$file = base64_decode($_REQUEST['data']);
  //$file = base64_decode($_POST['imgBase64']);
  $data = $_POST['imgBase64'];
  //echo($file);
  //file_put_contents('archive/'. 'test3.jpg', base64_decode($file);
  
  list($type, $data) = explode(';', $data);
  list(, $data)      = explode(',', $data);
  $file = base64_decode($data);
  
  $success = file_put_contents('../archive/'. 'test4.jpg', $file);
  //file_put_contents('archive/'. 'test.txt', $file);  
?>