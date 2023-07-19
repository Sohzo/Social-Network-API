const { User, Thought } = require('../models');
const { populate } = require("../models/User")

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
            select: "-__v"
        })
        // .populate({
        //     path: "thoughts",
        //     select: "-__v"
        // })
        .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thoughts with this ID found" })
                return;
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    createThought({ body }, res) {
        console.log(body);
        Thought.create(body)
        .then((thoughtData) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: thoughtData._id }},
                { new: true }
            )
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No users with this ID found" })
                return;
            }
            res.json(dbUserData)
        })
        .catch((err) => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thoughts with this ID found" })
                return;
            }
            res.json(dbThoughtData)
        })
        .catch((err) => res.status(400).json(err))
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thoughts with this ID found" })
                return;
            }
            res.json(dbThoughtData)
        })
        .catch((err) => res.status(400).json(err))
    },

    createReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body }},
            { new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thoughts with this ID found" })
                return;
            }
            res.json(dbThoughtData)
        })
        .catch((err) => res.status(400).json(err))
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } }},
            { new: true }
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err))
    }
}

module.exports = thoughtController;