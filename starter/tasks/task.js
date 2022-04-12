const Task = require('../models/task');

const getAlltasks = async function(req, res) {
    try {
        const tasks = await Task.find({});
        res.status(201).json({tasks});
    }catch(err) {
        res.status(500).json({ msg: err.message })
    }
}
const createTask =async function(req, res) {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({task});
    }catch(err) {
        res.status(500).json({msg: err.message});
    }
}
const getTask = async function(req, res) {
    try {
        const taskID = req.params.id;
        const task = await Task.findOne({_id: taskID});
        if(!task) {
            return res.status(404).json({msg: 'No Task With Id: '+taskID});
        }
        res.status(201).json({task})
    }catch(err) {
        res.status(500).json({msg: err.message});
    }
}
const updateTask =async function(req, res) {
    try {
        const taskID = req.params.id;
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new: true,
            runValidators: true
        });
        if(!task) {
            return res.status(500).json({msg: 'No Task With Id: ' + taskID});
        }
        res.status(201).json({task});
    }catch(err) {
        res.status(500).json({msg: err.message})
    }
}
const deleteTask = async function(req, res) {
    try {
        const taskID = req.params.id;
        const task = await Task.findOneAndDelete({_id: taskID});
        if(!task) {
            return res.status(404).json({msg: 'No Task With Id: '+taskID});
        }
        res.status(201).json({task});
    } catch (err) {
        res.status(500).json({msg : err.message});
    }
}

module.exports = {
    getAlltasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};