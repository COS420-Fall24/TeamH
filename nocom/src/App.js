import React from 'react';
import Screen from './screen'; // Ensure the path and casing are correct
import LoginWidget from './LoginWidget'; // Example child component

const App = () => {
  return (
    <Screen>
      <h1>Hello, World!</h1> {/* Test with a simple element */}
      <LoginWidget /> {/* Replace with your actual content */}
    </Screen>
  );
};

export default App;
