import "./App.css";
import Navbar from "./components/navbar/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  BrowserRouter,
} from "react-router-dom";

import Login from "./components/login/Login";
import CreateItem from "./components/add-item/Create-item";

function App() {
  return (
    <div className="app-container">
      <Router>
        {/* <Route path="/login" element={} /> */}
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/create" element={<CreateItem />} />
          {/* <Login /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
