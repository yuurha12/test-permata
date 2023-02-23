import React from "react";
import { Button, Card } from "react-bootstrap";

export default function Task({ task, onUpdate, onDelete }) {
  const handleUpdateClick = () => {
    const newText = prompt("Enter new task text:", task.text);
    if (newText) {
      onUpdate(task._id, newText);
    }
  };

  const handleDeleteClick = () => {
    onDelete(task._id);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{task.text}</Card.Title>
        <Card.Text>
          Category: {task.category}
          <br />
          Done: {task.done ? "Yes" : "No"}
        </Card.Text>
        <Button variant="primary" onClick={handleUpdateClick}>
          Update
        </Button>{" "}
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
