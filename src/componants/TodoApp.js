import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  const saveTasks = (tasks) => {
    setTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTasks = [...tasks, { id: Date.now(), text: newTask }];
    saveTasks(newTasks);
    setNewTask("");
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    saveTasks(newTasks);
  };

  const startEditTask = (task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.text);
  };

  const updateTask = (id) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, text: editTaskText } : task
    );
    saveTasks(newTasks);
    setEditTaskId(null);
    setEditTaskText("");
  };

  return (
    <div className="TodoApp">
      <h1 className='title'>Todo List</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter the task...."
        />
        <button className='btn btn-success' onClick={addTask}>Add</button>
      </div>
      <ul className="list-group  task-list">
        {tasks.map(task => (
          <li className='list-group-item ' key={task.id}>
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <button className='btn btn-info' onClick={() => updateTask(task.id)}>Update</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <div>
                <FontAwesomeIcon className="btn btn-primary" icon={faPenToSquare} onClick={() => startEditTask(task)}/> 

                <FontAwesomeIcon className="btn btn-danger m-1" icon={faTrash} onClick={() => deleteTask(task.id)}/>
                 
                 
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
