<?php
require_once 'bd.php';
echo "debug1";
$bd = DBConnection();
$query = $bd->prepare('select * from cabinas');
$query->execute();
$cabinas = $query->fetchAll(PDO::FETCH_ASSOC);
echo "debug2";
$fp = fopen('cabinas.json','w+');
fwrite($fp,json_encode($cabinas));
fclose($fp);

print_r($cabinas);


?>