import React, { useState, useEffect } from 'react';
import '../css/App.css';
import dice from '../assets/d20-blue.png';

const App = () => {
 const [playerOneRoll, setPlayerOneRoll] = useState(null);
 const [playerTwoRoll, setPlayerTwoRoll] = useState(null);
 
 const [isDisabled, setIsDisabled] = useState(false);
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
      setIsDisabled(true);
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
    setTimeout(resetNextTurn, 2000);
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
      setIsDisabled(false);
  }

return (
  <section className='app'>
    <h1 className='rollies-title title'>Rollies!!</h1>
    <div className='all-sections-div'>
      <section className='player-one-section'>
        <h1 className='player-one-title title'>Player One</h1>
        {playerOneWins && <div className='total-wins-div'>
          <p className='total-wins title'>Wins</p>
          <p className='number-of-wins title'>{playerOneWins}</p>
        </div>}
      </section>
      <section className='center-section'>
        {!isDisabled ? <img className='blue-dice-png-button' src={dice} alt='Blue 20 sided polyhedral dice'  onClick={getDiceRoll}/> : <img className='blue-dice-png-button' src={dice} alt='Blue 20 sided polyhedral dice' />}
        {!isDisabled && <div className='player-turn-div'>
        {isPlayerOneTurn && <h2 className='current-roller title'>Roll, Player One!!</h2>}
        {!isPlayerOneTurn && <h2 className='current-roller title'>Roll, Player Two!!</h2>}
        </div>}
        {playerOneRoll && <p className='current-roll one title'>Player One: {playerOneRoll}</p>}
        {playerTwoRoll && <p className='current-roll title'>Player Two: {playerTwoRoll}</p>}
        {winningPlayer && <h3 className='winning-player title'>{winningPlayer}</h3>}
      </section>
      <section className='player-two-section'>
        <h1 className='player-two-title title'>Player Two</h1>
       {playerTwoWins && <div className='total-wins-div'>
          <p className='total-wins title'>Wins</p>
          <p className='number-of-wins title'>{playerTwoWins}</p>
        </div>}
      </section>
    </div>
  </section>
  )
}

export default App;
