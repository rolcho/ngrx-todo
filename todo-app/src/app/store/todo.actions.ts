import { createAction, props } from '@ngrx/store';
import { Todo } from '../todo/todo.component';

export const addTodo = createAction('[Todo] Add Todo', props<{ todo: Todo }>());
export const removeTodo = createAction(
  '[Todo] Remove Todo',
  props<{ id: number }>()
);
export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ id: number }>()
);
