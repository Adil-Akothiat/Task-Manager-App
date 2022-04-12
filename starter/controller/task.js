const express = require('express');
const router = express.Router();
const {getAlltasks, createTask, getTask, updateTask, deleteTask} = require('../tasks/task')

router.route('/').get(getAlltasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;