const { User } = require('../models');

const userController = {

    getUsers(req, res) {
      User.find({}).populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    }
}

module.exports = userController
