// Client facing scripts here

// Load up jQuery
$(function() {

  //Escape function to protect against XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  //Create the HTML elements for each task
  const createTaskElement = function(taskData) {

    const taskId = taskData.id;
    const taskName = taskData.task_name;
    const taskStatus = taskData.task_status;
    const category = taskData.category_name;
    let categoryIcon = '';

    // Film Icon
    if (category === 'watch') {
      categoryIcon = '<i class="fa-solid fa-film"></i>';

      // Foods Icon
    } else if (category === 'eat') {
      categoryIcon = '<i class="fa-solid fa-utensils"></i>';

      // Books Icon
    } else if (category === 'read') {
      categoryIcon = '<i class="fa-solid fa-book"></i>';

      // Products Icon
    } else if (category == 'buy') {
      categoryIcon = '<i class="fa-solid fa-cart-shopping"></i>';
    }

    let $task = ``;

    // Template for completed tasks
    if (taskStatus) {
      $task = `
      <article class="tasks-list">
        <span class="task-icon">
          <div class="task-icon ${category}">${categoryIcon}</div>
        </span>

        <span class="task-content">
          <div class="task-complete is-completed ${taskId}"><i class="fa-solid fa-square-check"></i></div>
          <div class="task-name ${taskId}">${escape(taskName)}</div>
        </span>

        <span class="task-content">
          <div class="task-edit ${taskId}"><i class="fa-solid fa-pen-to-square"></i></div>
          <div class="task-delete ${taskId}"><i class="fa-solid fa-trash-can"></i></div>
        </span>
      </article>
      `;
      // Template for incomplete tasks
    } else {
      $task = `
      <article class="tasks-list">
      <span class="task-icon">
        <div class="task-icon ${category}">${categoryIcon}</div>
      </span>

      <span class="task-content">
        <div class="task-complete ${taskId}"><i class="fa-regular fa-square"></i></div>
        <div class="task-name ${taskId}">${escape(taskName)}</div>
      </span>

      <span class="task-content">
        <div class="task-edit ${taskId}"><i class="fa-solid fa-pen-to-square"></i></div>
        <div class="task-delete ${taskId}"><i class="fa-solid fa-trash-can"></i></div>
      </span>

      </article>
      `;
    }
    return $task;
  };

  // Post request to DB with new task data
  const $newTaskData = $('#post-task');

  $newTaskData.on("submit", function(event) {
    event.preventDefault();

    const data = $(this).serialize();

    if (data.length !== 0) {
      $.ajax({
        url: "/users/1/tasks/",
        type: "POST",
        data,
        success: () => {
          const $overlay = $('.overlay');
          const $newTaskForm = $('#new-task-form');

          // clears input field
          $('.taskTitle').val('');

          if ($newTaskForm.css('display') != 'none') {
            $newTaskForm.hide();
            $overlay.removeClass('active');
          }
          loadTasks();
        }
      });
    }
  });


  // Assignment of filter buttons
  const $allCategories = $('.all-categories');
  const $toWatchOnly = $('.to-watch');
  const $toEatOnly = $('.to-eat');
  const $toReadOnly = $('.to-read');
  const $toBuyOnly = $('.to-buy');
  const $completedTasks = $('.completed-tasks');
  let filter = null;

  // Displays all tasks
  $allCategories.on('click', function() {
    filter = null;
    loadTasks(filter);
  });

  // Displays only to watch tasks
  $toWatchOnly.on('click', function() {
    filter = 'watch';
    loadTasks(filter);
  });

  // Displays only to eat tasks
  $toEatOnly.on('click', function() {
    filter = 'eat';
    loadTasks(filter);
  });

  // Displays only to read tasks
  $toReadOnly.on('click', function() {
    filter = 'read';
    loadTasks(filter);
  });

  // Displays only to buy tasks
  $toBuyOnly.on('click', function() {
    filter = 'buy';
    loadTasks(filter);
  });

  // Displays completed tasks only
  $completedTasks.on('click', function() {
    filter = 'completed';
    loadTasks(filter);
  });

  // Creates the Task lists
  const renderTasks = function(tasks, filter) {
    let $tasks = '';
    $('.task-container').empty();
    // No filter | All tasks will be shown
    if (!filter) {
      for (const data of tasks) {
        $tasks = createTaskElement(data);
        $('.task-container').prepend($tasks);
      }
      // Populate Completed Tasks Only
    } else if (filter === 'completed') {
      for (const data of tasks) {
        let completionStatus = data.task_status;
        if (completionStatus) {
          $tasks = createTaskElement(data);
          $('.task-container').prepend($tasks);
        }
      }
      // Populate tasks based off filter selected
    } else {
      for (const data of tasks) {
        let taskCategory = data.category_name;
        if (taskCategory === filter) {
          $tasks = createTaskElement(data);
          $('.task-container').prepend($tasks);
        }
      }
    }
  };

  // Dynamically displays tasks
  const loadTasks = function(filter) {
    $.ajax({
      url: "/tasks",
      type: "GET",
      success: (tasks) => {
        renderTasks(tasks, filter);
      }
    });
  };
  // Loads page every time '/' is visited
  loadTasks();

  // Updates database that a task is completed
  $(document).on('click', '.task-complete', function(event) {

    const data = [];
    data.push($(event.currentTarget).attr('class').split(' ')[1]);
    data.push($(event.currentTarget).attr('class').split(' ')[2]);

    $.ajax({
      url: "/users/1/taskCompleted/edit",
      type: "POST",
      data: JSON.stringify(data),
      dataType: "json",
      success: () => {
        loadTasks();
      }
    })
    .done(function(response){
      console.log(response);
    })
    .fail(function(error){
      console.log(error);
    })
  });

  // Opens up edit modal
  $(document).on('click', '.task-edit', function(event) {
    const taskId = $(event.currentTarget).attr('class').split(' ')[1];

    const template = `
      <div class="overlay">
      <section class="modal" id="edit-task-form">
        <header class="new-task-header">
          <h1>Edit Task Category </h1>
          <div class="close-modal"><button type="button"><i class="fa-regular fa-rectangle-xmark"></i></button></div>
        </header>
        <form class="edit-task">
          <div class="task-icon watch ${taskId}"><i class="fa-solid fa-film"></i></div>
          <div class="task-icon eat ${taskId}"><i class="fa-solid fa-utensils"></i></div>
          <div class="task-icon read ${taskId}"><i class="fa-solid fa-book"></i></div>
          <div class="task-icon buy ${taskId}"><i class="fa-solid fa-cart-shopping"></i></div>
       </form>
      </section>
   </div>
   `;
   const $overlay = $('.overlay');
   $overlay.addClass('active');
   $('.content').prepend(template);
  });

  // Closes edit modal
  $(document).on('click', '.close-modal', function() {
    if ($('#edit-task-form').css('display') != 'none') {
      $('#edit-task-form').hide();
      $('.overlay').removeClass('active');
    }
  });

  // Changes category to watch
  $(document).on('click', '.watch', function(event) {
    const data = [];
    data.push($(event.currentTarget).attr('class').split(' ')[1]);
    data.push($(event.currentTarget).attr('class').split(' ')[2]);

    $.ajax({
      url: "/users/1/taskscategory/edit",
      type: "POST",
      data: JSON.stringify(data),
      dataType: 'json',
      success: () => {
        const $editTaskForm = $('#edit-task-form');
        const $overlay = $('.overlay');
        if ($editTaskForm.css('display') != 'none') {
          $editTaskForm.hide();
          $overlay.removeClass('active');
        }
        loadTasks();
      }
    })
  });

  // Changes category to read
  $(document).on('click', '.read', function(event) {
    const data = [];
    data.push($(event.currentTarget).attr('class').split(' ')[1]);
    data.push($(event.currentTarget).attr('class').split(' ')[2]);
    const $editTaskForm = $('#edit-task-form');
    const $overlay = $('.overlay');


    $.ajax({
      url: "/users/1/taskscategory/edit",
      type: "POST",
      data: JSON.stringify(data),
      dataType: 'json',
      success: () => {
        if ($editTaskForm.css('display') != 'none') {
          $editTaskForm.hide();
          $overlay.removeClass('active');
        }
        loadTasks();
      }
    })
  });

  // Changes category to eat
  $(document).on('click', '.eat', function(event) {
    const data = [];
    data.push($(event.currentTarget).attr('class').split(' ')[1]);
    data.push($(event.currentTarget).attr('class').split(' ')[2]);

    $.ajax({
      url: "/users/1/taskscategory/edit",
      type: "POST",
      data: JSON.stringify(data),
      dataType: 'json',
      success: () => {
        const $editTaskForm = $('#edit-task-form');
        const $overlay = $('.overlay');
        if ($editTaskForm.css('display') != 'none') {
          $editTaskForm.hide();
          $overlay.removeClass('active');
        }
        loadTasks();
      }
    })
  });

  // Changes category to buy
  $(document).on('click', '.buy', function(event) {
    const data = [];
    data.push($(event.currentTarget).attr('class').split(' ')[1]);
    data.push($(event.currentTarget).attr('class').split(' ')[2]);

    $.ajax({
      url: "/users/1/taskscategory/edit",
      type: "POST",
      data: JSON.stringify(data),
      dataType: 'json',
      success: () => {
        const $editTaskForm = $('#edit-task-form');
        const $overlay = $('.overlay');
        if ($editTaskForm.css('display') != 'none') {
          $editTaskForm.hide();
          $overlay.removeClass('active');
        }
        loadTasks();
      }
    })
  });

  // Deletes Task
  $(document).on('click', '.task-delete', function(event) {
    const data = $(event.currentTarget).attr('class').split(' ')[1];
    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (confirmDelete) {
      $.ajax({
        url: "/users/1/tasks/delete",
        type: "POST",
        data,
        success: () => {
          loadTasks();
        }
      });
    }
  });
});
