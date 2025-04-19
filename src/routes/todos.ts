import { Router } from "express";
import asyncHandler from "express-async-handler";
import Todo from "../models/Todo";
import { validateRequest } from "../middlewares/validate";
import { createActivitySchema, updateActivitySchema } from "../validators";
import { NotFoundError } from "../errors/not-found-error";
import { DatabaseError } from "../errors/database-error";
const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const todos = await Todo.find().sort({ createdAt: -1 });
      res.json(todos);
    } catch (error) {
      throw new DatabaseError("Failed to fetch activities");
    }
  })
);

router.post(
  "/",
  validateRequest(createActivitySchema),
  asyncHandler(async (req, res) => {
    try {
      const { activity } = req.body;
      const newTodo = new Todo({ activity });
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (error) {
      throw new DatabaseError("Failed to create activity");
    }
  })
);

router.put(
  "/:id",
  validateRequest(updateActivitySchema),
  asyncHandler(async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { activity: req.body.activity },
        { new: true, runValidators: true }
      );

      if (!updatedTodo) {
        throw new NotFoundError("Activity not found");
      }

      res.json(updatedTodo);
    } catch (error) {
      throw new DatabaseError("Failed to update activity");
    }
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

      if (!deletedTodo) {
        throw new NotFoundError("Activity not found");
      }

      res.json({ message: "Activity deleted successfully" });
    } catch (error) {
      throw new DatabaseError("Failed to delete activity");
    }
  })
);

router.put(
  "/:id/toggle",
  asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      throw new NotFoundError("Todo not found");
    }

    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();

    res.json(updatedTodo);
  })
);

export default router;
