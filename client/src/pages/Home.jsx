import React from "react";
import { Container} from "react-bootstrap";
import "../style/Home.css";
import "../style/Card.css"

import TodoList from "../components/card/TodoList";

function Home() {
  return (
    <div className="Home-page">
      <Container>
        <TodoList />
      </Container>
    </div>
  );
}

export default Home;
