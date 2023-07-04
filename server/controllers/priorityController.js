const Priority = require("../models/Priority");
const Task = require("../models/Task");


const newPriority = async (req, res) => {
    try {

        const { priority } = req.body;
        const user = req.user;

        if (!priority) {
            return res.status(400).json({ error: "Missing Input" })
        }

        const priorityDoc = await Priority.findOne({ priority });

        if (priorityDoc && priorityDoc.user.toString() === user) {
            return res.status(409).json({ error: "Priority already exists" });
        }

        const result = await Priority.create({
            priority,
            user,
        })

        return res.status(201).json(result);
    } catch (err) {
        console.log("new priority error - ", err);
        return res.sendStatus(500);
    }
}

const getAllPriority = async (req, res) => {
    try {

        const user = req.user;
        const result = await Priority.find({ user });
        return res.json(result);
    } catch (err) {
        console.log("get priority error - ", err);
        return res.sendStatus(500);
    }
}

// const updatePriority = async (req, res) => {
//     const { _id, newPriority } = req.body;

//     if(!_id || !newPriority)

//     const priorityDoc = await Priority.findById(_id);

//     if (!priorityDoc) {
//         return res.status(400).json({ error: "Priority does not exists" });
//     }

//     const result = await Priority.findByIdAndUpdate(id, {
//         priority: newPriority
//     }, { new: true })

//     return res.json(result);
// }

const deletePriority = async (req, res) => {
    try {

        const { _id } = req.params;
        const user = req.user;

        const priorityDoc = await Priority.findById(_id);

        if (!priorityDoc) {
            return res.status(400).json({ error: "Priority does not exists" });
        }

        if (priorityDoc.user.toString() !== user) {
            return res.json(403).json({ error: "user cannot delete this request" });
        }

        const taskDoc = await Task.findOne({ priority: _id });
        if (taskDoc) {
            return res.status(400).json({ error: "Cannot delete populated priority" });
        }

        const result = await priorityDoc.deleteOne();

        return res.json(result);
    } catch (err) {
        console.log("delete priority error - ", err);
        return res.sendStatus(500);
    }
}

module.exports = { newPriority, getAllPriority, deletePriority };
