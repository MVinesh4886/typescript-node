import { Router } from "express";

import { Todo } from "../models/todo";

type RequestBody = { text: string };
type RequestParams = { id: string };

const todos: Todo[] = [];

const todosRouter = Router();

todosRouter.get("/", (req, res, next) => {
  res.status(200).json({ todos });
});

todosRouter.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };

  todos.push(newTodo);

  res.status(200).json(newTodo);
});

todosRouter.put("/todo/:id", (req, res, next) => {
  const params = req.params as RequestParams;
  const body = req.body as RequestBody;
  const todoId = params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const updatedTodo: Todo = {
    id: todoId,
    text: body.text,
  };

  todos[todoIndex] = updatedTodo;

  res
    .status(200)
    .json({ message: "Todo updated successfully", todo: updatedTodo });
});

todosRouter.delete("/todo/:id", (req, res, next) => {
  const params = req.params as RequestParams;
  const todoId = params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos.splice(todoIndex, 1);

  res.status(200).json({ message: "Todo deleted successfully" });
});

export default todosRouter;
