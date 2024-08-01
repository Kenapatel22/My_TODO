import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import "./Home.css"; // Import the CSS module

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleToggle = (id) => {
    const todo = todos.find(todo => todo._id === id);
    if (!todo) {
      console.error("Todo not found");
      return;
    }

    const updatedTodo = { ...todo, completed: !todo.completed };

    axios.patch(`http://localhost:3001/update/${id}`, { completed: updatedTodo.completed })
      .then(() => {
        setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h1>My To-Do List</h1>
      <div className="createContainer">
        <Create onAddTodo={(todo) => setTodos([...todos, todo])} />
      </div>
      <div className="todoList">
        {todos.length === 0 ? (
          <div className="noRecords"><h2>No Records</h2></div>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className="todoItem">
              <input 
                type="checkbox" 
                checked={todo.completed}
                onChange={() => handleToggle(todo._id)} 
              />
              <span className={todo.completed ? 'completed' : ''}>{todo.task}</span>
              <button 
                className="button deleteButton" 
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
