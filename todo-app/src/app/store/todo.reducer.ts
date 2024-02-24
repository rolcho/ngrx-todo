import { createReducer, on } from '@ngrx/store';
import { Todo } from '../todo/todo.component';
import { addTodo, removeTodo } from './todo.actions';

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [],
};

export const todoStore = createReducer(
  initialState,
  on(addTodo, (state: TodoState, { todo }) => {
    return { ...state, todos: [...state.todos, todo] };
  }),
  on(removeTodo, (state: TodoState, { id }) => {
    return { ...state, todos: state.todos.filter((t) => t.id !== id) };
  })
);
