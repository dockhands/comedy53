
<?php require_once('header.php'); ?>

<script src="scripts/familyBieber.js" type="text/javascript"></script>

<section class="wrapper">
  <h2>FamilyBieber</h2>
  <p>Combines a random Family Circus comic with a recent Justin Bieber quote.</p>
  <FORM name="caller" method="POST" action="">
      <p>

      <INPUT type="BUTTON" value="New FamilyBieber"
    ONCLICK="fcRequest()">
      </p>

  </FORM>

  <!--<div id="displayed"></div>-->
  <div id="errorMsg"></div>
  <img id="loading" src="img/loading.gif">
  <canvas id="tutorial" width="1024" height="1728"></canvas>

  <!-- exp with Twitter -->
  <div class="tweets-container">
              <p>Loading...</p>
  </div>
</section>

<?php require_once('footer.php'); ?>


