import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateTime } from "../function/Function";
import { resetcompleteTasks } from "../slice/TaskSlice";
import "../file/css/history.css";
import { formatTime } from "../function/Function";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

export default function History() {
  const completedTasks1 =
    useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);
  const userEmail = loggedInUser?.email;

  const resetcomplete = () => {
  dispatch(resetcompleteTasks({ userId: userEmail }));
};


  const groupedTasks = completedTasks1[userEmail].completedTasks.reduce((groups, task) => {
    const date = new Date(task.endDate)
        .toLocaleDateString("en-GB")
        .split("/")
        .join("-");

    if (!groups[date]) {
        groups[date] = [];
    }
    groups[date].push(task);
    return groups;
}, {});

const taskDates = Object.keys(groupedTasks).sort((a, b) => {
    const dateA = new Date(a.split("-").reverse().join("-")); 
    const dateB = new Date(b.split("-").reverse().join("-"));
    return dateB - dateA; 
});

taskDates.forEach(date => {
    groupedTasks[date].sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
});


  return (
    <div className="history">
      <div className="header-history">
        <h3>Completed Tasks History</h3>
        <button onClick={resetcomplete}>clear all</button>
      </div>
      <table className="t1">
        <thead>
          <tr>
            <th>Time</th>
            <th>Task Name</th>
            <th>Starting Date</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
      </table>
      {completedTasks1[userEmail].completedTasks.length === 0 ? (
        <p style={{ marginLeft: "200px", padding: "20px" }}>No completed tasks available.</p>
      ) : (
        taskDates.map((date, dateIndex) => (
          <div key={dateIndex}>
            <h6>{date}</h6>
            <table className="t2">
              <tbody>
                {groupedTasks[date].map((task) => (
                  <tr key={task.id}>
                    <td className="td_h1">{formatTime(task.endDate)}</td>
                    <td className="td_h2">{task.name}</td>
                    <td className="td_h3">{formatDateTime(task.startDate)}</td>
                    <td className="td_h4">{task.priority}</td>
                    <td className="td_h5"><IoCheckmarkDoneCircleOutline />&nbsp;{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
