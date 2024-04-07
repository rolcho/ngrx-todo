import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { todoStore } from "./todo/store/todo.reducer";
import { provideEffects } from "@ngrx/effects";
import { todoEffects } from "./todo/store/todo.effects";
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
    provideEffects(todoEffects),
    provideHttpClient(),
    provideAnimationsAsync()
  ]
};
