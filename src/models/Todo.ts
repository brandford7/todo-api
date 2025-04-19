import { Document, Schema, model } from "mongoose";

export interface ITodo extends Document {
  activity: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema: Schema = new Schema(
  {
    activity: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Activity must be at least 3 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ITodo>("Todo", TodoSchema);
