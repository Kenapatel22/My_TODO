import { useState } from 'react';
import './Create.css' // Import the CSS module
import axios from 'axios'

function Create() {
  const [task, setTask]= useState()
  const handleAdd = ()=>{
      axios.post('http://localhost:3001/add',{task: task})
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }
  return (
    <div className="createContainer">
      <input type="text" placeholder="Enter a new todo" onChange={(e) => setTask(e.target.value)} />
      <button type="submit" onClick={handleAdd}>ADD</button>
    </div>
  );
}

export default Create;

