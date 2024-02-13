  const db = require('../connection');

    const getUsers = () => {
      const allUsers = `
      SELECT * FROM users;
      `;
      return db.query(allUsers);
    };

    const getOnlyOneUser = (userId) => {

      const oneUser = `
      SELECT * FROM users WHERE id = $1;
      `;
      return db.query(oneUser,[userId]);

    };
    const updateUser = (userId,newFirstName, newLastName) => {
      const updateQuery = `
        UPDATE users
        SET first_name = $1, last_name = $2
        WHERE id = $3
        RETURNING *
      `;
      return db.query(updateQuery, [newFirstName, newLastName,userId]);
    };

module.exports = { getUsers, getOnlyOneUser,updateUser};
