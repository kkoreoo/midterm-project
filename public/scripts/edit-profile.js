$(function() {

  const editUserPage = function(userData) {
    const firstName = userData.first_name;
    const lastName = userData.last_name;

    const template = `
    <header class="list-header edit-profile-header">
      Edit Profile
      <span class="return-to-home">Return To Home</span>
    </header>

    <form class="edit-container">
      <div class="first-name">
        <strong>First Name:</strong><input id="first" name="first" placeholder ="${firstName}"></input>
      </div>
      <div class="last-name">
        <strong>Last Name:</strong><input id="last" name="last" placeholder="${lastName}"></input>
      </div>

      <button type="submit" id="edit-profile">Submit</button>
    </form>
    `;
    return template;
  };

  // Reload DOM of Edit Page
  const reloadEditPage = function(user) {
    $('.content').empty();
    $('.content').prepend(editUserPage(user));
  };

  // Retrieves user info from DB & repopulates DOM with edit profile HTML
  $(document).on('click', '.edit-profile', function() {
    console.log('hello');
    $.ajax({
      url: "/users/1/",
      type: "GET",
      success: (user) => {
        reloadEditPage(user[0]);
      }
    });
  });

  // Redirects back to home page
  $(document).on('click', '.return-to-home', function() {
      window.location.replace("/");
  });

  // POST - Submits new user data to update user's info in DB
  $(document).on('submit', '.edit-container', function(event) {
    event.preventDefault();

    let $firstNameInput = $('#first').serialize().split('=')[1];
    $firstNameInput = $firstNameInput.replace(/%20/g,''); // Removes any whitespace
    let $lastNameInput = $('#last').serialize().split('=')[1];
    $lastNameInput = $lastNameInput.replace(/%20/g,''); // Removes any whitespace
    const data = {};

    // First & Last name is being updated
    if ($firstNameInput.length !== 0 && $lastNameInput.length !== 0) {
      data.firstName = $firstNameInput;
      data.lastName = $lastNameInput;
      $.ajax({
        url: "/users/1/edit",
        type: "POST",
        data,
        success: (user) => {
          window.location.replace("/");
        }
      });
      // Updates only first name
    } else if ($firstNameInput.length !== 0) {
      data.firstName = $firstNameInput;
      data.lastName = $('#last').attr("placeholder");
      console.log('first name only', data);
      $.ajax({
        url: "/users/1/edit",
        type: "POST",
        data,
        success: (user) => {
          window.location.replace("/");
        }
      });
      // Updates only last name
    } else if ($lastNameInput.length !== 0) {
      data.lastName = $lastNameInput;
      data.firstName = $('#first').attr("placeholder");
      console.log('last name only', data);
      $.ajax({
        url: "/users/1/edit",
        type: "POST",
        data,
        success: (user) => {
          window.location.replace("/");
        }
      });
    }
  });
});
