function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
    getUserFacebookId();
  } else if (response.status === 'not_authorized') {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1780855752130945',
    xfbml      : true,
    version    : 'v2.7'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

function getUserFacebookId() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      var uid = response.authResponse.userID;
      $.ajax({
        method: 'GET',
        url: 'http://reframe.modernrockstar.com/lib/api.php?action=getUserInfoByFacebookId',
        datatype: 'json',
        data: {
          facebook_id: uid
        }
      }).done(function(data) {
          var userData = JSON.parse(data);
          $.each(userData, function() {
            var userStatus = this.status;
            if (userStatus === '0') {
              registration();
            } else {
              location.href = 'profile.html';
            }
          });
        });
      successfulLogIn();
    }
  });
}

function registration() {
  FB.api('/me', {fields: 'first_name,last_name,email'}, function(response) {
    var first_name = response.first_name;
    var last_name = response.last_name;
    var email = response.email;
    var modal = document.getElementById('registration');
    var mentor = document.getElementById('mentorButton');
    var mentee = document.getElementById('menteeButton');
    var cancel = document.getElementById('cancel');
    var submit = document.getElementById('submit');
    modal.style.display = 'block';
    document.getElementById('fname').value = first_name;
    document.getElementById('lname').value = last_name;
    document.getElementById('email').value = email;
    mentor.onclick = function() {
      document.getElementById('mentorFields').style.display = 'block';
      document.getElementById('menteeFields').style.display = 'none';
      mentor.disabled = true;
      mentee.disabled = false;
    }
    mentee.onclick = function() {
      document.getElementById('menteeFields').style.display = 'block';
      document.getElementById('mentorFields').style.display = 'none';
      mentee.disabled = true;
      mentor.disabled = false;
    }
    cancel.onclick = function() {
      modal.style.display = 'none';
    }
    submit.onclick = function() {
      addNewUser();
      modal.style.display = 'none';
      location.href = 'profile.html';
    }
  });
}

var payload = function() {
  JSON.stringify({
    user_id: ,
    facebook_id: ,
    first_name: ,
    last_name: ,
    image_url: ,
    email: ,
    user_type: ,
    stem_tags: ,
    bio:
  })
  console.log();
}


//   if (mentor) {
//     school: ,
//     grad_year: ,
//     major: ,
//     skills:
//   } else {
//     grade: ,
//     interest:
//   }
// };

function addNewUser() {
  $.ajax({
    method: 'GET',
    url: "http://reframe.modernrockstar.com/lib/api.php?action=addNewUser",
    datatype: 'json',
    data: payload
  }).done(function(data) {
      console.log(data);
  });
}

function successfulLogIn() {
  console.log('Welcome! Fetching your information...');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}

// function checkFB() {
//   FB.api(
//     "/me/picture",
//     function (response) {
//       if (response && !response.error) {
//         var img = document.createElement('img');
//         img.src = response.data.url;
//         document.getElementById('photo').appendChild(img);
//       }
//     }
//   );
// }

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
