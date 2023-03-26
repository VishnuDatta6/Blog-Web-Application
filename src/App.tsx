import React from 'react';
import './App.css';
import Library from './components/Library';
import Newblog from './components/Newblog';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/newblog' element={<Newblog/>}/>
          <Route path="/" element={<Library/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
