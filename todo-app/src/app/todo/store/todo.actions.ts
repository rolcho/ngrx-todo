import { createAction, props } from "@ngrx/store";

import { Todo } from "../todo.component";

const addTodo = createAction("[Todo] Add todo", props<{ todo: Todo }>());
const removeTodo = createAction("[Todo] Remove todo", props<{ id: number }>());
const toggleTodo = createAction("[Todo] Toggle done todo", props<{ id: number }>());

export { addTodo, removeTodo, toggleTodo };
