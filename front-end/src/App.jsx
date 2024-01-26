import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import NotFound from "./components/not-found/NotFound";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryDetails from "./components/categories/CategoryDetails";
import ItemDetails from "./components/items/ItemDetails";
import Login from "./components/login/Login";
import CreateItem from "./components/add-item/Create-item";
import Register from "./components/login/Register";
import Views from "./components/views/Views";

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items/category/:id" element={<CategoryDetails />} />
          <Route path="items/:id" element={<ItemDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/items/create" element={<CreateItem />} />
          <Route path="/views" element={<Views />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;