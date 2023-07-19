const router = require('express').Router();

// Gets all functions for user routes
const {

  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,

} = require('../../controllers/userController');

// Routes for getting all users and creating new users
router
.route('/')
.get(getUsers)
.post(createUser);

// Gets, updates, or deletes a user using it's id
router
.route("/:id")
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

// Adds or removes a friend of a user using it's id
router
.route("/:id/friends/:friendsId")
.post(addFriend)
.delete(removeFriend)

module.exports = router;
