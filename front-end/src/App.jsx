import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      {/* <Routes> */}
        {/* <Route path="/login" element={} /> */}
          <Navbar />
          <Login />
      {/* </Routes> */}
    </Router>
  );
}

export default App;
