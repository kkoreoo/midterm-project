$(function() {

  // Return to home page
  $(document).on('click', '.return-to-home', function() {
    setTimeout(() => {
      window.location.replace("/");
    }, 250);
  } )

  $(document).on('click', '#edit-profile', function(event) {
    console.log('event details', event);

    // POST request to db to change the values of the username.
  })
});
