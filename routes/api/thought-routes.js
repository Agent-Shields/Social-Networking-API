const router = require('express').Router();
const {
    // get all routes per Schema
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller')

// /api/thoughts
router
    .route('/')
        .get(getAllThoughts)
    

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
        .post(addReaction)
        .delete(removeReaction)

// /api/thoughts/<userId>
router
    .route('/:userId')
        .post(createThought)

// /api/thoughts/<userId>/<thoughtId>
router
    .route('/:userId/:Id')
        .get(getThoughtById)
        .put(updateThought)
        .delete(removeThought)

// /api/thoughts/:thoughtId/reactions/:reactionId
// router
//     .route('/:thoughtId/reactions/:reactionId')
//         .delete(removeReaction)

module.exports = router;