import './App.css';
import Hello from './components/Hello';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
          { /* <Hello /> */}
      </div>
    </Router>
  );
}

export default App;
