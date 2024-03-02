import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { todoStore } from "./todo/store/todo.reducer";
import { provideEffects } from "@ngrx/effects";
import {
  handleAddTodoSideEffects$,
  handleDeleteTodoSideEffects$,
  handleGetTodosSideEffects$,
  handleToggleTodoSideEffects$
} from "./todo/store/todo.effects";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(
      { todo: todoStore },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true
        }
      }
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects({
      handleAddTodoSideEffects$,
      handleGetTodosSideEffects$,
      handleDeleteTodoSideEffects$,
      handleToggleTodoSideEffects$
    }),
    provideHttpClient(),
    provideAnimationsAsync()
  ]
};
