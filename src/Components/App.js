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
    console.log('newroll', newRoll)
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


    // Draw does note work 
    // conditions aren't working for player 2 and draw


    if (playerOneRoll > playerTwoRoll) {
      setWinningPlayer('Roller One Wins!');
      addPlayerWin();
      console.log('player 1 won')
    } 
    if (playerOneRoll < playerTwoRoll) {
      setWinningPlayer('Roller Two Wins!');
      addPlayerWin();
      console.log('player 2 wins')
    } 
    if (playerOneRoll === playerTwoRoll) {
      setWinningPlayer('DRAW!');
      console.log('DRAW!')
    }
    // setTimeout(() => {
    //   setPlayerOneRoll(null);
    //   setPlayerTwoRoll(null);
    //   setWinningPlayer('');
    // }, "2000");
  }

  const addPlayerWin = () => {
    //function is invoked, but conditions are not met.
    // object in state might be tricky using hooks per google (investigate further)
    // console.log('add player win function')
    if (winningPlayer === 'Roller One Wins!') {
      // playerWins.playerOneWins++;
      setPlayerOneWins(playerOneWins + 1);
      console.log('addPlayerWin condition work?')
    } 
    if (winningPlayer === 'Roller Two Wins!') {
      setPlayerTwoWins(playerTwoWins + 1);
    }
    // if (winningPlayer !== 'Roller One Wins!' || winningPlayer !== 'Roller Two Wins!') {
    //   return;
    // }

    // setTimeout(() => {
    //   setPlayerOneRoll(null);
    //   setPlayerTwoRoll(null);
    //   setWinningPlayer('');
    // }, "2000");
  }

return (
  <section className='app'>
    <h1 className='rollies-title title'>Rollies!!</h1>
    <div className='all-sections-div'>
      <section className='player-one-section'>
        <h1 className='player-one-title title'>Player One</h1>
        {!playerOneWins && <p>Total Wins: {playerOneWins}</p>}
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
        {!playerTwoWins && <p>Total Wins: {playerTwoWins}</p>}
      </section>
    </div>
  </section>
)

}

export default App;
