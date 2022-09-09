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
import ResultsAndStadistic from './views/ResultsAndStadistics';
import BetUserDetails from './views/BetUserDetails';
import UserProfile from './views/auth/UserProfile';
import NewUserBet from './views/NewUserBet';
import BetDetails from './views/BetDetails';


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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-profile/:id" element={<IsPrivate><UserProfile /></IsPrivate>} />
        <Route path="/new-bet-primitiva/:id" element={<IsPrivate><NewUserBet/></IsPrivate>}/>
        <Route path="/user-bets-primitiva/:id" element={<IsPrivate><UserBets/></IsPrivate>}/>
        <Route path="/bet-details-primitiva/:id" element={<IsPrivate><BetUserDetails/></IsPrivate>}/>
       
        <Route path="/results-stadistics-primitiva" element={<ResultsAndStadistic />} />
        <Route path="/results-primitiva-details/id" element={<BetDetails />} />

        <Route path="/private" element={<IsPrivate><PrivateView/></IsPrivate>}/>
   
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
