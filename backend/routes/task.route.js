
const express = require('express');
const router = express.Router();
const { getAlltasks, createTask, updateTask } = require('../controllers/taskController');

router.get('/', getAlltasks);
router.post('/', createTask);
router.put('/:id', updateTask);

module.exports = router;