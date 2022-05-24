
import '../css/App.css';
import dice from '../assets/d20-blue.png';

const App = () => {
  // state for each player 
  // state for whos turn 
  // 
  

return (
  <section className='app'>
    <h1 className='rollies-title'>Rollies!!</h1>
    <div className='all-sections-div'>
      <section className='player-one-section'>
        <h1>Roller One</h1>
        
      </section>
      <section className='center-section'>
        <img className='blue-dice-png-button' src={dice} alt='red 20 sided polyhedral dice'/>
        <h2>Roll The Dice!!</h2>
      </section>
      <section className='player-two-section'>
        <h1>Roller Two</h1>

      </section>
    </div>
  </section>
)

}

export default App;
