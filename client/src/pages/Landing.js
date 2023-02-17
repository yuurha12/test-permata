import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import "../style/Home.css";
import "../style/Card.css"
import Auth from "../components/auth/auth";
import Hero from "../components/hero/Hero";

import Card1 from "../components/card/Todo";

function Landing() {
  return (
    <div className="landing-page">
      <Container>
        <Row>
          <Hero />
          <Col className="form-section">
            <Form>
              <Auth />
            </Form>
          </Col>
        </Row>
        <Card1 />
      </Container>
    </div>
  );
}

export default Landing;
