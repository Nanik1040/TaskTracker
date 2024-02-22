import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TaskDetails.scss";

function TaskDetails() {
  const { id } = useParams();
  const history = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const selectedTask = storedTasks.find((task) => task.id === parseInt(id));
    if (!selectedTask) {
      history("/");
    } else {
      setTask(selectedTask);
    }
  }, [id, history]);

  const toggleCompletion = () => {
    const updatedTask = { ...task, completed: !task.completed };
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = storedTasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTask(updatedTask);
  };

  return (
    <div className="task-details-container">
      {task ? (
        <div className="task-details">
          <h2>{task.title}</h2>
          <p className="task-description">{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>
            Completion Status:{" "}
            <span className={task.completed ? "completed" : "pending"}>
              {task.completed ? "Completed" : "Pending"}
            </span>
          </p>
          <button
            className="toggle-completion-button"
            onClick={toggleCompletion}
          >
            {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TaskDetails;
