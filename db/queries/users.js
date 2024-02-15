  const db = require('../connection');

  // BROWSE - display all users;
  const getUsers = () => {
    const allUsers = `
    SELECT * FROM users;
    `;
    return db.query(allUsers);
  };
  //  Get specific user
  const getOnlyOneUser = (userId) => {

    const oneUser = `
    SELECT * FROM users WHERE id = $1;
    `;
    return db.query(oneUser,[userId]);

  };
  // UPDATE - update the first name and last name of a user
  const updateUser = (userId,newFirstName, newLastName) => {

    const updateQuery = `
      UPDATE users
      SET first_name = $1, last_name = $2
      WHERE id = $3
      RETURNING *
    `;

    return db.query(updateQuery, [newFirstName, newLastName,userId]);

  };
  // BROWSE - Get all Tasks for a user

  const getTasksForUser = (userId) => {
    const query = `
      SELECT * FROM tasks WHERE id = $1;
    `;
    return db.query(query, [userId]);
  };

    // EDIT - Edit task
  const  editTask = (userId, newTaskName) => {
      const query = `
        UPDATE tasks
        SET task_name = $1
        WHERE id = $2
        RETURNING *;
      `;
      return db.query(query, [newTaskName,userId]);
    };
    //Insert new tasks to the tasks table
    const addTask = (taskName,taskStatuts,category_id) => {
      const query = `
        INSERT INTO tasks (task_name,task_status,category_id)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      return db.query(query, [taskName,taskStatuts,category_id]);
    };
    const deleteTask = (taskId)=>{
      const deletequery = `
      DELETE FROM tasks WHERE id = $1;
      `;
      return db.query(deletequery,[taskId]);
    };

  module.exports = {
    getUsers, getOnlyOneUser,updateUser,
    getTasksForUser, editTask,
    addTask,deleteTask
  };
