<?php
require_once('connection.php');

$db_instance = ConnectDb::getInstance();
$pdo = $db_instance->getConnection();

class ReframeApi {
  public $pdo;
  public $reframe_user_id;

  public function __construct($pdo_connection) {
    $this->pdo = $pdo_connection;
  }

  function getReframeUserId() {
    return $this->reframe_user_id;
  }

  function setReframeUserId($new_user_id) {
    $this->reframe_user_id = $new_user_id;
    return $this->reframe_user_id;
  }
  /**
   * [ADDS A NEW USER TO THE REFRAME PERSON TABLE AND RETURN NEW USER ID]
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
    $sql = "INSERT INTO person (user_id, facebook_id, first_name, last_name, image_url, email, user_type, stem_tags, bio)
    VALUES (null, :facebook_id, :first_name, :last_name, :image_url, :email, :user_type, :stem_tags, :bio)";

    //'4321', 'Brock', 'Lessner', 'imageurl', 'blessner@wwe.com', 'mentor', 'mathematics', 'MyBio'

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
    $last_inserted_id = $this->pdo->lastInsertId();

    if($inserted) {
      echo "New record created successfully"; //USE THIS ONLY FOR DEBUGGING
      $this->setReframeUserId($last_inserted_id); //SET THE USER_ID
    }
  }

  function addNewMentor($school, $grad_year, $major, $skills) {
    $sql = "INSERT INTO mentor (mentor_id, user_id, school, grad_year, major, skills)
    VALUES (null, :user_id, :school, :grad_year, :major, :skills)";

    //Prepare our statement.
    $statement = $this->pdo->prepare($sql);

    //bind
    $statement->bindValue(':user_id', $this->getReframeUserId());
    $statement->bindValue(':school', $school);
    $statement->bindValue(':grad_year', $grad_year);
    $statement->bindValue(':major', $major);
    $statement->bindValue(':skills', $skills);

    //Execute the statement and insert our values.
    $inserted = $statement->execute();

    if($inserted) {
      echo "New mentor created successfully"; //USE THIS ONLY FOR DEBUGGIN
    }
  }

  function addNewMentee($grade, $interest) {
    $sql = "INSERT INTO mentee (mentee_id, user_id, grade, interest)
    VALUES (null, :user_id, :grade, :interest)";

    //Prepare our statement.
    $statement = $this->pdo->prepare($sql);

    //bind
    $statement->bindValue(':user_id', $this->getReframeUserId());
    $statement->bindValue(':grade', $grade);
    $statement->bindValue(':interest', $interest);

    //Execute the statement and insert our values.
    $inserted = $statement->execute();

    if($inserted) {
      echo "New mentee created successfully"; //USE THIS ONLY FOR DEBUGGIN
    }
  }

  /**
   * [getUserInfoByFacebookId Retrieve a Reframe user by FB-ID. If user found, return status=1 else status=0]
   * @param  [type] $facebook_id [returned by Facebook Login]
   * @return [JSON]              [A JSON object with user data or status of 0]
   */
  function getUserInfoByFacebookId($facebook_id) {
    $json = array(); //INIT JSON ARRAY

    $sql = "SELECT x.user_id,
            x.facebook_id,
            x.first_name,
            x.last_name,
            x.image_url,
            x.email,
            x.user_type,
            x.stem_tags,
            x.bio,
            y.school,
            y.grad_year,
            y.major,
            y.skills,
            z.grade,
            z.interest
            FROM person x
            LEFT OUTER JOIN mentor y ON  x.user_id = y.user_id AND x.user_type = 'mentor'
            LEFT OUTER JOIN mentee z ON  x.user_id = z.user_id AND x.user_type = 'mentee'
            WHERE x.facebook_id = :facebook_id
            LIMIT 1";

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
            'status' => '1',
            'user_id' => $row['user_id'],
            'facebook_id' => $row['facebook_id'],
            'first_name' => $row['first_name'],
            'last_name' => $row['last_name'],
            'image_url' => $row['image_url'],
            'email' => $row['email'],
            'user_type' => $row['user_type'],
            'stem_tags' => $row['stem_tags'],
            'bio' => $row['bio'],
            'school' => $row['school'],
            'grad_year' => $row['grad_year'],
            'major' => $row['major'],
            'skills' => $row['skills'],
            'grade' => $row['grade'],
            'interest' => $row['interest']
          );
          array_push($json, $person);
      }
      $jsonstring = json_encode($json);
    } else {
      $status = array(
        'status' => "0" //user cannot be found
      );
      array_push($json, $status);
      $jsonstring = json_encode($json);
    }
    echo $jsonstring; //RETURN JSON
  }
}

//CREATE INSTANCE OF REFRAME API CLASS
$reframe_api = new ReframeApi($pdo);

if($_GET['action'] == "addNewUser") {
  $reframe_api->addNewPerson($_GET['facebook_id'], $_GET['first_name'], $_GET['last_name'], $_GET['image_url'], $_GET['email'], $_GET['user_type'], $_GET['stem_tags'], $_GET['bio']);

  if($_GET['user_type'] == "mentor") {
    $reframe_api->addNewMentor($_GET['school'], $_GET['grad_year'], $_GET['major'], $_GET['skills']);
  } else {
    $reframe_api->addNewMentee($_GET['grade'], $_GET['interest']);
  }
  //DEBUGGING STUFF BELOW//
  // $reframe_api->addNewPerson('4321', 'Brock', 'Lessner', 'wwf.com/images', 'blessner@wwe.com', 'mentor', 'mathematics', 'This is my bio. This is a test.');
  // ADD MENTOR
  //http://reframe.modernrockstar.com/lib/api.php?action=addNewUser&facebook_id=1234567&first_name=Wayne&last_name=Campbell&image_url=imageurl.com&email=wcampbell@pacbell.com&user_type=mentor&stem_tags=mathematics&bio=My%20Bio&school=calpoly&grad_year=2005&major=computerscience&skills=programming
  // ADD MENTEE
  //http://reframe.modernrockstar.com/lib/api.php?action=addNewUser&facebook_id=1234567&first_name=Wayne&last_name=Campbell&image_url=imageurl.com&email=wcampbell@pacbell.com&user_type=mentee&stem_tags=mathematics&bio=My%20Bio&grade=5th&interest=sports
}

if($_GET['action'] == "getUserInfoByFacebookId") {
  $reframe_api->getUserInfoByFacebookId($_GET['facebook_id']);
}

/*
  NOTHING USERFUL BELOW. ALL TEST CODE
 */

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
