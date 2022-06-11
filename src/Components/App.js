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
      determineWinner();
    }
  };

  const determineWinner = () => {
    // better BUT now the winningPlayer is off / inaccurate
    // will only sometimes say player two wins!
    // draw condition written BUT will also show draw if you click too quickly and one of the values is still Null. 
    // setTimeout is not preventing additional clicks
    // and if clicked during set timeout the new roll for the next player is cleared at the end of the setTimeout.
    if (playerOneRoll > playerTwoRoll) {
      setWinningPlayer('Roller One Wins!');
    } else if (playerOneRoll < playerTwoRoll) {
      setWinningPlayer('Roller Two Wins!');
    } else if (playerOneRoll === playerTwoRoll) {
      setWinningPlayer('DRAW!');
    }
    setTimeout(() => {
      setPlayerOneRoll(null);
      setPlayerTwoRoll(null);
      setWinningPlayer('');
    }, "2000")

  }

return (
  <section className='app'>
    <h1 className='rollies-title title'>Rollies!!</h1>
    <div className='all-sections-div'>
      <section className='player-one-section'>
        <h1 className='player-one-title title'>Player One</h1>
        {!playerWins.playerTwoWins && <p>Total Wins: {}</p>}
      </section>
      <section className='center-section'>
        <img className='blue-dice-png-button' src={dice} alt='red 20 sided polyhedral dice' onClick={getDiceRoll}/>
        {isPlayerOneTurn ? <h2 className='title'>Roll The Dice Player One!!</h2> : <h2 className='title'>Roll The Dice Player Two!!</h2>}
        {playerOneRoll && <p className='current-roll'>Player One: {playerOneRoll}</p>}
        {playerTwoRoll && <p className='current-roll'>Player Two: {playerTwoRoll}</p>}
        {winningPlayer ? <h3>{winningPlayer}</h3> : <p></p>}
      </section>
      <section className='player-two-section'>
        <h1 className='player-two-title title'>Player Two</h1>
        {!playerWins.playerTwoWins && <p>Total Wins: {}</p>}
      </section>
    </div>
  </section>
)

}

export default App;
