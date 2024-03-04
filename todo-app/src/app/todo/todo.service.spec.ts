import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TodoService } from "./todo.service";
import { Todo } from "./todo.component";
import {
  AddTodoRequest,
  AddTodoResponse,
  RemoveTodoRequest,
  ToggleTodoRequest,
  ToggleTodoResponse
} from "./store/todo.actions";

describe("TodoService", () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  let baseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
    baseUrl = "http://localhost:3000/todos";
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should fetch todos", () => {
    const mockTodos: Todo[] = [{ id: 1, name: "Test Todo", done: false }];

    service.getTodos().subscribe((todos) => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockTodos);
  });

  it("should add a todo", () => {
    const mockTodo: AddTodoRequest = { name: "Test Todo", done: false };
    const mockResponse: AddTodoResponse = { id: 1, name: "Test Todo", done: false };

    service.addTodo(mockTodo).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(mockTodo);
    req.flush(mockResponse);
  });

  it("should remove a todo", () => {
    const mockRequest: RemoveTodoRequest = { id: 1 };

    service.removeTodo(mockRequest).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${baseUrl}/${mockRequest.id}`);
    expect(req.request.method).toBe("DELETE");
    req.flush(null);
  });

  it("should toggle done", () => {
    const mockRequest: ToggleTodoRequest = { id: 1 };
    const mockResponse: ToggleTodoResponse = { id: 1 };

    service.toggleDone(mockRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/${mockRequest.id}/toggle`);
    expect(req.request.method).toBe("PATCH");
    req.flush(mockResponse);
  });
});
