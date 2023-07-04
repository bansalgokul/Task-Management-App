const Priority = require('../models/Priority.js');
const Task = require('../models/Task.js');
const User = require('../models/User.js');

const newTask = async (req, res) => {
    try {

        const { title, description, priority, completed } = req.body;
        const user = req.user;

        if (!title || !priority) {
            return res.status(400).json({ error: "Input Fields Missing" });
        }

        const priorityDoc = await Priority.findById(priority);

        if (!priorityDoc) {
            return res.status(404).json({ error: "Priority not found" });
        }

        const taskDoc = await Task.create({
            title,
            description,
            priority: priorityDoc._id,
            user,
            completed
        })

        return res.status(201).json(taskDoc);

    } catch (err) {
        console.error("new task error - ", err);
    }
}

const getAllTask = async (req, res) => {
    try {
        const user = req.user;
        const result = await Task.find({ user });
        return res.json(result);
    } catch (err) {
        console.log("get task error - ", err);
        return res.sendStatus(500);
    }
}

const updateTask = async (req, res) => {
    try {

        const { _id, title, description, priority, completed } = req.body;
        const user = req.user;


        const taskDoc = await Task.findById(_id);

        if (taskDoc.user.toString() !== user) {
            return res.status(402).json({ error: "Cannot edit this task. Forbidden" })
        }

        const result = await taskDoc.updateOne({ title, description, priority, completed, user }, { new: true });

        return res.json(result);
    } catch (err) {
        console.log("update task error - ", err);
        return res.sendStatus(500);
    }
}

const deleteTask = async (req, res) => {
    try {

        const { _id } = req.params;
        const user = req.user;

        const taskDoc = await Task.findById(_id);

        if (taskDoc.user.toString() !== user) {
            console.log(taskDoc.user, "   ", user);
            return res.status(402).json({ error: "Cannot delete this task. Forbidden" })
        }

        const result = taskDoc.deleteOne();
        return res.json(result);
    } catch (err) {
        console.log("delete task error - ", err);
        return res.sendStatus(500);
    }
}

module.exports = { newTask, getAllTask, updateTask, deleteTask };
