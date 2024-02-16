$(function() {

  const retrieveHeaderData = function() {
    $.ajax({
      url: "/users/1",
      type: "GET",
      success: (user) => {
        loadHeader(user[0]);
      }
    });
  }

  const loadHeader = function(userData) {
    const firstName = userData.first_name;
    const lastName = userData.last_name;
    const template = `
    <ul class="username">
      <li>
        <span>Logged in as: ${firstName} ${lastName}<i class="fa-sharp fa-solid fa-angle-down"></i></span>
        <ul class="username-dropdown">
        <li class="edit-profile"><span>Edit Profile</span></li>
        </ul>
      </li>
    </ul>
  `;
  $('.content').prepend(template);
  };

  retrieveHeaderData();
});
