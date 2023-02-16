const Category = require("../models/category");
const User = require("../models/user");

// create a new category
const createCategory = async (req, res) => {
  try {
    const id = req.user.id
    const dataUser = await User.findOne({ _id: id });

    const category = new Category({
      name: req.body.name,
      user: dataUser.id,
    });

    await category.save();

    await category.populate("user", "name email");

    res.status(201).json({
      message: "Category created successfully",
      category,
      createdBy: {
        name: dataUser.name,
        email: dataUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all categories
const getCategories = async (req, res) => {
  try {
    const id = req.user.id;
    const dataUser = await User.findOne({_id :id})

    const categories = await Category.find({ user: dataUser });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get a category by ID
const getCategoryById = async (req, res) => {
  try {

    const userId = req.user.id;
    const dataUser = await User.findOne({_id :userId})

    const { id } = req.params;

    const category = await Category.findOne({_id: id, user: dataUser});
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a category by ID
const updateCategoryById = async (req, res) => {
  try {

    const userId = req.user.id
    const dataUser = await User.findOne({_id :userId})

    const { id } = req.params

    const category = await Category.findOneAndUpdate(
      { _id: id, user: dataUser },
      req.body,
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a category by ID
const deleteCategoryById = async (req, res) => {
  try {

    const userId = req.user.id
    const dataUser = await User.findOne({_id :userId})

    const { id } = req.params

    const category = await Category.findOneAndDelete({_id: id, user: dataUser});
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
