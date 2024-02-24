import { AppState } from '../app.state';

export const getTodos = (state: AppState) => state.todos?.todos;
