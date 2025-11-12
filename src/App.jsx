import React from "react";
import { Routes, Route } from 'react-router-dom'
import Header from "./components/header";
import MenuGrid from "./components/menu-grid";
import Footer from "./components/footer";
import './App.css'

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<MenuGrid />} /> 
        <Route path="/item/:id" element={<ItemDetailPage />} /> 
      </Routes>      
      <Footer />
    </div>
  );
}

export default App;
