// Client facing scripts here

// Load up jQuery
$(function() {

  // Requests new task form when button clicked
  const $newTask = $('.new-task');

  $newTask.on("click", function(event) {
    console.log(event);
  })


});
