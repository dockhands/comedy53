
<?php require_once('header.php'); ?>

<script src="scripts/familyBieber.js" type="text/javascript"></script>

<section class="wrapper">
  <h2>FamilyBieber</h2>
  <FORM name="caller" method="POST" action="">
      <p>

      <INPUT type="BUTTON" value="Grab Random Movie Still + Lyrics"
    ONCLICK="fcRequest()">
      </p>

  </FORM>

  <!--<div id="displayed"></div>-->
  <div id="errorMsg"></div>

  <canvas id="tutorial" width="1024" height="1728"></canvas>

  <!-- exp with Twitter -->
  <div class="tweets-container">
              <p>Loading...</p>
  </div>
</section>

<?php require_once('footer.php'); ?>


