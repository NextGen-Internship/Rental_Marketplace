import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login2 from "./components/GoogleLogin";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Login2 />
      </div>
    </Router>
  );
}

export default App;
