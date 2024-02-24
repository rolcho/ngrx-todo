import { createReducer, on } from "@ngrx/store";
import { Todo } from "../todo/todo.component";
import { addTodo, removeTodo, toggleTodo } from "./todo.actions";

export interface TodoState {
  todos: Todo[];
  error: string;
  success: boolean;
}

export const initialState: TodoState = {
  todos: [],
  error: "",
  success: false
};

export const todoStore = createReducer(
  initialState,
  on(addTodo, (state: TodoState, { todo }) => {
    return { ...state, todos: [...state.todos, todo] };
  }),
  on(removeTodo, (state: TodoState, { id }) => {
    return { ...state, todos: state.todos.filter((t) => t.id !== id) };
  }),
  on(toggleTodo, (state: TodoState, { id }) => {
    return {
      ...state,
      todos: state.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    };
  })
);
