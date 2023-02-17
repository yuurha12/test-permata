import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../contexts/UserContexts";

const Auth = () => {
  const [state, dispatch] = useContext(UserContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const requestLogin = {
        email: form.email,
        password: form.password,
      };
      const response = isSignUp
        ? await API.post("/register", form)
        : await API.post("/login", requestLogin);

      if (response.status === 200 && isSignUp) {
        setIsSignUp(false);
        setForm({ name: "", email: "", password: "" });
        setMessage(<Alert variant="success">Registration success</Alert>);
      }

      if (response.status === 200 && !isSignUp) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
      }
    } catch (e) {
      console.log(e);
      const alert = <Alert variant="danger">{e.response.data.message}</Alert>;
      setMessage(alert);
    }
  });

  return (
    <div className="d-flex align-items-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <h1 className="mb-5">Welcome to My App</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  name="email"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              {isSignUp && (
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              )}
              <Button
                variant="primary"
                onClick={(e) => handleFormSubmit.mutate(e)}
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </Button>
            </Form>
            <div className="mt-3">
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <Button variant="link" onClick={() => setIsSignUp(false)}>
                    Log In
                  </Button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <Button variant="link" onClick={() => setIsSignUp(true)}>
                    Sign Up
                  </Button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
