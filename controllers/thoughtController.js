const { Thought, User } = require('../models');

const thoughtController = {

    getAllThoughts(req,res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .populate({
            path: "thoughts",
            select: "__v"
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        });
    }
}

module.exports = thoughtController;