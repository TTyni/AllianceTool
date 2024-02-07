import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import loginServices from "./loginServices";
import Container from "react-bootstrap/Container";
import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log(loginServices.logIn(username, password));
  };
  const register = () => {
    loginServices.registerUser(username, password);
  };

  console.log(username);
  console.log(password);
  return (
    <>
      <Container>
        <Form className="login col-3">
          <Form.Group className="m-3">
            <Form.Control
              type="username"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="m-3">
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={() => register()}>
            register
          </Button>
          <Button variant="secondary" onClick={() => login()}>
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default LoginForm;
