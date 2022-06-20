const router = require('express').Router();
const {
addThought,
addReaction,
removeThought,
removeReaction
} = require('../../controllers/thoughts-controller');

// /api/thoughts/<UserId>
router.route('/:userId').post(addComment);

// /api/thoughts/<userId>/<thoughtsId>
router
.route('/:userId/:thoughtsId')
.put(addReaction)
.delete(removeThoutghs);

// /api/thoughts/<userId>/<thoughtsId>/<reactionsId>
router.route('/:userId/:thoughtsId/:reactionsId').delete(removeReactions);

module.exports = router;