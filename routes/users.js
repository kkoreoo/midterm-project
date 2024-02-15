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
const { checkOpenAi } = require('../api-calls');

//ROUTES
router.get('/', (req, res) => {
  userinfo.getUsers()
  .then((result)=>{

    res.json(result.rows);
  })
});

// READ - Sends client a user's info
router.get('/:id', (req, res) => {
  const userId = req.params.id
  userinfo.getOnlyOneUser(userId)
  .then((result)=>{
    if (result.rows.length === 0) {
      res.status(404).send('User not found');
    }

    res.json(result.rows);
  })
});

// EDIT - Updates user info in DB
router.post('/:id/edit', (req, res) => {
  const userId = req.params.id;
  const {firstName, lastName} = req.body;

  // Update the user's first name and last name
  userinfo.updateUser(userId, firstName,lastName)
    .then((updatedUser) => {

      if (updatedUser.rows.length === 0) {
        return res.status(500).send('Error updating user');
      }

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
//Edit an existing task category in the tasks table
router.get('/:id/taskscategory/edit', (req, res) => {
  const taskId = req.params.id;
  // const newTaskName = req.body.newTaskName;
  userinfo.editTaskCategory(taskId,'watch')
  .then((result) => {
    if (result.rows.length === 0) {
      return res.status(404).send('Task not found');
    }
    res.json(result.rows);
  });

});

//Add a new task to the the tasks table
router.post('/:id/tasks/', (req, res) => {
  const taskName = req.body.taskTitle;
  checkOpenAi(taskName)
    .then((category) => {
      if (category) {
        userinfo.addTask(taskName, false, category)
      } else {
        console.log('null object');
      }
    })
    .then(() => {
      console.log('successfully added to db');
      res.status(200).end();
    })
    .catch(error => {
      console.log('error', error);
    });
});

//Delete a task
router.post('/:id/tasks/delete', (req, res) => {
  const taskId = Object.keys(req.body)[0];
  userinfo.deleteTask(taskId)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(200).json({ message: 'Task deleted successfully.' });
      }
     });
});

module.exports = router;
