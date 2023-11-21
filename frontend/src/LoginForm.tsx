import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LoginForm = () => {
  return (
    <>
      <Container className="align-self-center">
        <Row>
          <Col>
            <Form className="login ">
              <Form.Group className="m-3">
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                ></Form.Control>
              </Form.Group>

              <Form.Group className="m-3">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                ></Form.Control>
              </Form.Group>

              <Form.Group className="m-3">
                <Form.Control
                  type="allyKey"
                  placeholder="Enter allykey"
                ></Form.Control>
              </Form.Group>

              <Button className="justify-content-center" variant="primary">
                register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginForm;
