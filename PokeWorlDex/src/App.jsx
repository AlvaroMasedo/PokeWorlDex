import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Mapa from './Mapa.jsx'
import Pokedex from './Pokedex.jsx'
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <button>
          <Link to="/pokedex">Pokedex</Link>
        </button>
        <button>
          <Link to="/mapa">Mapa</Link>
        </button>
      </div>

      <Routes>
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/mapa" element={<Mapa />} />
      </Routes>
    </Router>
  )
}

export default App
