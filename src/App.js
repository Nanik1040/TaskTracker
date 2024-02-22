import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/Tasks/ViewTasks/TaskList";
import AddTask from "./components/Tasks/CreateTask/AddTask";
import TaskDetails from "./components/Tasks/ViewTaskDetails/TaskDetails";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/tasks">View Tasks</Link>
            </li>
            <li>
              <Link to="/add">Create Task</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
