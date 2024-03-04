import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TodoInputComponent } from "./todo-input.component";
import { addTodoStarted } from "../todo/store/todo.actions";

describe("TodoInputComponent", () => {
  let component: TodoInputComponent;
  let fixture: ComponentFixture<TodoInputComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoInputComponent, BrowserAnimationsModule],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), select: jest.fn(() => of()) } }]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoInputComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch an action on addTodo", () => {
    const spy = jest.spyOn(store, "dispatch");
    component.todoName = "Test Todo";
    component.onAddTodo();
    expect(spy).toHaveBeenCalledWith(addTodoStarted({ name: "Test Todo", done: false }));
  });

  it("should not dispatch action if name is empty", () => {
    const spy = jest.spyOn(store, "dispatch");
    component.todoName = "";
    component.onAddTodo();
    expect(spy).not.toHaveBeenCalled();
  });
});
