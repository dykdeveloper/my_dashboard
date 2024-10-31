import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../slice/TaskSlice";
import { useNavigate } from "react-router-dom";
import "../file/css/form.css";

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    priority: "high",
    status: "not-started",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(taskData));
    setTaskData({ name: "", startDate: "", endDate: "", priority: "high", status: "not-started" });

    navigate('/');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
    <h3>Add Task</h3>
      <label htmlFor="name">
        Task Name:
        <input type="text" name="name" id="name1" placeholder="Enter Task Name Here..." value={taskData.name} onChange={handleChange} required/>
      </label>
      <label htmlFor="startDate">
        Starting Date:
        <input type="datetime-local" name="startDate" id="datetime1" value={taskData.startDate} onChange={handleChange} required/>
      </label>
      <label htmlFor="endDate">
        Ending Date:
        <input type="datetime-local" name="endDate" id="datetime2" value={taskData.endDate} onChange={handleChange} required/>
      </label>
      <div className="radio-group">
        <p>Priority:</p>
        <label>
          <input type="radio" name="priority" value="high" checked={taskData.priority === "high"} onChange={handleChange} required/>
          High
        </label>
        <label>
          <input type="radio" name="priority" value="medium" checked={taskData.priority === "medium"} onChange={handleChange} required/>
          Medium
        </label>
        <label>
          <input type="radio" name="priority" value="low" checked={taskData.priority === "low"} onChange={handleChange} required/>
          Low
        </label>
      </div>
      <div className="radio-group">
        <p>Status:</p>
        <label>
          <input type="radio" name="status" value="not-started" checked={taskData.status === "not-started"} onChange={handleChange} />
          Not Started
        </label>
        <label>
          <input type="radio" name="status" value="in-progress" checked={taskData.status === "in-progress"} onChange={handleChange} />
          In Progress
        </label>
        <label>
          <input type="radio" name="status" value="completed" checked={taskData.status === "completed"} onChange={handleChange} />
          Completed
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
