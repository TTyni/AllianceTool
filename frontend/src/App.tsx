import "./App.css";
import LoginForm from "./LoginForm";
import AllianceList from "./AllianceList";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Planner from "./Planner";
import { Container } from "react-bootstrap";

function App() {
  const padding = { padding: 5 };
  return (
    <Container>
      <Router>
        <div>
          <Link style={padding} to="/">
            Login
          </Link>
          <Link style={padding} to="/allytool">
            ally tool
          </Link>
          <Link style={padding} to="/planner">
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
