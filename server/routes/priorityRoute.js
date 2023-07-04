const express = require("express");
const router = express.Router();
const priorityController = require('../controllers/priorityController');

router.route('/')
    .get(priorityController.getAllPriority)
    .post(priorityController.newPriority)
// .put(priorityController.updatePriority)


router.route('/:_id')
    .delete(priorityController.deletePriority)

module.exports = router;
