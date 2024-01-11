import './App.css';
import Hello from './components/Hello';
import Navbar from './components/navbar/Navbar';
import Home from './components/Home';
import NotFound from './components/not-found/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryDetails from './components/categories/CategoryDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>

        <Routes>
            
          <Route exact path="/" element={<Home />} />
            
          {/* this is route parameter */}
          <Route path="/items/category/:id" element={<CategoryDetails />} /> 
                       
          {/* catch any other path */}
          <Route path="*" element={<NotFound/>}/> 
            
          </Routes>
      </div>
    </Router>
  );
}

export default App;
