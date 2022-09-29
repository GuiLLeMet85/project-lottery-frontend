import './App.css';
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import UserBets from './views/UserBets';
import UserProfile from './views/auth/UserProfile';
import NewBet from './views/NewBet';
import BetDetails from './views/BetDetails';
import Footer from './components/Footer';
import Primitivas from './views/Primitivas';


function App(props) {
  
  const location = useLocation();
  const isCurrentURL = (url) => {
      return location.pathname.toLowerCase() === url.toLowerCase();
  }
  
  return (
    <div className="App">

      <Toaster/>
   
      { isCurrentURL('/') ? null: <Navbar /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/resultados-primitiva/" element={<Primitivas />} />
        <Route path="/perfil-usuario/" element={<IsPrivate><UserProfile /></IsPrivate>} />
        <Route path="/apostar-primitiva/" element={<IsPrivate><NewBet/></IsPrivate>}/>
        <Route path="/listado-apuestas-primitiva/" element={<IsPrivate><UserBets/></IsPrivate>}/> 
        <Route path="/detalles-apuesta/:id" element={<IsPrivate><BetDetails/></IsPrivate>}/> 
        <Route path="/private" element={<IsPrivate><PrivateView/></IsPrivate>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
