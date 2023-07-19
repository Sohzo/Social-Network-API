const router = require('express').Router();

// Gets all functions for thought routes
const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    removeThought,
    createReaction,
    removeReaction
    
} = require('../../controllers/thoughtController');

// Routes for getting all thoughts and posting new thoughts
router
.route('/')
.get(getAllThoughts)
.post(createThought)

// Gets, updates, or deletes a thought using it's id
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought)

// Adds reactions to a thought using id
router
.route('/:thoughtId/reactions')
.post(createReaction)

// Removes reactions to a thought using id
router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction)

module.exports = router;