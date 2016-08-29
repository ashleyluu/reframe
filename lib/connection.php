<?php
// Singleton to connect db.
class ConnectDb {
  // Hold the class instance.
  private static $instance = null;
  private $conn;

  private $host = '127.0.0.1'; //use localhost on remote
  private $user = 'reframe';
  private $pass = 'UNo)h?o%}=L(';
  private $name = 'reframe';

  // The db connection is established in the private constructor.
  private function __construct()
  {
    $this->conn = new PDO("mysql:host={$this->host};
    dbname={$this->name}", $this->user,$this->pass,
    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
  }

  public static function getInstance()
  {
    if(!self::$instance)
    {
      self::$instance = new ConnectDb();
    }

    return self::$instance;
  }

  public function getConnection()
  {
    return $this->conn;
  }
}
?>
