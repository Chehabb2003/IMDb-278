// import { useState, useEffect } from "react";
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route />
        </Routes>
      </div>
    </Router>
  );
}

export default App;