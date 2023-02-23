import React, { useState } from "react";
import {
  CloseSquareOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  FormCheck,
  FormControl,
  FormLabel,
  InputGroup,
  Row,
} from "react-bootstrap";
// import { API } from "../../config/api";
// import { useQuery, useMutation } from "react-query";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState(["All Tasks"]);

  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Tasks");
  const [newTaskInput, setNewTaskInput] = useState("");

  
  const categoryColor = [
    {
      index: 0,
      color: "danger",
    },
    {
      index: 1,
      color: "success",
    },
    {
      index: 2,
      color: "warning",
    },
    {
      index: 3,
      color: "info",
    },
  ];
  
  const handleCategoryAdd = () => {
    const newCategory = newCategoryInput.trim();
    if (newCategory !== "" && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategoryInput("");
    }
  };

  const handleCategoryDelete = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

    const handleBadge = (id) => {
      if (tasks.find((task) => task._id === id)) {
        setTasks(
          tasks.map((task) => {
            if (task._id === id) {
              return { ...task, done: !task.done };
            }
            return task;
          })
        );
      } else {
        const newTasks = tasks.concat({
          id,
          category: selectedCategory,
          text: newTaskInput,
          done: false,
        });
        setTasks(newTasks);
        setNewTaskInput("");
      }
    };
  const handleTaskDelete = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const handleTaskUpdate = (id, newText) => {
    setTasks(
      tasks.map((task) => {
        if (task._id === id) {
          return { ...task, text: newText };
        }
        return task;
      })
    );
  };

  return (
    <>
      <Container className="my-5 mx-0 d-flex justify-content-center align-items-center">
        <Card bg="white" style={{ width: "70%" }}>
          <Container className="text-center">
            <Row>
              <Col xs={5}>
                <div className="text-start m-3">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="d-flex align-items-center my-2"
                    >
                      <Badge bg={category.toLowerCase()} className="me-2" />
                      <p
                        className={
                          selectedCategory === category
                            ? "fw-bold mb-0"
                            : "mb-0"
                        }
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </p>
                      <CloseSquareOutlined
                        onClick={() => handleCategoryDelete(category)}
                        className="ms-auto"
                      />
                    </div>
                  ))}
                  <div className="d-flex align-items-center my-2">
                    <FormLabel className="opacity-50 me-2">
                      New category:
                    </FormLabel>
                    <InputGroup>
                      <FormControl
                        placeholder="Category name"
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                      />
                      <FormOutlined onClick={handleCategoryAdd} />
                    </InputGroup>
                  </div>
                </div>
              </Col>

              <Col xs={7}>
                <div className="text-start m-3">
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Task name"
                      value={newTaskInput}
                      onChange={(e) => setNewTaskInput(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleBadge({
                          _id: tasks.length + 1,
                          category: selectedCategory,
                          text: newTaskInput,
                          done: false,
                        })
                      }
                    >
                      Add Task
                    </Button>
                  </InputGroup>
                  {tasks
                    .filter(
                      (task) =>
                        selectedCategory === "All Tasks" ||
                        task.category === selectedCategory
                    )
                    .map((task) => (
                      <div
                        key={task._id}
                        className="d-flex align-items-center justify-content-between mb-3"
                      >
                        <div className="d-flex align-items-center">
                          <FormCheck
                            type="checkbox"
                            className="me-3"
                            checked={task.done}
                            onChange={() => handleBadge(task._id)}
                          />
                          <FormControl
                            value={task.text}
                            style={
                              task.done
                                ? { textDecoration: "line-through" }
                                : {}
                            }
                            onChange={(e) =>
                              handleTaskUpdate(task._id, e.target.value)
                            }
                          />
                          <Badge
                            bg={
                              categoryColor.find(
                                (category) => category?.index === task.category
                              )?.color
                            }
                            className="ms-2"
                          >
                            {task.category}
                          </Badge>
                        </div>
                        <DeleteOutlined
                          onClick={() => handleTaskDelete(task._id)}
                        />
                      </div>
                    ))}
                </div>
              </Col>
            </Row>
          </Container>
        </Card>
      </Container>
    </>
  );
}