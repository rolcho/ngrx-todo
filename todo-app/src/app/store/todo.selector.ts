import { AppState } from '../app.state';

export const getTodos = (state: AppState) => state.todos?.todos;
export const getTodoCount = (state: AppState) => state.todos?.todos.length;
export const getDoneCount = (state: AppState) =>
  state.todos?.todos.filter((t) => t.done).length;
