
<form action="test.php" method="post">
  Choose the instances:<br>

<?php
$connection=mysql_connect ("localhost", "root", "Bangalore1") or die ("I cannot connect to the database.");
$db=mysql_select_db ("test", $connection) or die (mysql_error());
$query = "SELECT DISTINCT instance_id FROM metric_data";
$sql_result = mysql_query($query, $connection) or die (mysql_error());

	while ($row = mysql_fetch_array($sql_result)) {
	$type = $row["instance_id"];
		echo nl2br ("<input style='font-size:10px;' name='check_list[]' type='checkbox' value='$type'>$type\n");}
 ?>

<br><br>
Choose the duration for which you want the charts to be generated:<br>
<select name="time">
  <option value="1800">last 0.5 hour</option>
  <option value="3600">last 1 hour</option>
  <option value="4800">last 1.5 hour</option>
</select><br><br>
<input type="submit" />
</form>
