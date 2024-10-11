import logo from './logo.svg';
import './App.css';
import * as React from 'react'

function App() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello User press Breakdown to begin!
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
