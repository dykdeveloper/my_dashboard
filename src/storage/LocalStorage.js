
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("tasks");
    if (!serializedState) {
      return {}; 
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state from localStorage", e);
    return {}; 
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("tasks", serializedState);
  } catch (error) {
    console.error("Could not save state", error);
  }
};
