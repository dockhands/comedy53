<?php require_once('header.php'); ?>

<script src="scripts/request.js" type="text/javascript"></script>

<section class="wrapper">
  <h2>MovieLyrics</h2>
  <p>Goes to filmgrab.com, randomly selects a movie and fetches three movie stills. Finds song lyrics matching the stills, giving both a new meaning.</p>
  <FORM name="caller" method="POST" action="">
      <p>

      <INPUT type="BUTTON" value="Grab Random Movie Still + Lyrics"
    ONCLICK="filmGrabRequest()">
      </p>

  </FORM>

  <!--<div id="displayed"></div>-->
  <div id="errorMsg"></div>
  <img id="loading" src="img/loading.gif">
  <canvas id="tutorial" width="1024" height="1728"></canvas>

</section>

<?php require_once('footer.php'); ?>