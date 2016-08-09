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

  function getUserInfoByFacebookId($facebook_id) {
    $json = array(); //INIT JSON ARRAY

    $sql = "SELECT user_id, facebook_id, first_name, last_name, image_url, email, user_type, stem_tags, bio
            FROM person
            WHERE facebook_id = :facebook_id";

    //Prepare our statement.
    $statement = $this->pdo->prepare($sql);

    //bind
    $statement->bindValue(':facebook_id', $facebook_id);
    //var_dump($statement);

    //Execute the statement and insert our values.
    $inserted = $statement->execute();
    $result_count = $statement->rowCount();

    if($inserted && $result_count != 0) {
      while ($row = $statement->fetch())
      {
          $person = array(
            'user_id' => $row['user_id'],
            'facebook_id' => $row['facebook_id'],
            'first_name' => $row['first_name'],
            'last_name' => $row['last_name'],
            'image_url' => $row['image_url'],
            'email' => $row['email'],
            'user_type' => $row['user_type'],
            'stem_tags' => $row['stem_tags'],
            'bio' => $row['bio']
          );
          array_push($json, $person);
      }
      $jsonstring = json_encode($json);
    } else {
      $status = array(
        'status' => "User could not be found."
      );
      array_push($json, $status);
      $jsonstring = json_encode($json);
    }
    echo $jsonstring; //RETURN JSON
  }

}

//CREATE INSTANCE OF REFRAME API CLASS
$reframe_api = new ReframeApi($pdo);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

} elseif($_SERVER["REQUEST_METHOD"] == "GET") {

}

if($_POST['action'] == "addNewUser") {
  $reframe_api->addNewPerson($_POST['facebook_id'], $_POST['first_name'], $_POST['last_name'], $_POST['image_url'], $_POST['email'], $_POST['user_type'], $_POST['stem_tags'], $_POST['bio']);
}

if($_GET['action'] == "getUserInfoByFacebookId") {
  $reframe_api->getUserInfoByFacebookId($_GET['facebook_id']);
}



//$reframe_api->addNewPerson('8888', 'Wiggles', 'Maddela', 'http://modernrockstar.com/image', 'joe@modernrockstar.com', 'mentor', 'Technology', 'Here is my bio.');



//TEST STUFF
// $stmt = $pdo->query('SELECT name FROM test');
// while ($row = $stmt->fetch())
// {
//     echo $row['name'] . "\n";
// }

// $stmt = $pdo->query('SELECT user_id, facebook_id, first_name, last_name, image_url, email, user_type, stem_tags, bio FROM person WHERE facebook_id = "5555"');
// while ($row = $stmt->fetch())
// {
//     echo $row['first_name']." ".$row['last_name']. "\n";
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
