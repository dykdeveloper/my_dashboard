import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateTime } from "../function/Function";
import { resetcompleteTasks } from '../slice/TaskSlice';

export default function History() {
    const completedTasks1 = useSelector((state) => state.tasks.completedTasks) || [];
    const dispatch = useDispatch();

    const resetcomplete = () =>{
      dispatch(resetcompleteTasks());
    }

    // Group tasks by end date
    const groupedTasks = completedTasks1.reduce((groups, task) => {
        const date = formatDateTime(task.endDate).split(' ')[0]; 
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(task);
        return groups;
    }, {});

    const taskDates = Object.keys(groupedTasks).sort((a, b) => new Date(b) - new Date(a));

    return (
        <div className="history">
            <h2>Completed Tasks History</h2>
            <button onClick={resetcomplete}>clear all history</button>
            {completedTasks1.length === 0 ? (
                <p>No completed tasks available.</p>
            ) : (
                taskDates.map((date, dateIndex) => (
                    <div key={dateIndex}>
                        <h3>{date}</h3>
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
                                {groupedTasks[date].map((task, index) => (
                                    <tr key={task.id}>
                                        <td>{index + 1}</td>
                                        <td>{task.name}</td>
                                        <td>{formatDateTime(task.startDate)}</td>
                                        <td>{formatDateTime(task.endDate)}</td>
                                        <td>{task.priority}</td>
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
