import { Router } from "express";
import Todo from "../models/Todo";
import { validateRequest } from "../middlewares/validate";
import { createActivitySchema, updateActivitySchema } from "../validators";
import { NotFoundError } from "../errors/not-found-error";
import { DatabaseError } from "../errors/database-error";
const router = Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find({}).sort({ createdAt: -1 });
  res.json(todos);
  //throw new DatabaseError("failed to fetch todos");
});

router.post("/", validateRequest(createActivitySchema), async (req, res) => {
  const { activity } = req.body;
  const newTodo = new Todo({ activity });
  const savedTodo = await newTodo.save();
  res.status(201).json(savedTodo);

  // throw new DatabaseError("Failed to create activity");
});

router.put("/:id", validateRequest(updateActivitySchema), async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { activity: req.body.activity },
    { new: true, runValidators: true }
  );

  if (!updatedTodo) {
    throw new NotFoundError();
  }

  res.status(200).json(updatedTodo);

  // throw new DatabaseError("Failed to update activity");
});

router.delete("/:id", async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

  if (!deletedTodo) {
    throw new NotFoundError();
  }

  // throw new DatabaseError("Failed to delete activity");

  res.json({ message: "Activity deleted successfully" });
});

router.put("/:id/toggle", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw new NotFoundError();
  }

  todo.completed = !todo.completed;
  const updatedTodo = await todo.save();

  res.json(updatedTodo);
});

export default router;
