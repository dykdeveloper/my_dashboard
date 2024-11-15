// LocalStorage.js
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("tasks");
    return serializedState ? JSON.parse(serializedState) : { tasks: [], lastId: 0 };
  } catch (error) {
    console.error("Could not load state", error);
    return undefined;
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
