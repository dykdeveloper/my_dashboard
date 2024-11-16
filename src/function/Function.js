// PriorityClass.js
import i1 from '../file/images/1.png';
import i2 from '../file/images/2.png';
import i3 from '../file/images/3.png';

export function getPriorityClass(priority) {
  switch (priority) {
    case 'high':
      return 'task task-high';
    case 'medium':
      return 'task task-medium';
    case 'low':
      return 'task task-low';
    default:
      return '';
  }
}
export function getPriorityImage(priority) {
  switch (priority) {
    case 'high':
      return i3;
    case 'medium':
      return i2;
    case 'low':
      return i1;
    default:
      return '';
  }
}
export function getStatusButtonClass(status) {
    switch (status) {
        case 'not-started':
            return 'task-notstarted';
        case 'in-progress':
            return 'task-pending';
        case 'completed':
            return 'task-completed';
        default:
            return 'expired';
    }
  };
  export function formatDateTime(dateString){
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
      hour12: true,
    }).format(date);
  };

  export function formatTime(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
        timeStyle: "short", 
        hour12: true       
    }).format(date);
}
