import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Historys from './pages/Historys';
import Charts from './pages/Charts';
import Navbar from './components/navbar';

function App() {
    return (
        <Router>
            <div className='App'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Historys />}></Route>
                    <Route path='/charts' element={<Charts />}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
