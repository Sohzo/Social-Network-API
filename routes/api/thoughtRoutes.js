const router = require('express').Router();

const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    removeThought,

} = require('../../controllers/thoughtController');

router
.route('/')
.get(getAllThoughts)
.post(createThought)

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought)

module.exports = router;