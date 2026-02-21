const Task = require("../modals/Task")

//Create a task
exports.createTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "title is required"
        })
    }

    const task = await Task.create({
        title,
        description
    });
    res.status(201).json(task);

}

//Get all tasks
exports.getAllTasks = async (req, res) => {
    const tasks = await Task
        .find()
        .sort({ createdAt: -1 });
    res.status(200).json(tasks);
}

//Update a task
exports.updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        })
    }

    task.title = req.body.title !== undefined ? req.body.title : task.title;
    task.description = req.body.description !== undefined ? req.body.description : task.description;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);

}

//Delete a task
exports.deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        })
    }

    await task.deleteOne();
    res.status(200).json({
        message: "Task deleted successfully"
    })

}