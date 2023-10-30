import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

import CategorySelection from './components/CategorySelection';
import Quiz from './components/Quiz'


function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <div className='App'>
          <Routes>
            <Route path='/' element={<CategorySelection />} />
            <Route path='/quiz/:category/:difficulty' element={<Quiz />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App
