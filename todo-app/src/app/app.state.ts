import { TodoState } from "./store/todo.reducer";

export interface AppStore {
  todo?: TodoState;
}
