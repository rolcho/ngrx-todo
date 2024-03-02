import { AppStore } from "../../app.state";

export const getTodos = (state: AppStore) => state.todo?.todos;
export const getTodoNotDone = (state: AppStore) => state.todo?.todoCounterNotDone;
export const getTodoDone = (state: AppStore) => state.todo?.todoCounterDone;
