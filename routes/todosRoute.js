const express = require('express');
const router = express.Router();
const {
    getAllTodo,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todosController');

router.route('/').get(getAllTodo).post(createTodo);
router.route('/:id').patch(updateTodo).delete(deleteTodo);

module.exports = router;