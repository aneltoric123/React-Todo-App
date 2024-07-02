import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Button,
  Checkbox,
  ListItem,
  UnorderedList,
  DatePicker,
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
  const [dueDate, setDueDate] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, dueDate }]);
      setNewTodo('');
      setDueDate(null);
    }
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setIsEditing(id);
    setCurrentText(todoToEdit.text);
  };

  const saveTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: currentText } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(null);
    setCurrentText('');
  };

  const handleDateChange = (date) => {
    setDueDate(date);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const clearCompletedTodos = () => {
    const filteredTodos = todos.filter((todo) => !todo.completed);
    setTodos(filteredTodos);
  };

  const sortedTodos = todos.slice().sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  const filteredTodos = showCompleted ? sortedTodos : todos.filter((todo) => !todo.completed);

  return (
    <div className="todo-container">
      <div className="todo-input-container">
        <TextInput
          id="todo-input"
          labelText="Novo opravilo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <DatePicker
          id="due-date"
          datePickerType="single"
          onChange={handleDateChange}
          value={dueDate}
          labelText="Rok izpolnitve"
        />
        <Button onClick={addTodo} className="add-button">
          Dodaj opravilo
        </Button>
      </div>
      <div className="todo-actions">
        <Button onClick={toggleShowCompleted} className="filter-button">
          {showCompleted ? 'Skrij dokončana' : 'Prikaži dokončana'}
        </Button>
        <Button onClick={clearCompletedTodos} className="clear-button">
          Počisti dokončana
        </Button>
      </div>
      <UnorderedList className="todo-list">
        {filteredTodos.map((todo) => (
          <ListItem key={todo.id} className="todo-item">
            {isEditing === todo.id ? (
              <>
                <TextInput
                  id={`edit-input-${todo.id}`}
                  value={currentText}
                  onChange={(e) => setCurrentText(e.target.value)}
                />
                <Button onClick={() => saveTodo(todo.id)} className="save-button">
                  Shrani
                </Button>
              </>
            ) : (
              <>
                <Checkbox
                  labelText={todo.text}
                  checked={todo.completed}
                  id={`checkbox-${todo.id}`}
                  onChange={() => toggleComplete(todo.id)}
                />
                {todo.dueDate && (
                  <span className="due-date">Rok: {new Date(todo.dueDate).toLocaleDateString()}</span>
                )}
                <Button onClick={() => startEditing(todo.id)} className="edit-button">
                  Uredi
                </Button>
                <Button onClick={() => deleteTodo(todo.id)} className="delete-button">
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
