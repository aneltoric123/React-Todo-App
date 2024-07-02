import React from 'react';
import TodoList from './TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Seznam opravil</h1>
      </header>
      <TodoList />
    </div>
  );
}

export default App;
