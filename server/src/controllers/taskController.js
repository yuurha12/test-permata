const Task = require("../models/task");
const Category = require("../models/category");
const User = require("../models/user");


const findTaskBydCategory = async (req, res) =>
{
  try {
    const userId = req.user.id
    const dataUser = await User.findOne({_id: userId })
   
    const taskName = req.body.task;
    
    const task = await Task.find({task: taskName})

    const categories = await Category.findOne({ user: dataUser, task: task });
    if (categories.length === 0) {
      return res.status(404).json({ message: "No tasks found for the specified category" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// create a new task
const createTask = async (req, res) => {
  try {
    const id = req.user.id;
    const dataUser = await User.findOne({ _id: id });
    const categoryName = req.body.category;
    const dataCategory = await Category.findOne({
      name: categoryName,
      user: dataUser,
    });

    const task = new Task({
      name: req.body.name,
      category: dataCategory,
      description: req.body.description,
      user: dataUser.id,
    });

    await task.save();

    await task.populate("user", "name email");

    res.status(201).json({
      message: "Task created successfully",
      task,
      createdBy: {
        name: dataUser.name,
        email: dataUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all tasks
const getTasks = async (req, res) => {
  try {
    const id = req.user.id;
    const dataUser = await User.findOne({ _id: id });
    const categoryName = req.body.category;
    const dataCategory = await Category.findOne({
      name: categoryName,
      user: dataUser,
    });

    const tasks = await Task.find({ category: dataCategory, user: dataUser })
      .populate("category", "name")
      .populate("user", "name");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a task by ID
const getTaskById = async (req, res) => {
  try {
    const userId = req.user.id;
    const dataUser = await User.findOne({ _id: userId });
    const categoryName = req.body.category;
    const dataCategory = await Category.findOne({
      name: categoryName,
      user: dataUser,
    });

    const { id } = req.params;

    const task = await Task.findOne({
      _id: id,
      category: dataCategory,
      user: dataUser,
    })
      .populate("category", "name")
      .populate("user", "name");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a task by ID
const updateTaskById = async (req, res) => {
    try {
      const userId = req.user.id;
      const dataUser = await User.findOne({ _id: userId });
      const categoryName = req.body.category;
      const dataCategory = await Category.findOne({
        name: categoryName,
        user: dataUser,
      });
  
      const { id } = req.params;
  
      const task = await Task.findOneAndUpdate(
        { _id: id, user: dataUser },
        req.body,
        { new: true }
      )
        .populate("category", "name")
        .populate("user", "name");
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// delete a task by ID
const deleteTaskById = async (req, res) => {
  try {
    const userId = req.user.id;
    const dataUser = await User.findOne({ _id: userId });

    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, user: dataUser });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  findTaskBydCategory,
};
