import { Component, OnChanges, SimpleChanges, inject } from '@angular/core';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { getTodoCount } from '../store/todo.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-count',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-count.component.html',
  styleUrl: './todo-count.component.css',
})
export class TodoCountComponent implements OnChanges {
  private readonly store = inject(Store<AppState>);
  todoCount$ = this.store.select(getTodoCount);

  ngOnChanges(): void {
    this.todoCount$ = this.store.select(getTodoCount);
  }
}
