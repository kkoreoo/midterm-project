/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const db = require('../db/connection');

//libraries and packages
const express = require('express');
const router  = express.Router();
const userinfo = require('../db/queries/users');

//ROUTES

router.get('/', (req, res) => {
  userinfo.getUsers()
  .then((result)=>{
    // const templateVariables = {

    //   users:result.rows,
    // };
    // res.render('users',templateVariables);
    res.json(result.rows);
  })
});
router.get('/:id', (req, res) => {
  const userId = req.params.id
  userinfo.getOnlyOneUser(userId)
  .then((result)=>{
    if (result.rows.length === 0) {
      res.status(404).send('User not found');
    }
    // const templateVariables = {
    //   users:result.rows
    // };
    // res.render('users',templateVariables);
    res.json(result.rows);
  })
});

// will change  to change this to post to make a post requet
router.get('/:id/edit', (req, res) => {
  const userId = req.params.id;
  // const newFirstName = req.body.newFirstName;
  // const newLastName = req.body.newLastName;

  // Fetch the current user information
  userinfo.getOnlyOneUser(userId)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).send('User not found');
      }

      // Update the user's first name and last name
      return userinfo.updateUser(userId,'Yasin','Hussein');
    })

    .then((updatedUser) => {
      // Check if a user was updated
      console.log('updatedUser',updatedUser);
      if (updatedUser.rows.length === 0) {
        return res.status(500).send('Error updating user');
      }
      // const templateVariables = {
      //   users: updatedUser.rows,
      //   message: 'User information updated successfully',
      // };
      // console.log(templateVariables);
      // res.render('users', templateVariables);
      res.json(updatedUser.rows);
    });
});
// BROWSE - Get all tasks for a user
router.get('/:id/tasks', (req, res) => {

  const userId = req.params.id;

  userinfo.getTasksForUser(userId)
    .then((result)=>{
     if (result.rows.length === 0) {
      res.status(404).send(`User has no task with id of ${userId} !`);
      return;
    }
    res.json(result.rows);
  })
});
// will change this to post to make a post requet
//Edit an existing task in the tasks table
router.get('/:id/tasks/edit', (req, res) => {
  const userId = req.params.id;
  // const newTaskName = req.body.newTaskName;
  userinfo.editTask(userId,'play chess')
  .then((result) => {
    if (result.rows.length === 0) {
      return res.status(404).send('Task not found');
    }
    //params will be replaced to (userId,listId,newListName) to be dynamic;
    return userinfo.editTask(3,'Buy a new labtop');
  })

    .then((editTask) => {
      // Check if a list was successfully updated
      if (editTask.rows.length === 0) {

        return res.status(500).send('Error updating list');

      }
      res.json(editTask.rows);
    });

});
//will change  router.get to router.post later on
//Add a new task to the the tasks table

router.get ('/:id/tasks/add', (req, res) => {
  const userId = req.params.id;
  // const taskId = req.params.idTasks;
  const taskName = req.body.taskName;
  const category = req.body.category;

  userinfo.addTask(userId, taskName, category)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(500).json({ error: 'Error adding task' });
      }
      return userinfo.addTask('watch money heist',false);
     })
     .then((addTask) => {

      // Check if a user was not updated
      if (addTask.rows.length === 0) {
        return res.status(500).send('Error inserting tastk');
      }
      res.json(addTask.rows);
    });
});

module.exports = router;
