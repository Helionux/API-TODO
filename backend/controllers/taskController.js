const Task = require('../models/Task');

exports.getAlltasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "erreur serveur" })
    }
};


exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: "Donnee invalides" })
    }
};



exports.updateTask = async (req, res) => {
    const updateTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updateTask) {
        return res.status(404).json({ message: "Tache non trouvee" })
    }
}

