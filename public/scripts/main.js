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

    const taskName = taskData.task_name;
    const taskStatus = taskData.task_status;
    const category = taskData.category_id; // film=1, foods=2, books=3, products=4
    let categoryIcon = '';

    // Film Icon
    if (category === 1) {
      categoryIcon = '<i class="fa-solid fa-film"></i>';

      // Foods Icon
    } else if (category === 2) {
      categoryIcon = '<i class="fa-solid fa-utensils"></i>';

      // Books Icon
    } else if (category === 3) {
      categoryIcon = '<i class="fa-solid fa-book"></i>';

      // Products Icon
    } else if (category == 4) {
      categoryIcon = '<i class="fa-solid fa-cart-shopping"></i>';
    }

    let $task = ``;

    // Template for completed tasks
    if (taskStatus) {
      $task = `
      <article class="tasks-list">
      <div class="task-icon">${categoryIcon}</div>

      <span class="task-content">
        <div class="task-complete is-completed"><i class="fa-solid fa-square-check"></i></div>
        <div class="task-name">${escape(taskName)}</div>
      </span>

      <span class="task-content">
        <div class="task-priority"><i class="fa-solid fa-flag"></i></div>
        <div class="task-edit"><i class="fa-solid fa-pen-to-square"></i></div>
        <div class="task-delete"><i class="fa-solid fa-trash-can"></i></div>
      </span>

      </article>
      `;
      // Template for incomplete tasks
    } else {
      $task = `
      <article class="tasks-list">
      <div class="task-icon">${categoryIcon}</div>

      <span class="task-content">
        <div class="task-complete"><i class="fa-regular fa-square"></i></div>
        <div class="task-name">${escape(taskName)}</div>
      </span>

      <span class="task-content">
        <div class="task-priority"><i class="fa-solid fa-flag"></i></div>
        <div class="task-edit"><i class="fa-solid fa-pen-to-square"></i></div>
        <div class="task-delete"><i class="fa-solid fa-trash-can"></i></div>
      </span>

      </article>
      `;
    }
    return $task;
  };

  // Assignment of filter buttons
  const $allCategories = $('.all-categories');
  const $toWatchOnly = $('.to-watch');
  const $toEatOnly = $('.to-eat');
  const $toReadOnly = $('.to-read');
  const $toBuyOnly = $('.to-buy');
  const $prorityTasks = $('.priority-tasks');
  const $completedTasks = $('.completed-tasks');
  let filter = null;

  // Displays all tasks
  $allCategories.on('click', function() {
    filter = null;
    loadTasks(filter);
  })

  // Displays only to watch tasks
  $toWatchOnly.on('click', function() {
    filter = 1;
    loadTasks(filter);
  });

  // Displays only to eat tasks
  $toEatOnly.on('click', function() {
    filter = 2;
    loadTasks(filter);
  });

  // Displays only to read tasks
  $toReadOnly.on('click', function() {
    filter = 3;
    loadTasks(filter);
  });

  // Displays only to buy tasks
  $toBuyOnly.on('click', function() {
    filter = 4;
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
        let taskCategory = data.category_id;
        if (taskCategory === filter) {
          $tasks = createTaskElement(data);
          $('.task-container').prepend($tasks);
        }
      }
    }
  };

  const loadTasks = function(filter) {
    $.ajax({
      url: "/tasks",
      type: "GET",
      success: (tasks) => {
        renderTasks(tasks, filter);
      }
    });
  };

  loadTasks();

  //Updates database that a task is completed
  $(document).on('click', '.task-complete', function(event) {
    console.log('event details', event);
  });

});
