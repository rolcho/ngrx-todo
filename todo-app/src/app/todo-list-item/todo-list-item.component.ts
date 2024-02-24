import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { removeTodo, toggleTodo } from '../store/todo.actions';
import { Todo } from '../todo/todo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.css',
})
export class TodoListItemComponent {
  private readonly store = inject(Store<AppState>);
  @Input() todo?: Todo;
  onDeleteTodo(id: number) {
    this.store.dispatch(removeTodo({ id }));
  }

  onToggleTodo(id: number) {
    this.store.dispatch(toggleTodo({ id }));
  }
}
