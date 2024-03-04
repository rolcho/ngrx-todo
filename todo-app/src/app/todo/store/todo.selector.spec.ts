import { AppStore } from "../../app.state";
import { getTodos, getTodoNotDone, getTodoDone } from "./todo.selector";

describe("Todo Selectors", () => {
  const mockState: AppStore = {
    todo: {
      todos: {
        1: { id: 1, name: "Todo 1", done: false },
        2: { id: 2, name: "Todo 2", done: true },
        3: { id: 3, name: "Todo 3", done: false }
      },
      isLoading: false,
      error: ""
    }
  };

  it("should select all todos", () => {
    const result = getTodos(mockState);
    expect(result).toEqual(mockState.todo!.todos);
  });

  it("should select the number of not done todos", () => {
    const result = getTodoNotDone(mockState);
    expect(result).toBe(2);
  });

  it("should select the number of done todos", () => {
    const result = getTodoDone(mockState);
    expect(result).toBe(1);
  });
});
