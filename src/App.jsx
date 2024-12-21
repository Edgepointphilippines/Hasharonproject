import React from 'react';
import { Link } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './assets/components/navbar/Navbar';
import Section1 from './assets/components/section1/Section1';
import Section2 from './assets/components/section2/Section2';
import Section3 from './assets/components/section3/Section3';
import Section4 from './assets/components/section4/Section4';
import Footer from './assets/components/footer/Footer';
import AdminDashboardPage from './assets/pages/AdminDashboardPage';


function App() {
  return (
    <Router>
      <Navbar />  
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Section1 />
              <Section2 />
              <hr />
              <h2 className="text-center mt-5" id="categories">Categories</h2>
              <Section3 />
              <Section4 />
              <Footer />
            </>
          }
        />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;


