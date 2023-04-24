const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thougtController')

router.route('/').get(getThought);

router.route('/:userId').post(createThought);

router.route('/:thougtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction)

module.exports = router;