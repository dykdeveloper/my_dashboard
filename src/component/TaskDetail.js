import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../file/css/taskdetail.css";
import { getPriorityClass, getPriorityImage, getStatusButtonClass, formatDateTime } from '../function/Function';

export default function TaskDetail() {
  const { id } = useParams();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [taskdetail, settaskdetail] = useState(null);

  useEffect(() => {
    const task = tasks.find((task) => task.id === parseInt(id, 10));
    settaskdetail(task);
  }, [id, tasks]);



  if (!taskdetail) {
    return <p>Task not found</p>;
  }

  return (
    <div className="task-detail">
      <h2>Task Details</h2>
      <div className="alldata">
        <div className="heading">
          <p><strong>Name:</strong></p>
          <p><strong>Starting Date:</strong></p>
          <p><strong>Ending Date:</strong></p>
          <p><strong>Priority:</strong></p>
          <p><strong>Status:</strong></p>
        </div>
        <div className="data">
          <p>{taskdetail.name}</p>
          <p>{formatDateTime(taskdetail.startDate)}</p>
          <p>{formatDateTime(taskdetail.endDate)}</p>
          <p className={getPriorityClass(taskdetail.priority)}>
            <img src={getPriorityImage(taskdetail.priority)} alt={`${taskdetail.priority} priority`} />
            {taskdetail.priority}
          </p>
          <p className={getStatusButtonClass(taskdetail.status)}>{taskdetail.status}</p>
        </div>
      </div>
      <Link to="/" className="btn">Back to table</Link>
    </div>
  );
}
