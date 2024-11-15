import React from 'react'
import { useSelector } from 'react-redux'
import { formatDateTime } from "../function/Function";

export default function History(){
    const completedTasks1 = useSelector((state) => state.tasks.completedTasks) || [];
    
    return(
        <div className="history">
      <h2>Completed Tasks History</h2>
      {completedTasks1.length === 0 ? (
        <p>No completed tasks available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Task Name</th>
              <th>Start Date & Time</th>
              <th>End Date & Time</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks1.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>{formatDateTime(task.startDate)}</td>
                <td>{formatDateTime(task.endDate)}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    )
}