import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TodoListItemComponent } from "./todo-list-item.component";
import { removeTodoStarted, toggleTodoStarted } from "./store/todo.actions";

describe("TodoInputComponent", () => {
  let component: TodoListItemComponent;
  let fixture: ComponentFixture<TodoListItemComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListItemComponent, BrowserAnimationsModule],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), select: jest.fn(() => of()) } }]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListItemComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch removeTodoStarted action on delte Todo", () => {
    const spy = jest.spyOn(store, "dispatch");
    const id = 1;
    component.onDeleteTodo(id);
    expect(spy).toHaveBeenCalledWith(removeTodoStarted({ id }));
  });

  it("should dispatch removeTodoStarted action on delte Todo", () => {
    const spy = jest.spyOn(store, "dispatch");
    const id = 1;
    component.onToggleTodo(id);
    expect(spy).toHaveBeenCalledWith(toggleTodoStarted({ id }));
  });
});
