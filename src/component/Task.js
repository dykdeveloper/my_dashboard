import React from "react";
import { useSelector } from "react-redux";
import "../file/css/task.css";
import view from "../file/images/view.png";
import update from "../file/images/edit.png";
import delete1 from "../file/images/delete.png";

export default function Task() {
  const tasks = useSelector((state) => state.tasks);

  return (
    <div className="task-component">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Task Name</th>
            <th>Start Date & Time</th>
            <th>End Date & Time</th>
            <th>Priority</th>
            <th>Status</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.name}</td>
              <td>{task.startDate}</td>
              <td>{task.endDate}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td><button><img src={view} alt="view" /></button></td>
              <td><button><img src={update} alt="update" /></button></td>
              <td><button><img src={delete1} alt="delete" /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
