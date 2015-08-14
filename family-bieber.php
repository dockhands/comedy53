
<?php require_once('header.php'); ?>

<script src="scripts/familyBieber.js" type="text/javascript"></script>

<section class="wrapper">
  <h2>familyTweets</h2>
  <p>Combines a random Family Circus comic with a recent Celebrity Tweet.</p>

  <div class="btn" id="getToday">today</div>
  <select id="celebSelect">
    <option value="random">Random Celeb</option>
    <option value="justinbieber">@justinbieber</option>
    <option value="drake">@drake</option>
    <option value="kimkardashian">@kimkardashian</option>
    <option value="MileyCyrus">@MileyCyrus</option>
    <option value="thegarybusey">@thegarybusey</option>
    <option value="lindsaylohan">@lindsaylohan</option>
    <option value="charliesheen">@charliesheen</option>
    <option value="thecampaignbook">@thecampaignbook</option>
    <option value="kanyewest">@kanyewest</option>
    <option value="officialjaden">@officialjaden</option>
    <option value="cher">@cher</option>    
  </select>
  <div class="btn" id="getBieber">bieber</div>
  <div class="btn" id="getSmith">smith</div>
  <div class="btn" id="getKardashian">kardashian</div>
  
  <div class="btn" id="getRandom">Random</div>
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


