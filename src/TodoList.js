import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Button,
  Checkbox,
  ListItem,
  UnorderedList,
} from 'carbon-components-react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setIsEditing(index);
    setCurrentText(todos[index].text);
  };

  const saveTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: currentText } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(null);
    setCurrentText('');
  };

  return (
    <div className="todo-container">
      <div className="todo-input-container">
        <TextInput
          id="todo-input"
          labelText="Novo opravilo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={addTodo} className="add-button">
          Dodaj
        </Button>
      </div>
      <UnorderedList className="todo-list">
        {todos.map((todo, index) => (
          <ListItem key={index} className="todo-item">
            {isEditing === index ? (
              <>
                <TextInput
                  id={`edit-input-${index}`}
                  value={currentText}
                  onChange={(e) => setCurrentText(e.target.value)}
                />
                <Button onClick={() => saveTodo(index)} className="save-button">
                  Shrani
                </Button>
              </>
            ) : (
              <>
                <Checkbox
                  labelText={todo.text}
                  checked={todo.completed}
                  id={`checkbox-${index}`}
                  onChange={() => toggleComplete(index)}
                />
                <Button onClick={() => startEditing(index)} className="edit-button">
                  Uredi
                </Button>
                <Button onClick={() => deleteTodo(index)} className="delete-button">
                  Izbriši
                </Button>
              </>
            )}
          </ListItem>
        ))}
      </UnorderedList>
    </div>
  );
};

export default TodoList;
