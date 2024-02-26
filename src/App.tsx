import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <main className='flex h-screen'>
        <Sidebar />
        <div className='w-full'>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
