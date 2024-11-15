// ExpireTask.js
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../file/css/expiretask.css";
import {
  formatDateTime,
  getPriorityClass,
  getStatusButtonClass,
  getPriorityImage
} from "../function/Function";
import danger from "../file/images/danger.png";

export default function ExpireTask() {
  const expiredTasks = useSelector((state) => state.tasks.expiredTasks) || [];

  return (
    <div className="expire-task">
      <table>
        <thead>
          <tr>
            <th className="th1">No.</th>
            <th className="th2">Task Name</th>
            <th className="th3">Start Date & Time</th>
            <th className="th4">End Date & Time</th>
            <th className="th5">Priority</th>
            <th className="th6">Status</th>
          </tr>
        </thead>
        <tbody>
          {expiredTasks.map((task, index) => (
            <tr key={task.id}>
              <td className="td1">{index + 1}</td>
              <td className="td2">{task.name}</td>
              <td className="td3">{formatDateTime(task.startDate)}</td>
              <td className="td4">{formatDateTime(task.endDate)}</td>
              <td className="td5">
                <p className={getPriorityClass(task.priority)}>
                <img
                      src={getPriorityImage(task.priority)}
                      alt={`${task.priority} priority`}
                    />
                  {task.priority}
                </p>
              </td>
              <td className="td6">
                <p className={getStatusButtonClass(task.status)}>
                  <img src={danger} alt="expired" />
                  {task.status}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
