import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";

import { AppStore } from "../app.state";
import { getTodos } from "../todo/store/todo.selector";
import { TodoListItemComponent } from "./todo-list-item.component";
import { TodoCountComponent } from "./todo-count.component";
import { TodoInputComponent } from "./todo-input.component";
import { loadTodosStarted } from "./store/todo.actions";

export interface Todo {
  id: number;
  name: string;
  done: boolean;
}

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [CommonModule, TodoListItemComponent, TodoCountComponent, TodoInputComponent],
  template: `<app-todo-count></app-todo-count>
    <app-todo-input></app-todo-input>
    @for (todo of todos$ | async; track todo.id) {
      <app-todo-list-item [todo]="todo"></app-todo-list-item>
    }`
})
export class TodoComponent {
  private store = inject(Store<AppStore>);

  constructor() {
    this.store.dispatch(loadTodosStarted());
  }

  todos$ = this.store.select(getTodos);
}
