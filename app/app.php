<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Flexbox Cheatsheet</title>
  <link rel="stylesheet" href="assets/css/yogert.css">
</head>
<body>

<!--
  TODO:
  - generoi koodi php:llä JSON filestä
  - joku sample alue joka on samoilla tyyleillä kun esimerkkikuvat
  - tähän vois tehdä sisäkkäisten elementtien säätämisenkin että vois näppärästi väsätä leiskoja, mutta se menee aika advancediks, mutta ideana myöhemmälle
-->

<!--
  - nuolinäppäimillä valkata haluamansa version kustakin propertystä
    -  ylös/alas vaihtaa pylpyrän paikkaa declarationien kesken, vasen/oikee valkkaa onko declaration vai value valittuna
  - klikkaamalla propertyä koko declaration valitaan ja se saa pylpyrän
  - klikkaamalla valuee value valitaan ja declaration saa pylpyrän
  - klikkaamalla selektoria valitaan kaikki declarationit jonka vieressä pylpyrä
  - cmd/ctrl+a ei valkkaa koko dokumentin tekstiä, vaan pelkästään kaikki rulet ja niiden declarationit joilla on pylpyrä
  - tabilla voi hyppiä row-grouppien välillä, focus menee aina seuraavan row-groupin pylpyrällä varustettuun declarationiin
-->

  <div class="layout rules">
    <div class="header">
      <h1>
        Flexbox cheatsheet
      </h1>
      <h2>
        by <a href="http://twitter.com/sakamies">@sakamies</a>
      </h2>
      <div class="help">
        <p>
          Click a property or value to select its text. Makes it really fast to copy declarations.
        </p>
        <p>
          The <span title="red dot" class="marker">●</span> means you selected something.
          <br>
          Click a <span class="selector">selector</span> to copy the whole rule set with your selections.
        </p>
        <p>
          Use tab, &uarr;&darr;&larr;&rarr; keys and copy/paste for quick keyboard action.
        </p>
      </div>
      <h3>
        <a href="http://apps.workflower.fi/css-cheats">CSS Cheats</a>
        by <a href="http://twitter.com/workflower">@workflower</a>
      </h3>
    </div>
    <?php
      $setFile = 'rulesets/'.$setName.'.cheats/'.$setName.'.json';
      $setJSON = json_decode(file_get_contents($setFile),true);
    ?>
    <?php foreach ($setJSON['rules'] as $rule): ?>
      <div class="rule">
        <span class="selector"><?php echo $rule['selector'] ?></span> {
        <?php foreach ($rule['declarations'] as $rowGroup): ?>
          <div class="row-group">
            <?php foreach ($rowGroup as $declaration): ?>
              <?php foreach ($declaration as $property => $value): ?>
                  <div id="<?php echo $property.'_'.$value; ?>" class="declaration">
                    <span class="marker"></span>
                    <span class="property"><?php echo $property; ?></span>:
                    <span class="value"><?php echo $value; ?></span>;
                    <?php readfile('rulesets/'.$setName.'.cheats/fx-img/'.$property.'_'.$value.'.svg'); ?>
                  </div>
              <?php endforeach ?>
            <?php endforeach ?>
          </div>
        <?php endforeach ?>
        }
        <textarea class="copyboard"></textarea>
      </div>
    <?php endforeach ?>
  </div>

  <div class="overlay"></div>

  <script src="assets/js/string.js"></script>
  <script src="assets/js/jquery-2.1.1.min.js"></script>
  <script src="assets/js/jquery.hotkeys.js"></script>
  <script src="assets/js/yogert.js"></script>

</body>
</html>
