/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const db = require('../db/connection');

const express = require('express');
const router  = express.Router();
const userinfo = require('../db/queries/users');

router.get('/', (req, res) => {
  userinfo.getUsers()
  .then((result)=>{
    const templateVariables = {
      users:result.rows
    };
    res.render('users',templateVariables);
  })
});
router.get('/:id', (req, res) => {
  const userId = req.params.id
  userinfo.getOnlyOneUser(userId)
  .then((result)=>{
    if (result.rows.length === 0) {
      res.status(404).send('User not found');
    }
    const templateVariables = {
      users:result.rows
    };
    res.render('users',templateVariables);
  })
});

// don't forget to change this to post to make a post requet
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

      const templateVariables = {
        users: updatedUser.rows,
        message: 'User information updated successfully',
      };
      // console.log(templateVariables);
      res.render('users', templateVariables);
    });
});

module.exports = router;
