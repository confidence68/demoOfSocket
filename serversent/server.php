<?php 
header('Content-Type: text/event-stream'); 
header('Cache-Control: no-cache'); 

$time = date('r'); 

  $i = 0;
  $c = $i + 100;
  while (++$i < $c) {
    echo "id: " . $i . "\n";
    echo "data: " . $time . ";\n\n";
    ob_flush();
    flush();
    sleep(1);
  }
?>