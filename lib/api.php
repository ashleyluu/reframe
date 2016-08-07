<?php
require_once('connection.php');

$db_instance = ConnectDb::getInstance();
$pdo = $db_instance->getConnection();

class ReframeApi {
  public $pdo;

  public function __construct($pdo_connection) {
    $this->pdo = $pdo_connection;
  }
  /**
   * [ADDS A NEW USER TO THE REFRAME PERSON TABLE]
   * @param [type] $facebook_id [description]
   * @param [type] $first_name  [description]
   * @param [type] $last_name   [description]
   * @param [type] $image_url   [description]
   * @param [type] $email       [description]
   * @param [type] $user_type   [description]
   * @param [type] $stem_tags   [description]
   * @param [type] $bio         [description]
   */
  function addNewPerson($facebook_id, $first_name, $last_name, $image_url, $email, $user_type, $stem_tags, $bio) {
    $sql = "INSERT INTO Person (user_id, facebook_id, first_name, last_name, image_url, email, user_type, stem_tags, bio)
    VALUES (null, :facebook_id, :first_name, :last_name, :image_url, :email, :user_type, :stem_tags, :bio)";

    //Prepare our statement.
    $statement = $this->pdo->prepare($sql);

    //bind
    $statement->bindValue(':facebook_id', $facebook_id);
    $statement->bindValue(':first_name', $first_name);
    $statement->bindValue(':last_name', $last_name);
    $statement->bindValue(':image_url', $image_url);
    $statement->bindValue(':email', $email);
    $statement->bindValue(':user_type', $user_type);
    $statement->bindValue(':stem_tags', $stem_tags);
    $statement->bindValue(':bio', $bio);

    //Execute the statement and insert our values.
    $inserted = $statement->execute();

    if($inserted) {
      echo "New record created successfully";
    }
  }

}

//CREATE INSTANCE OF REFRAME API CLASS
$reframe_api = new ReframeApi($pdo);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if($_POST['action'] == "addNewUser") {
    $reframe_api->addNewPerson($_POST['facebook_id'], $_POST['first_name'], $_POST['last_name'], $_POST['image_url'], $_POST['email'], $_POST['user_type'], $_POST['stem_tags'], $_POST['bio']);
  }
}



//$reframe_api->addNewPerson('8888', 'Wiggles', 'Maddela', 'http://modernrockstar.com/image', 'joe@modernrockstar.com', 'mentor', 'Technology', 'Here is my bio.');



//TEST STUFF
// $stmt = $pdo->query('SELECT name FROM test');
// while ($row = $stmt->fetch())
// {
//     echo $row['name'] . "\n";
// }

// function testFunction($pdo) {
//   $stmt = $pdo->query('SELECT name FROM test');
//   while ($row = $stmt->fetch())
//   {
//       echo $row['name'] . "\n";
//   }
// }
//
// testFunction($pdo);
?>
