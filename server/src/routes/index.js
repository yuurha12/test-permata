const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const categoryController = require("../controllers/categoryController");
const taskController = require("../controllers/taskController");
const userAuth = require("../controllers/auth");
const { auth } = require("../middleware/auth");

router.get("/user/:id", userController.getUserById);
router.put("/user/:id", auth, userController.updateUserById);
router.delete("/user/:id", userController.deleteUserById);
router.get("/users", userController.getAllUsers);

router.post("/register", userAuth.register);
router.post("/login", userAuth.login);
router.get("/checkAuth",auth, userAuth.checkAuth);

router.post("/category", auth, categoryController.createCategory);
router.get("/categories", auth, categoryController.getCategories);
router.get("/category/:id", auth, categoryController.getCategoryById);
router.patch("/category/:id", auth, categoryController.updateCategoryById);
router.delete("/category/:id", auth, categoryController.deleteCategoryById);

router.post("/task", auth, taskController.createTask);
router.get("/tasks", auth, taskController.getTasks);
router.get("/task/:id", auth, taskController.getTaskById);
router.patch("/task/:id", auth, taskController.updateTaskById);
router.delete("/task/:id", auth, taskController.deleteTaskById);
router.get("/taskbycategory", auth, taskController.findTaskBydCategory)

module.exports = router;
