import "./App.css";
import LoginForm from "./LoginForm";
import AllianceList from "./AllianceList";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Planner from "./Planner";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Router >
        <div className="menu">
          <Link id="link" to="/">
            Login
          </Link>
          <Link id="link" to="/allytool">
            ally tool
          </Link>
          <Link id="link" to="/planner">
            Planner
          </Link>
        </div>

        <Routes>
          <Route path="/allytool" element={<AllianceList />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/planner" element={<Planner />}></Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
