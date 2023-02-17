import React, { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Badge,
} from "react-bootstrap";

export default function TodoList() {
  const [textInputDecoration, setTextInputDecoration] = useState("none");

  const handleCheckboxChange = () => {
    if (textInputDecoration === "none") {
      setTextInputDecoration("line-through");
    } else {
      setTextInputDecoration("none");
    }
  };

  return (
    <Card bg="white" style={{ width: "70%" }}>
      <Container className="text-center">
        <Row>
          <Col xs={3}>
            <div className="text-start m-3">
              <p className="fw-bold">All Tasks</p>
              <p>Favourites</p>
              <p>Groceries</p>
              <p>Work</p>
              <p>Study</p>
              <p>Sports</p>
              <p className="opacity-50">+ New category</p>
            </div>
          </Col>

          <Col xs={7}>
            <div className="m-3">
              <p className="text-start">TODO LIST</p>
              <InputGroup className="mb-3">
                <FormControl placeholder="Add a new task" />
              </InputGroup>
            </div>

            <div className="d-flex">
              <InputGroup className="mb-3">
                <InputGroup>
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    value="buy bananas for the pancake"
                    onChange={handleCheckboxChange}
                  />
                </InputGroup>
                <FormControl
                  aria-label="Text input with checkbox"
                  placeholder="buy bananas for the pancake"
                  style={{ textDecoration: textInputDecoration }}
                />
              </InputGroup>
              <Badge
              className="text-bg-success w-25 ms-2 mt-2"
              style={{ width: "80px", height: "100%" }}
              >
                Success
              </Badge>
            </div>

            <div className="d-flex">
              <InputGroup className="mb-3">
                <InputGroup>
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    value="buy bananas for the pancake"
                    onChange={handleCheckboxChange}
                  />
                </InputGroup>
                <FormControl
                  aria-label="Text input with checkbox"
                  placeholder="buy bananas for the pancake"
                  style={{ textDecoration: textInputDecoration }}
                />
              </InputGroup>
              <Badge
                className="text-bg-success w-25 ms-2 mt-2"
                style={{ width: "80px", height: "100%" }}
              >
                Success
              </Badge>
            </div>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}
