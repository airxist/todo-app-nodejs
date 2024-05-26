const { StatusCodes } = require('http-status-codes');
const Todos = require('../models/Todos');
const CustomError = require('../errors');

const getAllTodo = async (req, res) => {  
    const { userID } = req.params;
    const todo = await Todos.find({ user: userID });
    res.status(StatusCodes.OK).json({ todo })
}

const createTodo = async (req, res) => {
    const { userID } = req.user;
    const { task } = req.body;
    if(!task) {
        throw new CustomError.badRequestError('please input a task')
    }
    const todo = await Todos.create({ task, user: userID });
    res.status(StatusCodes.CREATED).json({ msg: "Created succesfully" })
}


const updateTodo = async (req, res) => {
    const { id: taskID } = req.params;
    const { userID } = req.user;
    const { completed } = req.body;
    if (!completed ) {
        throw new CustomError.badRequestError('input completed')
    }
    const todo = await Todos.findOneAndUpdate({ _id: taskID, user: userID }, { completed }, {
        new: true,
        runValidators: true
    });
    
    if (!todo) {
        throw new CustomError.badRequestError(`no task with the id ${taskID}`)
    }
    res.status(StatusCodes.OK).json({ msg: 'updated successfully' });
}

const deleteTodo = async (req, res) => {
    const { userID } = req.user;
    const { id: taskID } = req.params;
    const todo = await Todos.findOneAndDelete({ _id: taskID, user: userID })
    if (!todo) {
        throw new CustomError.badRequestError(`no task with the id ${taskID}`)
    }
    res.status(StatusCodes.OK).json({ msg: 'task deleted'})
}

module.exports = {
    getAllTodo,
    createTodo,
    updateTodo,
    deleteTodo
}