const { User } = require('../models');

const userController = {

  // Gets all users info
  getUsers(req, res) {
    User.find({})
    .populate({
      path: "thoughts",
      select: "-__v"
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
  },

  // Gets a specific user's info using their id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({
      path: "thoughts",
      select: "-__v"
    })
    .select("-__v")
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No users found with this ID" })
        return
      }
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
  },
  
  // Created a user using params provided
  createUser({ body }, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(400).json(err));
  },

  // Updates a user using params provided
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No users found with this ID" })
        return
      }
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
  },

  // Deletes a user using their id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No users found with this ID" })
        return
      }
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
  },

  // Adds a friend one sidedly, user 2 is added to user 1's friends array
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendsId }},
      { new: true }
    )
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(400).json(err))
  },

  // Removes a specific friend using their id
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: {friends: params.friendsId }},
      { new: true}
    )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No users found with this ID" })
        return
      }
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
  }
}

module.exports = userController
