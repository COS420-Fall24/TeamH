import React from 'react';
import './App.css';
import LoginWidget from './LoginWidget';
import InputBox from './InputBox';

function App() {
    const [count, setCount] = React.useState(0);
  
    const handleClick = () => {
      setCount(count + 1);
    };
    
  
    return (
      <div className="App">
        <LoginWidget/>
        <header className="App-header">
          <p>
            Hello User press Input Code and press Breakdown to begin!
          </p>
          <button type="button" onClick={handleClick}>Breakdown</button>
          <p>
            Breakdowns {count}
          </p>
        </header>
      </div>
    );
  }

export default App;
