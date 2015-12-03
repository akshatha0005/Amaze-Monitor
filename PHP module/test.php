<?php
session_start();

echo $_POST['time'];
$_SESSION['time'] = $_POST['time'];
if(!empty($_POST['check_list'])) {

if (!isset($_SESSION['check_list'])) {
  $_SESSION['check_list'] = $_POST['check_list'];
}
    foreach($_SESSION['check_list'] as $check) {
            echo $check; //echoes the value set in the HTML form for each checked checkbox.
                         //so, if I were to check 1, 3, and 5 it would echo value 1, value 3, value 5.
                         //in your case, it would echo whatever $row['Report ID'] is equivalent to.
    }
}
?>

<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="high_chart.css" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Highcharts</title>
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
  <script type="text/javascript" src="kalp.js"></script>
  <script src="http://code.highcharts.com/highcharts.js"></script>
  <script src="http://code.highcharts.com/modules/exporting.js"></script>
</head>
<body>

  <div id="container1" class="container" style="min-width: 600px; height: 400px; margin: 0 auto"></div>
  <div id="container2" class="container" style="min-width: 600px; height: 400px; margin: 0 auto"></div>
  <div id="container3" class="container" style="min-width: 600px; height: 400px; margin: 0 auto"></div>
  <div id="container4" class="container" style="min-width: 600px; height: 400px; margin: 0 auto"></div>
  <div id="container5" class="container" style="min-width: 600px; height: 400px; margin: 0 auto"></div>
  <div id="container6" class="container" style="min-width: 600px; height: 400px; margin: 0 auto"></div>
  <div id="container7" class="container" style="min-width: 600px; height: 400px; margin: 0 auto"></div>
  <div id="container8" class="container" style="min-width: 600px; height: 400px; margin: 0 auto"></div>
</body>
</html>
