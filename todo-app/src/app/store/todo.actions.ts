import { createAction, props } from "@ngrx/store";

import { Todo } from "../todo/todo.component";

const addTodo = createAction("[Todo] Add", props<{ todo: Todo }>());
const removeTodo = createAction("[Todo] Remove", props<{ id: number }>());
const toggleTodo = createAction("[Todo] Toggle", props<{ id: number }>());

export { addTodo, removeTodo, toggleTodo };
