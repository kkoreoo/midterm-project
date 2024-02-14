$(function() {

  const editUserPage = function(userData) {
    const firstName = userData.first_name;
    const lastName = userData.last_name;
    const email = userData.email;

    const template = `
    <header class="list-header edit-profile-header">
      Edit Profile
      <span class="return-to-home">Return To Home</span>
    </header>

    <div class="edit-container">
      <div class="first-name">
        <strong>First Name:</strong><input placeholder ="${firstName}"></input>
      </div>
      <div class="last-name">
        <strong>Last Name:</strong><input placeholder="${lastName}"></input>
      </div>
      <div class="email">
        <strong>Email:</strong><input placeholder="${email}"></input>
      </div>
      <button id="edit-profile">Submit</button>
    </div>
    `;
    return template
  };

  const $editProfile = $('.edit-profile');

  $editProfile.on('click', function() {
    $.ajax({
      url: "/users/1",
      type: "GET",
      success: (user) => {
        $('.content').empty();
        console.log(user);
        $('.content').prepend(editUserPage(user));
      }
    });
  });
});
