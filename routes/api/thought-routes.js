const router = require('express').Router();
const {
    // get all routes per Schema
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    removeThought
} = require('../../controllers/thought-controller')

// /api/thoughts
router
    .route('/')
        .get(getAllThoughts)
    
// /api/thoughts/<userId>
router.route('/:userId').post(createThought)

// /api/thoughts/<userId>/<thoughtId>
router
    .route('/:userId/:Id')
        .get(getThoughtById)
        .put(updateThought)
        .delete(removeThought)

module.exports = router;