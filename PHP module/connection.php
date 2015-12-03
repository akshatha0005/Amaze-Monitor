<?php
$con = mysql_connect("amaze.cv7bdmmve4xe.us-west-2.rds.amazonaws.com:3306","Amaze","Amazecloud");

if (!$con) {
  die('Could not connect: ' . mysql_error());
}
mysql_select_db("Amaze", $con);

$epochTime = time() - 3600;
$epochTime = $epochTime * 1000;

$instance_ids = array();
/*$instance_ids[0] = "i-6070edb9";
$instance_ids[1] = "i-4d821d94";
$instance_ids[2] = "i-06811edf";*/

$instance_ids[0] = "i-06811edf";
$instance_ids[1] = "i-4d821d94";
$instance_ids[2] = "i-6070edb9";

$instance_ids[3] = "i-6864fbb1";
$instance_ids[4] = "i-6964fbb0";
$instance_ids[5] = "i-6b64fbb2";
?>

