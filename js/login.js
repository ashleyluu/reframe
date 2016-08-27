// Login form data will be stored in payload to be sent to the server after submit

// Modal and modal contents
var button = document.getElementById('status');
var modal = document.getElementById('registration');
var mentor = document.getElementById('mentorButton');
var mentee = document.getElementById('menteeButton');
var mentorFields = document.getElementById('mentorFields');
var menteeFields = document.getElementById('menteeFields');
var cancel = document.getElementById('cancel');
var submit = document.getElementById('submit');

// Form fields
var facebookId = document.getElementById('facebook-id');
var imageUrl = document.getElementById('image-url');
var fName = document.getElementById('fname');
var lName = document.getElementById('lname');
var email = document.getElementById('email');
var school = document.getElementById('school');
var gradYear = document.getElementById('grad-year');
var major = document.getElementById('major');
var skills = document.getElementById('skills');
var bio = document.getElementById('bio');
var grade = document.getElementById('grade');
var interest = document.getElementById('interest');
var stemTags = document.getElementById('stem-tags');

// Modal visibility
function showModal () {
  modal.style.display = 'block';
}

function hideModal () {
  modal.style.display = 'none';
}

// Visible profile fields based on user type
function showMentorFields () {
  mentorFields.style.display = 'block';
  menteeFields.style.display = 'none';
  mentor.disabled = true;
  mentee.disabled = false;
}

function showMenteeFields () {
  menteeFields.style.display = 'block';
  mentorFields.style.display = 'none';
  mentee.disabled = true;
  mentor.disabled = false;
}

// Add event handler
showModal();
button.addEventListener('click', showModal);
mentor.addEventListener('click', showMentorFields);
mentee.addEventListener('click', showMenteeFields);
cancel.addEventListener('click', hideModal);
submit.addEventListener('click', addNewUser);

function populateFieldsFromFB (response) {
  facebookId.value = response.id;
  imageUrl.value = response.picture.data.url;
  fName.value = response.first_name;
  lName.value = response.last_name;
  email.value = response.email;
}

// Send user info
function addNewUser() {
  var payload = {
    facebook_id: facebookId.value,
    first_name: fName.value,
    last_name: lName.value,
    image_url: imageUrl.value,
    email: email.value,
    school: school.value,
    grad_year: gradYear.value,
    user_type: 'mentor',
    major: major.value,
    skills: skills.value,
    stem_tags: stemTags.value,
    bio: bio.value,
    grade: grade.value,
    interest: interest.value,
  };
  $.ajax({
    method: 'GET',
    url: 'http://reframe.modernrockstar.com/lib/api.php?action=addNewUser',
    datatype: 'json',
    data: payload
  }).done(function(data) {
      console.log(data);
      hideModal();
  });
}

// Facebook callback
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

// Verify if user is new, then prompt registration
function getUserFacebookId() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      var uid = response.authResponse.userID;
      console.log(uid)
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
              // location.href = 'profile.html';
            }
          });
        });
    }
  });
}

// Get user data from Facebook API
function registration() {
  FB.api('/me', {fields: 'first_name,last_name,email,id,picture'}, function(response) {
    showModal();
    populateFieldsFromFB(response);
  });
}

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
