const initialState = {
  lastId: 0,
  tasks: [],
  expiredTasks: [],
  completedTasks: [],
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("tasks");
    if (!serializedState) {
      return {}; 
    }
    const parsedState = JSON.parse(serializedState);
    // Add default structure for users if not present
    Object.keys(parsedState).forEach((userId) => {
      parsedState[userId] = { ...initialState, ...parsedState[userId] };
    });
    return parsedState;
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
