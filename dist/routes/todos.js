"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos = [];
const todosRouter = (0, express_1.Router)();
todosRouter.get("/", (req, res, next) => {
    res.status(200).json({ todos });
});
todosRouter.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(200).json(newTodo);
});
todosRouter.put("/todo/:id", (req, res, next) => {
    const params = req.params;
    const body = req.body;
    const todoId = params.id;
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }
    const updatedTodo = {
        id: todoId,
        text: body.text,
    };
    todos[todoIndex] = updatedTodo;
    res
        .status(200)
        .json({ message: "Todo updated successfully", todo: updatedTodo });
});
todosRouter.delete("/todo/:id", (req, res, next) => {
    const params = req.params;
    const todoId = params.id;
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }
    todos.splice(todoIndex, 1);
    res.status(200).json({ message: "Todo deleted successfully" });
});
exports.default = todosRouter;
