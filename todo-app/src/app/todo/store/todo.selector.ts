import { AppStore } from "../../app.state";

export const getTodos = (state: AppStore) => state.todo?.todos;
export const getTodoNotDone = (state: AppStore) => Object.values(state.todo!.todos).filter((todo) => !todo.done).length;
export const getTodoDone = (state: AppStore) => Object.values(state.todo!.todos).filter((todo) => todo.done).length;
