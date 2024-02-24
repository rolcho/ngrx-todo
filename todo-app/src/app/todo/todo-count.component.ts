import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

import { AppStore } from "../app.state";
import { getDoneCount, getTodoCount } from "../store/todo.selector";

@Component({
  selector: "app-todo-count",
  standalone: true,
  imports: [CommonModule],
  template: `<h2>Todos in the list: {{ todoCount$ | async }} Done: {{ doneCount$ | async }}</h2>`
})
export class TodoCountComponent {
  private store = inject(Store<AppStore>);
  todoCount$ = this.store.select(getTodoCount);
  doneCount$ = this.store.select(getDoneCount);
}
