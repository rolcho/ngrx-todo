import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import {
  AddTodoRequest,
  AddTodoResponse,
  RemoveTodoRequest,
  ToggleTodoRequest,
  ToggleTodoResponse
} from "./store/todo.actions";
import { Todo } from "./todo.component";

@Injectable({ providedIn: "root" })
export class TodoService {
  private baseUrl = "http://localhost:3000/todos";

  constructor(private readonly http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  addTodo(todo: AddTodoRequest): Observable<AddTodoResponse> {
    return this.http.post<AddTodoResponse>(this.baseUrl, todo);
  }

  removeTodo(req: RemoveTodoRequest): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${req.id}`);
  }

  toggleDone(todo: ToggleTodoRequest): Observable<ToggleTodoResponse> {
    return this.http.put<ToggleTodoResponse>(`${this.baseUrl}/${todo.id}`, { done: todo.done });
  }
}
