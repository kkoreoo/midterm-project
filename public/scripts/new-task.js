$(function() {

  const $createNewTaskButton = $('.new-task');
  const $newTaskForm = $('#new-task-form');
  const $closeModal = $('.close-modal');
  const $overlay = $('#overlay');

  // Displays new task modal
  $createNewTaskButton.on('click', function (event) {
    $newTaskForm.show();
    $overlay.addClass("active");
  });

  // Closes new task modal
  $closeModal.on('click', function() {
    if ($newTaskForm.css('display') != 'none') {
      $newTaskForm.hide();
      $overlay.removeClass('active');
    }
  });

  // Closes modal if clicked outside of modal
  // $('body').on('click', function(event) {
  //   if ($newTaskForm.css('display') != 'none') {
  //     $newTaskForm.hide();
  //     $overlay.removeClass('active');
  //   }
  // });
});
