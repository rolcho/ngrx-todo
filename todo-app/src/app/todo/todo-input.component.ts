import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormsModule } from "@angular/forms";

import { addTodoStarted } from "../todo/store/todo.actions";
import { AppStore } from "../app.state";

@Component({
  selector: "app-todo-input",
  standalone: true,
  imports: [FormsModule],
  template: ` <input type="text" [(ngModel)]="todoName" />
    <button (click)="onAddTodo()">Add</button>`
})
export class TodoInputComponent {
  private store = inject(Store<AppStore>);
  todoName = "";

  onAddTodo() {
    if (!this.todoName.trim()) {
      return;
    }
    this.store.dispatch(addTodoStarted({ name: this.todoName.trim(), done: false }));
    this.todoName = "";
  }
}
