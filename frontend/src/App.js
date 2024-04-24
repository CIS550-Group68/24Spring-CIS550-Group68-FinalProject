import React from 'react';
import './App.css';
import HomePage from './pages/Homepage';
import PaperPage from './pages/Paperpage';
import AuthorPage from './pages/Authorpage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
        <div>CIS505 Group68 Final Project</div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/paper/:paperId' element={<PaperPage/>}/>
                <Route path='/author/:authorId' element={<AuthorPage/>}/>
                </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
