# test-permata

# client run on 
http://localhost:3000

# server
http://localhost:5000

# API documentation with swagger
http://localhost:5000/docs

there's still had an bug on swagger can't authentication
but work fine on postman etc

# API prefix
http://localhost:5000/api/v1

# API method
router.get("/user/:id", userController.getUserById);

router.put("/user/:id", auth, userController.updateUserById);

router.delete("/user/:id", userController.deleteUserById);

router.get("/users", userController.getAllUsers);

router.post("/register", userAuth.register);

router.post("/login", userAuth.login);

router.post("/checkAuth", auth, userAuth.checkAuth);

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

# USAGE example
http://localhost:5000/api/v1/users
