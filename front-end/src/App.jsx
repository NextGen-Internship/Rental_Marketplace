import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import NotFound from './components/not-found/NotFound';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryDetails from './components/categories/CategoryDetails';
import ItemDetails from './components/items/ItemDetails';
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('google_token') || !!localStorage.getItem('token'));

  const handleLogin = () => {
    localStorage.setItem('google_token', localStorage.getItem('google_token')); 
    //localStorage.setItem('token', localStorage.getItem('token')); 
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('google_token');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/items/category/:id" element={<CategoryDetails />} />
          <Route path="items/:id" element={<ItemDetails />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
