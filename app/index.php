<?php

  function creditsLinks($credits) {
    $links = '';
    foreach ($credits as $name => $url) {
      $links .= '<a href="'.$url.'">'.$name.'</a> ';
    }
    return $links;
  }

  function specsLinks($links) {
    $html = '';
    $html .= '<ul>';
    foreach ($links as $text => $url) {
      $html .= '<li>';
      $html .= '<a href="'.$url.'">'.$text.'</a>';
      $html .= '</li>';
    }
    $html .= '</ul>';
    return $html;
  }

  // Use ugly urls for local dev
  $localhosts = array('localhost', 'cheat.dev');
  $uglyUrls = in_array($_SERVER['HTTP_HOST'], $localhosts);
  // Find out if ugly, but say if pretty, lifts the mood
  if ($uglyUrls == true) {
    $path = '/';
  } else {
    $path = 'http://apps.workflower.fi/css-cheats/';
  };

  $sets = json_decode(file_get_contents('rulesets/rulesets.json'),true);
  $github = 'https://github.com/sakamies/css-cheats';
  $appCredits = '<a href="http://twitter.com/sakamies">@sakamies</a> / <a href="http://twitter.com/workflower">@workflower</a>';
  $reportIssue = '<a href="'.$github.'/issues/new">Report an issue</a>';
  $createSet = '<a href="'.$github.'/fork">Create a cheatsheet</a>';

  // If there is no name given, output the index list and die
  $setName = filter_input(INPUT_GET, 'name', FILTER_SANITIZE_STRING);
  if(isset($setName) == false){
     include('list.php');
     exit();
  }

  // If a name is in the url, make sure it exists in sets.json
  // Should be safe to use setName
  $setExists = array_key_exists($setName, $sets);
  if ($setExists == false) {
    header('HTTP/1.0 404 Not Found');
    include('error.php');
    exit();
  } else {
    // Ok cool, we have a cheatsheet, time party
    //Read page title and stuff from sets.json according to bundle
    $set = $sets[$setName];
    $title = $set['title'];
    $credits = creditsLinks($set['credits']);
    $specs = specsLinks($set['specs']);
    $helpText = $set['help-text'];
    include('app.php');
  }

?>
