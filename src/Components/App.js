import React, {useState} from 'react';
import '../css/App.css';
import dice from '../assets/d20-blue.png';

const App = () => {
 const d20 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

 const [playerOneRoll, setPlayerOneRoll] = useState(null);
 const [playerTwoRoll, setPlayerTwoRoll] = useState(null);
 const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
 const [winningPlayer, setWinningPlayer] = useState('');
 const [playerWins, setPlayerWins] = useState({playerOneWins: [], playerTwoWins: []});
  

  const getDiceRoll = () => {
    let newRoll = Math.floor(Math.random() * d20.length);
    if (isPlayerOneTurn) {
      setPlayerOneRoll(newRoll);
      setIsPlayerOneTurn(false);
    } 
    if (!isPlayerOneTurn) {
      setPlayerTwoRoll(newRoll);
      setIsPlayerOneTurn(true);
    }
    if (playerOneRoll && playerTwoRoll) {
      determineWinner();
    }
  };

  const determineWinner = () => {
    if ((playerOneRoll && playerTwoRoll) && playerOneRoll > playerTwoRoll) {
      setWinningPlayer('Roller One Wins!');
      setPlayerOneRoll(0);
      // setPlayerTwoRoll(0);
      console.log('player one wins!')
    } else {
      setWinningPlayer('Roller Two Wins!');
      // setPlayerOneRoll(0);
      setPlayerTwoRoll(0);
      console.log('player two wins!!!')
    }

  }

return (
  <section className='app'>
    <h1 className='rollies-title title'>Rollies!!</h1>
    <div className='all-sections-div'>
      <section className='player-one-section'>
        <h1 className='player-one-title title'>Roller One</h1>
        <p>{}</p>
      </section>
      <section className='center-section'>
        <img className='blue-dice-png-button' src={dice} alt='red 20 sided polyhedral dice' onClick={getDiceRoll}/>
        {isPlayerOneTurn ? <h2 className='title'>Roll The Dice Roller One!!</h2> : <h2 className='title'>Roll The Dice Roller Two!!</h2>}
        {playerOneRoll && <p className='current-roll'>Roller One: {playerOneRoll}</p>}
        {playerTwoRoll && <p className='current-roll'>Roller Two: {playerTwoRoll}</p>}
        {winningPlayer && <h3>{winningPlayer}</h3>}
      </section>
      <section className='player-two-section'>
        <h1 className='player-two-title title'>Roller Two</h1>
        {!playerWins.playerTwoWins && <p>Total Wins: {}</p>}
      </section>
    </div>
  </section>
)

}

export default App;
