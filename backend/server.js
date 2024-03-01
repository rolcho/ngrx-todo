"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var Todo = /** @class */ (function () {
    function Todo(name, done) {
        this.id = Todo.currentId++;
        this.name = name;
        this.done = done;
    }
    Todo.currentId = 0;
    return Todo;
}());
var todos = [];
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/todos", function (req, res) {
    res.send(todos);
});
app.get("/todos/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var todo = todos.find(function (todo) { return todo.id === id; });
    if (todo) {
        res.send(todo);
    }
    else {
        res.status(404).send({ message: "Todo not found" });
    }
});
app.post("/todos", function (req, res) {
    var id = todos.length + 1;
    var todo = new Todo(req.body.name, false);
    todos.push(todo);
    res.send(todo);
});
app.put("/todos/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var todo = todos.find(function (todo) { return todo.id === id; });
    if (todo) {
        todo = Object.assign(todo, req.body);
        res.send(todo);
    }
    else {
        res.status(404).send({ message: "Todo not found" });
    }
});
app.delete("/todos/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var index = todos.findIndex(function (todo) { return todo.id === id; });
    if (index !== -1) {
        todos.splice(index, 1);
        res.send({ message: "Todo deleted" });
    }
    else {
        res.status(404).send({ message: "Todo not found" });
    }
});
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
