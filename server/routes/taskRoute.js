const express = require("express");
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const taskController = require('../controllers/taskController');

router.route('/')
    .get(taskController.getAllTask)
    .post(taskController.newTask)
    .put(taskController.updateTask)

router.route('/:_id')
    .delete(taskController.deleteTask)

module.exports = router;
