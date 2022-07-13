import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Top from './components/Top';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import EmailVerify from './components/EmailVerify';

function MyRoutes() {
    var userData =  JSON.parse(localStorage.getItem("userData")) || null;
    return(
        <Router>
            <Routes>
                <Route path="/" element={userData ? <Navigate to="/dashboard"/>:<Top/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/signin" element={<Signin/>} />
                <Route path="/email-verification/:token" element={<EmailVerify/>} />
                <Route path="/dashboard" element={userData ? <Dashboard/>:<Navigate to="/" replace/>} /> 
                <Route path="/dashboard/*" element={userData ? <Dashboard/>:<Navigate to="/" replace/>} />                
            </Routes>
        </Router>
    )
}
export default MyRoutes;