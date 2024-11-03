import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../file/css/task.css";
import view from "../file/images/view.png";
import update1 from "../file/images/edit.png";
import delete1 from "../file/images/delete.png";
import { deletetask } from "../slice/TaskSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  getPriorityClass,
  getPriorityImage,
  getStatusButtonClass,
  formatDateTime,
} from "../function/Function";
import { useMemo } from "react";

export default function Task() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedStartDate, setSelectedStartDate] = useState("All");
  const [selectedEndDate, setSelectedEndDate] = useState("All");

  const formatDateOnly = (dateTime) => {
    const date = new Date(dateTime);
    return date.toISOString().split("T")[0];
  };
  const delete2 = (id) => {
    dispatch(deletetask(id));
  };

  const update = (task) => {
    navigate("/form", { state: { task } });
  };

  const uniqueStartDates = useMemo(() => {
    return [
      "All",
      ...new Set(tasks.map((task) => formatDateOnly(task.startDate))),
    ];
  }, [tasks]);

  const uniqueEndDates = useMemo(() => {
    return [
      "All",
      ...new Set(tasks.map((task) => formatDateOnly(task.endDate))),
    ];
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    const priorityMatch =
      selectedPriority === "All" || task.priority === selectedPriority;
    const statusMatch =
      selectedStatus === "All" || task.status === selectedStatus;
    const startDateMatch =
      selectedStartDate === "All" ||
      formatDateOnly(task.startDate) === selectedStartDate;
    const endDateMatch =
      selectedEndDate === "All" ||
      formatDateOnly(task.endDate) === selectedEndDate;

    return priorityMatch && statusMatch && startDateMatch && endDateMatch;
  });

  const resetFilters = () => {
    setSelectedPriority("All");
    setSelectedStatus("All");
    setSelectedStartDate("All");
    setSelectedEndDate("All");
  };

  return (
    <div className="task-component">
      <table>
        <thead>
          <tr>
            <th className="th1">No.</th>
            <th className="th2">Task Name</th>
            <th className="th3">Start Date & Time</th>
            <th className="th4">End Date & Time</th>
            <th className="th5">Priority</th>
            <th className="th6">Status</th>
            <th className="th7">View</th>
            <th className="th8">Edit</th>
            <th className="th9">Delete</th>
          </tr>
          <tr>
            <p>Filter By:</p>
            <select className="op1"
              value={selectedStartDate}
              onChange={(e) => setSelectedStartDate(e.target.value)}
            >
              {uniqueStartDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <select className="op2"
              value={selectedEndDate}
              onChange={(e) => setSelectedEndDate(e.target.value)}
            >
              {uniqueEndDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <select className="op3"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="All">All</option>
              {[...new Set(tasks.map((task) => task.priority))].map(
                (priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                )
              )}
            </select>
            <select className="op4"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All</option>
              {[...new Set(tasks.map((task) => task.status))].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button onClick={resetFilters}>Reset</button>
          </tr>
        </thead>
      </table>
      <div className="table-body-container">
        <table>
          <tbody>
            {filteredTasks.map((task, index) => (
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
                    {task.status}
                  </p>
                </td>
                <td className="td7">
                  <Link to={`/taskdetail/${task.id}`}>
                    <img src={view} alt="view" />
                  </Link>
                </td>
                <td className="td8">
                  <button onClick={() => update(task)}>
                    <img src={update1} alt="update" />
                  </button>
                </td>
                <td className="td9">
                  <button onClick={() => delete2(task.id)}>
                    <img src={delete1} alt="delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
