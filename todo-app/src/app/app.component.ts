import { Component, OnInit, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TodoComponent } from "./todo/todo.component";
import { Store } from "@ngrx/store";
import { AppStore } from "./app.state";
import { loadTodosStarted } from "./todo/store/todo.actions";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, TodoComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store<AppStore>);

  title = "todo-app";

  ngOnInit() {
    this.store.dispatch(loadTodosStarted());
  }
}
