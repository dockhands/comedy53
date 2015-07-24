<?php require_once('header.php'); ?>

<script src="scripts/request.js" type="text/javascript"></script>

<section class="wrapper">
  <p>Goes to filmgrab.com and gets a set of random images</p>
  <FORM name="caller" method="POST" action="">
      <p>

      <INPUT type="BUTTON" value="Grab Random Movie Still + Lyrics"
    ONCLICK="filmGrabRequest()">
      </p>

  </FORM>

  <!--<div id="displayed"></div>-->
  <div id="errorMsg"></div>
  <canvas id="tutorial" width="1024" height="1728"></canvas>

</section>

<?php require_once('footer.php'); ?>