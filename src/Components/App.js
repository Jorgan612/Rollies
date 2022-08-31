import React, { useState, useEffect, useCallback } from 'react';
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
    } else {
      setPlayerTwoRoll(newRoll);
      setIsPlayerOneTurn(true);
    }
  }

  /*
   useEffect is allowing setPlayerTwoRoll to update state AND allow for the all logic in determineWinner to work BUT it is creating an infinite loop when the die is clicked a third time without reseting the state AND / OR playerOneRoll and playerTwoRoll have a truthy value the loop happens. 
   The loops DOES NOT happen on an outcome of "DRAW!" because addPlayerWin function is not being called on draw. 

   The loop stops once 'Roll Again?' button has been clicked and state for player rolls have been reset. 
   */

   /* 
   8/31/2022 Note:
   Added useCallback() effect to see if that will prevent repeated re-renders if the state remains the same. 
   Having difficulty with array dependency on determineWinner function. when addPlayerWin is added to the useCallback array dependency it goes back to creating the infinite loop. 
   */

  useEffect(() => {
    playerOneRoll && playerTwoRoll && determineWinner();
  })

  // old function 

  // const determineWinner = () => {
  //   console.log('player 1 roll --', playerOneRoll);
  //   console.log('player 2 roll --', playerTwoRoll);

  //   if (playerOneRoll > playerTwoRoll) {
  //     setWinningPlayer('Player One Wins!');
  //     addPlayerWin();
  //   } else if (playerOneRoll < playerTwoRoll) {
  //     setWinningPlayer('Player Two Wins!');
  //     addPlayerWin();
  //   } else if (playerOneRoll === playerTwoRoll) {
  //     setWinningPlayer('DRAW!');
  //   }
  // }

  
  // including a return statement in each if block or at the end of the function block for addPlayerWin is NOT preventing the loop.

  const addPlayerWin = useCallback(() => {
    if (winningPlayer === 'Player One Wins!') {
      setPlayerOneWins(playerOneWins + 1);
    } 
    if (winningPlayer === 'Player Two Wins!') {
      setPlayerTwoWins(playerTwoWins + 1);
    }
  }, [setPlayerOneWins, setPlayerTwoWins, winningPlayer, playerOneWins, playerTwoWins])

  // OLD FUNCTION BELOW
  // const addPlayerWin = () => {
  //   if (winningPlayer === 'Player One Wins!') {
  //     setPlayerOneWins(playerOneWins + 1);
  //   } 
  //   if (winningPlayer === 'Player Two Wins!') {
  //     setPlayerTwoWins(playerTwoWins + 1);
  //   }
  // }

  const determineWinner = useCallback(() => {
    console.log('player 1 roll --', playerOneRoll);
    console.log('player 2 roll --', playerTwoRoll);

    if (playerOneRoll > playerTwoRoll) {
      setWinningPlayer('Player One Wins!');
      addPlayerWin();
    } else if (playerOneRoll < playerTwoRoll) {
      setWinningPlayer('Player Two Wins!');
      addPlayerWin();
    } else if (playerOneRoll === playerTwoRoll) {
      setWinningPlayer('DRAW!');
    }
  }, [playerTwoRoll]) 

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
        {isPlayerOneTurn ? <h2 className='title'>Roll the die Player One!!</h2> : <h2 className='title'>Roll The Die Player Two!!</h2>}
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
