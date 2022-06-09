import React, {useState} from 'react';
import '../css/App.css';
import dice from '../assets/d20-blue.png';

const App = () => {
 const d20 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
 
  // state for each player 
  // state for whos turn 
  // 
  

return (
  <section className='app'>
    <h1 className='rollies-title title'>Rollies!!</h1>
    <div className='all-sections-div'>
      <section className='player-one-section'>
        <h1 className='player-one-title title'>Roller One</h1>
        
      </section>
      <section className='center-section'>
        <img className='blue-dice-png-button' src={dice} alt='red 20 sided polyhedral dice'/>
        <h2 className='title'>Roll The Dice!!</h2>
      </section>
      <section className='player-two-section'>
        <h1 className='player-two-title title'>Roller Two</h1>

      </section>
    </div>
  </section>
)

}

export default App;
