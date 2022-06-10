import React, {useState} from 'react';
import '../css/App.css';
import dice from '../assets/d20-blue.png';

const App = () => {
 const d20 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

 const [currentRoll, setCurrentRoll] = useState(0)
 const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  // state for each player (player 1, player 2)
  // state for whos turn it currently is
  // 
  

  const getDiceRoll = () => {
    let newRoll = Math.floor(Math.random() * d20.length);
    setCurrentRoll(newRoll)
  };

return (
  <section className='app'>
    <h1 className='rollies-title title'>Rollies!!</h1>
    <div className='all-sections-div'>
      <section className='player-one-section'>
        <h1 className='player-one-title title'>Roller One</h1>
        
      </section>
      <section className='center-section'>
        <img className='blue-dice-png-button' src={dice} alt='red 20 sided polyhedral dice' onClick={getDiceRoll}/>
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
