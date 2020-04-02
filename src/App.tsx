import React from 'react';
import './App.css';
import Chat from './components/chat'
import TicTacToe from './components/tic-tac-toe';

function App() {
  return (
    <div className="App">
      <TicTacToe />
      <Chat />
    </div>
  );
}

export default App;
