"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos = [];
const todosRouter = (0, express_1.Router)();
todosRouter.get("/", (req, res, next) => {
    res.status(200).json({ todos });
});
todosRouter.post("/todo", (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text,
    };
    todos.push(newTodo);
    res.status(200).json(newTodo);
});
todosRouter.put("/todo/:id", (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }
    const updatedTodo = {
        id: todoId,
        text: req.body.text,
    };
    todos[todoIndex] = updatedTodo;
    res
        .status(200)
        .json({ message: "Todo updated successfully", todo: updatedTodo });
});
todosRouter.delete("/todo/:id", (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }
    todos.splice(todoIndex, 1);
    res.status(200).json({ message: "Todo deleted successfully" });
});
exports.default = todosRouter;
