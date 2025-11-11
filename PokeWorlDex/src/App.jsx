import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Mapa from './Mapa.jsx'
import Pokedex from './Pokedex.jsx'
import './App.css';


function App() {
  return (
    <Router>
      <header className="site-header">
        <div className="container">
          <h1 className="site-title">PokeWorlDex</h1>
          <nav className="main-nav" aria-label="Main Navigation">
            <ul>
              <li><Link to="/pokedex">Pokedex</Link></li>
              <li><Link to="/mapa">Mapa</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/mapa" element={<Mapa />} />
      </Routes>
    </Router>
  )
}

export default App
