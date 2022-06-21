import React, {useState} from 'react';
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
      determineWinner();
    } 
    if (!isPlayerOneTurn) {
      setPlayerTwoRoll(newRoll);
      setIsPlayerOneTurn(true);
      determineWinner();
    }
  };

  const determineWinner = () => {
    // better BUT now the winningPlayer is off / inaccurate
    // draw condition written BUT will also show draw if you click too quickly and one of the values is still Null. 
    // setTimeout is not preventing additional clicks
    // and if clicked during set timeout the new roll for the next player is cleared at the end of the setTimeout.
    if (playerOneRoll === null || playerTwoRoll === null) {
      console.log('play 1 or 2 null condition?')
      return;
    } else if (playerOneRoll > playerTwoRoll) {
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
    if (winningPlayer === 'Player One Wins!') {
      setPlayerOneWins(playerOneWins + 1);
      console.log('setplayerONEwins', playerOneWins)
    } 
    if (winningPlayer === 'Player Two Wins!') {
      setPlayerTwoWins(playerTwoWins + 1);
      console.log('setplayerTWOwins', playerTwoWins)
    }

    setTimeout(() => {
      setPlayerOneRoll(null);
      setPlayerTwoRoll(null);
      setWinningPlayer('');
    }, "2000");
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
        {isPlayerOneTurn ? <h2 className='title'>Roll The Dice Player One!!</h2> : <h2 className='title'>Roll The Dice Player Two!!</h2>}
        {playerOneRoll && <p className='current-roll'>Player One: {playerOneRoll}</p>}
        {playerTwoRoll && <p className='current-roll'>Player Two: {playerTwoRoll}</p>}
        {winningPlayer ? <h3>{winningPlayer}</h3> : <p></p>}
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
