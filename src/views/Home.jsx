import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {

  return (
    <div className='main-section'>

      <h1> Welcome to Lottery Wallet</h1>

      <div className='bts-section-home'>
        <button><Link to="/login">Log In</Link></button>
        <button><Link to="/signup">Sign In</Link></button>
      </div>

    </div>

  )
}
