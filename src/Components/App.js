import React, {useState} from 'react';
import '../css/App.css';
import dice from '../assets/d20-blue.png';

const App = () => {
 const [playerOneRoll, setPlayerOneRoll] = useState(null);
 const [playerTwoRoll, setPlayerTwoRoll] = useState(null);
 const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
 const [winningPlayer, setWinningPlayer] = useState('');
 const [playerOneWins, setPlayerOneWins] = useState(0);
 const [playerTwoWins, setPlayerTwoWins] = useState(0);

  const getDiceRoll = () => {
    let newRoll = Math.floor(Math.random() * 20 + 1);
    if (isPlayerOneTurn) {
      setPlayerOneRoll(newRoll);
      setIsPlayerOneTurn(false);
    } 
    if (!isPlayerOneTurn) {
      setPlayerTwoRoll(newRoll);
      setIsPlayerOneTurn(true);
      determineWinner();
    }
  };

  const determineWinner = () => {
    // determine Winner IS being called after player 2's roll is set
    if (playerOneRoll > playerTwoRoll) {
      setWinningPlayer('Player One Wins!');
      addPlayerWin();
    } else if (playerOneRoll < playerTwoRoll) {
      setWinningPlayer('Player Two Wins!');
      addPlayerWin();
    } else if (playerOneRoll === playerTwoRoll) {
      setWinningPlayer('DRAW!');
    };
  }

  const addPlayerWin = () => {
    let playerOne = 0;
    if (winningPlayer === 'Player One Wins!') {
      playerOne++;
      setPlayerOneWins({playerOne});
    } 
    if (winningPlayer === 'Player Two Wins!') {
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
        <p>Total Wins: {playerOneWins}</p>
        {/* {playerOneWins && <p>Total Wins: {playerOneWins}</p>} */}
      </section>
      <section className='center-section'>
        <img className='blue-dice-png-button' src={dice} alt='Blue 20 sided polyhedral dice' onClick={getDiceRoll}/>
        {isPlayerOneTurn ? <h2 className='title'>Roll The Dice Player One!!</h2> : <h2 className='title'>Roll The Dice Player Two!!</h2>}
        {playerOneRoll && <p className='current-roll'>Player One: {playerOneRoll}</p>}
        {playerTwoRoll && <p className='current-roll'>Player Two: {playerTwoRoll}</p>}
        {winningPlayer ? <h3>{winningPlayer}</h3> : <p></p>}
        {winningPlayer && <div className='reset-button' onClick={resetNextTurn}>Roll Again?</div>}
      </section>
      <section className='player-two-section'>
        <h1 className='player-two-title title'>Player Two</h1>
        <p>Total Wins: {playerTwoWins}</p>
        {/* {playerTwoWins && <p>Total Wins: {playerTwoWins}</p>} */}
      </section>
    </div>
  </section>
)

}

export default App;
