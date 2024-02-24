import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

import { AppStore } from "../app.state";
import { removeTodo, toggleTodo } from "../store/todo.actions";
import { Todo } from "./todo.component";

@Component({
  selector: "app-todo-list-item",
  standalone: true,
  imports: [CommonModule],
  template: ` @if (todo) {
    <div style="margin: 10px 0;">
      <button (click)="onDeleteTodo(todo.id)">Delete</button>
      <input type="checkbox" [checked]="todo.done" (change)="onToggleTodo(todo.id)" />
      {{ todo.name }}
    </div>
  }`
})
export class TodoListItemComponent {
  private store = inject(Store<AppStore>);
  @Input() todo?: Todo;
  onDeleteTodo(id: number) {
    this.store.dispatch(removeTodo({ id }));
  }

  onToggleTodo(id: number) {
    this.store.dispatch(toggleTodo({ id }));
  }
}
