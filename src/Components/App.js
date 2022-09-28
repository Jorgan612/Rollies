import React, { useState, useEffect } from 'react';
import '../css/App.css';
import dice from '../assets/d20-blue.png';

const App = () => {
 const [playerOneRoll, setPlayerOneRoll] = useState(null);
 const [playerTwoRoll, setPlayerTwoRoll] = useState(null);

 const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);

 const [winningPlayer, setWinningPlayer] = useState('');

 const [playerOneWins, setPlayerOneWins] = useState(null);
 const [playerTwoWins, setPlayerTwoWins] = useState(null);

  const getDiceRoll = () => {
    let newRoll = Math.floor(Math.random() * 20 + 1);
    if (isPlayerOneTurn) {
      setPlayerOneRoll(newRoll);
      setIsPlayerOneTurn(false);
    } else {
      setPlayerTwoRoll(newRoll);
      setIsPlayerOneTurn(true);
    }
  }

  useEffect(() => {
    if (playerTwoRoll !== null) {
      determineWinner();
    }
  }, [playerTwoRoll])


  const determineWinner = () => {

    if (playerOneRoll > playerTwoRoll) {
      setWinningPlayer('Player One Wins!');
      addPlayerWin(1);
    } else if (playerOneRoll < playerTwoRoll) {
      setWinningPlayer('Player Two Wins!');
      addPlayerWin(2);
    } else if (playerOneRoll === playerTwoRoll) {
      setWinningPlayer('DRAW!');
    }
  }

  const addPlayerWin = (winningPlayer) => {
    if (winningPlayer === 1) {
      setPlayerOneWins(playerOneWins + 1);
    } 
    if (winningPlayer === 2) {
      setPlayerTwoWins(playerTwoWins + 1);
    }
  }

  const resetNextTurn = () => {
      setPlayerOneRoll(null);
      setPlayerTwoRoll(null);
      setWinningPlayer('');
  }

return (
  <section className='app'>
    <h1 className='rollies-title title'>Rollies!!</h1>
    <div className='all-sections-div'>
      <section className='player-one-section'>
        <h1 className='player-one-title title'>Player One</h1>
        {playerOneWins && <p>Total Wins: {playerOneWins}</p>}
      </section>
      <section className='center-section'>
        <img className='blue-dice-png-button' src={dice} alt='Blue 20 sided polyhedral dice' onClick={getDiceRoll}/>
        {isPlayerOneTurn ? <h2 className='title'>Roll the die Player One!!</h2> : <h2 className='title'>Roll the die Player Two!!</h2>}
        {playerOneRoll && <p className='current-roll'>Player One: {playerOneRoll}</p>}
        {playerTwoRoll && <p className='current-roll'>Player Two: {playerTwoRoll}</p>}
        {winningPlayer && <h3>{winningPlayer}</h3>}
        {winningPlayer && <div className='reset-button' onClick={resetNextTurn}>Roll Again?</div>}
      </section>
      <section className='player-two-section'>
        <h1 className='player-two-title title'>Player Two</h1>
        {playerTwoWins && <p>Total Wins: {playerTwoWins}</p>}
      </section>
    </div>
  </section>
)

}

export default App;
