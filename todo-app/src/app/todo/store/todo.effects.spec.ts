import { TestBed } from "@angular/core/testing";
import { Action } from "@ngrx/store";
import { Observable, of, take, throwError } from "rxjs";

import { todoEffects } from "./todo.effects";
import { TodoService } from "../todo.service";
import {
  loadTodosStarted,
  loadTodosSuccess,
  loadTodosError,
  AddTodoRequest,
  AddTodoResponse,
  addTodoStarted,
  addTodoSuccess,
  addTodoError,
  RemoveTodoRequest,
  removeTodoStarted,
  removeTodoSuccess,
  removeTodoError,
  ToggleTodoRequest,
  toggleTodoStarted,
  toggleTodoSuccess,
  toggleTodoError
} from "./todo.actions";
import { Todo } from "../todo.component";

describe("TodoEffects", () => {
  let actions$: Observable<Action>;
  let todoService: TodoService;
  const mockTodoService = {
    getTodos: jest.fn(),
    addTodo: jest.fn(),
    removeTodo: jest.fn(),
    toggleDone: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService
        }
      ]
    });

    todoService = TestBed.inject(TodoService);
  });

  it("should dispatch loadTodosSuccess on successful getTodos", (done) => {
    const todos: Todo[] = [{ id: 1, name: "Todo 1", done: false }];
    const todosMap = { 1: { id: 1, name: "Todo 1", done: false } };
    mockTodoService.getTodos = jest.fn().mockReturnValue(of(todos));

    actions$ = of(loadTodosStarted());

    TestBed.runInInjectionContext(() => {
      todoEffects
        .handleGetTodosSideEffects$(actions$, todoService)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action).toEqual(loadTodosSuccess({ todos: todosMap }));
        });
    });
    done();
  });

  it("should dispatch loadTodosError on error getTodos", (done) => {
    jest.spyOn(todoService, "getTodos").mockReturnValue(throwError(() => new Error("Error getting todos")));
    actions$ = of(loadTodosStarted());

    TestBed.runInInjectionContext(() => {
      todoEffects
        .handleGetTodosSideEffects$(actions$, todoService)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action.type).toEqual(loadTodosError.type);
        });
    });
    done();
  });

  it("should dispatch addTodosSuccess on successful addTodos", (done) => {
    const todo: AddTodoRequest = { name: "Todo 1", done: false };
    const todoResponse: AddTodoResponse = { id: 1, name: "Todo 1", done: false };
    mockTodoService.addTodo = jest.fn().mockReturnValue(of(todoResponse));

    actions$ = of(addTodoStarted(todo));

    TestBed.runInInjectionContext(() => {
      todoEffects
        .handleAddTodoSideEffects$(actions$, todoService)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action).toEqual(addTodoSuccess(todoResponse));
        });
      done();
    });
  });

  it("should dispatch addTodosError on error addTodos", (done) => {
    const todo: AddTodoRequest = { name: "Todo 1", done: false };
    jest.spyOn(todoService, "addTodo").mockReturnValue(throwError(() => new Error("Error adding todo")));
    actions$ = of(addTodoStarted(todo));

    TestBed.runInInjectionContext(() => {
      todoEffects
        .handleAddTodoSideEffects$(actions$, todoService)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action.type).toEqual(addTodoError.type);
        });
    });
    done();
  });

  it("should dispatch removeTodosSuccess on successful removeTodo", (done) => {
    const todo: RemoveTodoRequest = { id: 1 };
    mockTodoService.removeTodo = jest.fn().mockReturnValue(of(1));

    actions$ = of(removeTodoStarted(todo));

    TestBed.runInInjectionContext(() => {
      todoEffects
        .handleDeleteTodoSideEffects$(actions$, todoService)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action).toEqual(removeTodoSuccess(todo));
        });
      done();
    });
  });

  it("should dispatch removeTodosError on error Todo", (done) => {
    const todo: RemoveTodoRequest = { id: 1 };
    jest.spyOn(todoService, "removeTodo").mockReturnValue(throwError(() => new Error("Error removing todo")));
    actions$ = of(removeTodoStarted(todo));

    TestBed.runInInjectionContext(() => {
      todoEffects
        .handleDeleteTodoSideEffects$(actions$, todoService)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action.type).toEqual(removeTodoError.type);
        });
      done();
    });
  });

  it("should dispatch toggleTodosSuccess on successful toggleTodo", (done) => {
    const todo: ToggleTodoRequest = { id: 1 };
    mockTodoService.toggleDone = jest.fn().mockReturnValue(of(1));

    actions$ = of(toggleTodoStarted(todo));

    TestBed.runInInjectionContext(() => {
      todoEffects
        .handleToggleTodoSideEffects$(actions$, todoService)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action).toEqual(toggleTodoSuccess(todo));
        });
      done();
    });
  });

  it("should dispatch toggleTodosError on error Todo", (done) => {
    const todo: ToggleTodoRequest = { id: 1 };
    jest.spyOn(todoService, "toggleDone").mockReturnValue(throwError(() => new Error("Error toggle done")));
    actions$ = of(toggleTodoStarted(todo));

    TestBed.runInInjectionContext(() => {
      todoEffects
        .handleToggleTodoSideEffects$(actions$, todoService)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action.type).toEqual(toggleTodoError.type);
        });
      done();
    });
  });
});
