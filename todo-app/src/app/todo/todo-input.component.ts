import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormsModule } from "@angular/forms";

import { addTodo } from "../store/todo.actions";
import { AppStore } from "../app.state";
import { Todo } from "./todo.component";

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
    const id = Math.floor(Math.random() * 1000);
    const todo: Todo = { id, name: this.todoName.trim(), done: false };
    this.store.dispatch(addTodo({ todo }));
    this.todoName = "";
  }
}
