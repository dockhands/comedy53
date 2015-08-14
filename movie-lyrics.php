<?php require_once('header.php'); ?>

<script src="scripts/request.js" type="text/javascript"></script>

<section class="wrapper">
  <h2>hystLyrical</h2>
  <p>Goes to filmgrab.com, randomly selects a movie and fetches three movie stills. Finds song lyrics matching the stills, giving both a new meaning.</p>
<!--  <FORM name="caller" method="POST" action="">-->
    <div class="btn" id="getHystLyrics">New Comic</div>
<!--
    <button class="btn" id="getJuxta">New Comic</button>
      <p>
        
      <INPUT class="btn" type="BUTTON" value="New Comic"
    ONCLICK="filmGrabRequest()">
      </p>
-->

<!--  </FORM>-->

  <!--<div id="displayed"></div>-->
  <div id="errorMsg"></div>
  <img id="loading" src="img/loading.gif">
  <canvas id="tutorial" class="hystLyrical" width="1024" height="1728"></canvas>

</section>

<?php require_once('footer.php'); ?>