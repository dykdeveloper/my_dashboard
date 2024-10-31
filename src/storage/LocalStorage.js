export const loadState = () => {
    const serializedState = localStorage.getItem("tasks");
    return serializedState ? JSON.parse(serializedState) : [];
  };
  
  export const saveState = (state) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("tasks", serializedState);
  };
  