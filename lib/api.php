<?php
require_once('connection.php');

$db_instance = ConnectDb::getInstance();
$pdo = $$db_instance->getConnection();

$stmt = $pdo->query('SELECT name FROM test');
while ($row = $stmt->fetch())
{
    echo $row['name'] . "\n";
}

?>
