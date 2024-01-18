import './App.css';
import Hello from './components/Hello';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import NotFound from './components/not-found/NotFound';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryDetails from './components/categories/CategoryDetails';
import ItemDetails from './components/items/ItemDetails';
import Login from "./components/login/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>

        <Routes>
            
          <Route exact path="/" element={<Home />} />
          <Route path="/items/category/:id" element={<CategoryDetails />} /> 
          <Route path="items/:id" element={<ItemDetails />} />   
          <Route exact path="/login" element={<Login />} />          
          <Route path="*" element={<NotFound/>}/> 
          <Route path="/notfound" element={<NotFound/>}/> 
            
        </Routes>

          <Footer />
      </div>
    </Router>

  );
}

export default App;
