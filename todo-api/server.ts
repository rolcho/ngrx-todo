import express, { Request, Response } from "express";
import cors from "cors";
class Todo {
  static currentId = 0;
  id: number;
  name: string;
  done: boolean;

  constructor(name: string, done: boolean) {
    this.id = Todo.currentId++;
    this.name = name;
    this.done = done;
  }
}

const todos: Todo[] = [];

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.get("/todos", (req: Request, res: Response) => {
  res.send(todos);
});

app.get("/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    res.send(todo);
  } else {
    res.sendStatus(404).send({ message: "Todo not found" });
  }
});

app.post("/todos", (req: Request, res: Response) => {
  const id = todos.length + 1;
  const todo = new Todo(req.body.name, false);
  todos.push(todo);
  res.send(todo);
});

app.patch("/todos/:id/toggle", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  let todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.done = !todo.done;
    res.send({ id: todo.id });
  } else {
    res.sendStatus(404).send({ message: "Todo not found" });
  }
});

const parsedPort = parseInt(port as string);
app.listen(parsedPort, "0.0.0.0", () => {
  console.log(`Server is running on port ${parsedPort}`);
  console.log(`${process.env.FRONTEND_URL}`);
});
