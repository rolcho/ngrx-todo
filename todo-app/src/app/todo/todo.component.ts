import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";

import { AppStore } from "../app.state";
import { getTodos } from "../store/todo.selector";
import { TodoListItemComponent } from "./todo-list-item.component";
import { TodoCountComponent } from "./todo-count.component";
import { TodoInputComponent } from "./todo-input.component";

export interface Todo {
  id: number;
  name: string;
  done: boolean;
}

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [CommonModule, TodoListItemComponent, TodoCountComponent, TodoInputComponent],
  template: ` <app-todo-count></app-todo-count>
    <app-todo-input></app-todo-input>
    @for (todo of todo$ | async; track todo.id) {
      <app-todo-list-item [todo]="todo"></app-todo-list-item>
    }`
})
export class TodoComponent {
  private store = inject(Store<AppStore>);

  todo$ = this.store.select(getTodos);
}
