import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Column from "./components/Column";
import Stirrups from "./components/Stirrups";
import Slab from "./components/Slab";
import Footing from "./components/Footing";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Column />} />
          <Route path="/stirrups" element={<Stirrups />} />
          <Route path="/slab" element={<Slab />} />
          <Route path="/footing" element={<Footing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
