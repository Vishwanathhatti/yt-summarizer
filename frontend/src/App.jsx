import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Result from '@/pages/Result';
import Footer from '@/components/Footer';

import Navbar from '@/components/Navbar';

function App() {
  return (
    <Router basename={import.meta.env.VITE_BASE_URL}>
      <div className="flex flex-col min-h-screen font-sans antialiased text-foreground bg-background">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
