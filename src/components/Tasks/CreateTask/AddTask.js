import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTask.scss";

function AddTaskControlled() {
  const history = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) {
      setError("Please enter a task title.");
      return;
    }
    const newTask = {
      id: Date.now(),
      ...task,
    };
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([...storedTasks, newTask]));
    history("/tasks");
  };

  return (
    <div className="add-task-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Task Title:
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Task Description:
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTaskControlled;
