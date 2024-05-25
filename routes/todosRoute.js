const express = require('express');
const router = express.Router();
const {
    getAllTodo,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todosController');

router.route('/:userID').get(getAllTodo).post(createTodo);
router.route('/:userID/:id').patch(updateTodo).delete(deleteTodo);

module.exports = router;