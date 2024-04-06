"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class Todo {
    constructor(name, done) {
        this.id = Todo.currentId++;
        this.name = name;
        this.done = done;
    }
}
Todo.currentId = 0;
const todos = [];
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL }));
app.get("/todos", (req, res) => {
    res.send(todos);
});
app.get("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
        res.send(todo);
    }
    else {
        res.sendStatus(404).send({ message: "Todo not found" });
    }
});
app.post("/todos", (req, res) => {
    const id = todos.length + 1;
    const todo = new Todo(req.body.name, false);
    todos.push(todo);
    res.send(todo);
});
app.patch("/todos/:id/toggle", (req, res) => {
    const id = parseInt(req.params.id);
    let todo = todos.find((todo) => todo.id === id);
    if (todo) {
        todo.done = !todo.done;
        res.send({ id: todo.id });
    }
    else {
        res.sendStatus(404).send({ message: "Todo not found" });
    }
});
const parsedPort = parseInt(port);
app.listen(parsedPort, "0.0.0.0", () => {
    console.log(`Server is running on port ${parsedPort}`);
    console.log(`${process.env.FRONTEND_URL}`);
});
