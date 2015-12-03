<?php
include("connection.php");
$result = array();
foreach($instance_ids as $instance_id) {
  $query ="SELECT time_stamp, metric_value FROM metric_data WHERE instance_id='" .$instance_id. "' AND metric_name='HTTP' AND time_stamp >".$epochTime.";";
  $sth = mysql_query($query);
  $rows1 = array();
  $rows1['name'] = $instance_id;
  while($rr = mysql_fetch_assoc($sth)) {
      $rows1['data'][] = array($rr['time_stamp'], $rr['metric_value']);
  }
  array_push($result,$rows1);
}
print json_encode($result, JSON_NUMERIC_CHECK);
mysql_close($con);
?>
