// Client facing scripts here

// Load up jQuery
$(function() {

  //Escape function to protect against XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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

  const renderTasks = function(tasks) {
    $('.task-container').empty();
    for (const data of tasks) {
      let $tasks = createTaskElement(data);
      $('.task-container').prepend($tasks);
    }
  };

  const loadTasks = function() {
    $.ajax({
      url: "/tasks",
      type: "GET",
      success: (tasks) => {
        renderTasks(tasks);
      }
    });
  };

  loadTasks();
});


// We want to get the tasks data
// from the db, and input it into a function that will create a template
// have to loop over the db to get a template for each tasks.
