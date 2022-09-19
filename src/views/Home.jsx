import React from 'react';
import {Link} from 'react-router-dom';
import trebolHome from '../img/trebol-home.png'

export default function Home() {

  return (
    <div className='home'>
        <div className='greed-home padding8h5w'>
            <h1>Lottery Wallet</h1>
            <img src={trebolHome} alt="trebol" className='trebol-home'></img>
        </div>
        <div className='bts-section-home padding2h5w'>
            <button className='bt-home radius25px bk-white'> <Link to="/login">Log in</Link></button>
            <button className='bt-home radius25px bk-blue'><Link to="/signup">Sign up</Link></button>
        </div>
    </div>
  )
}
