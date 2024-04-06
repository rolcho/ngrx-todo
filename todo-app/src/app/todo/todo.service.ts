import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
  private baseUrl = "https://rolcho-todo-api.up.railway.app/todos";

  private http = inject(HttpClient);

  getTodos() {
    console.log(this.baseUrl);
    return this.http.get<Todo[]>(this.baseUrl);
  }

  addTodo(todo: AddTodoRequest) {
    return this.http.post<AddTodoResponse>(this.baseUrl, todo);
  }

  removeTodo(req: RemoveTodoRequest) {
    return this.http.delete<void>(`${this.baseUrl}/${req.id}`);
  }

  toggleDone(todo: ToggleTodoRequest) {
    return this.http.patch<ToggleTodoResponse>(`${this.baseUrl}/${todo.id}/toggle`, {});
  }
}
