import mongoose, { Schema, Model, Document } from "mongoose";

type UserDocument = Document & {
  email: string;
  password: string;
  socketId: string;
};

type UserInput = {
  email: UserDocument["email"];
  password: UserDocument["password"];
  socketId: UserDocument["socketId"];
};

const usersSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    socketId: {
      type: Schema.Types.String,
      unique: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

const User: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  usersSchema,
);

export { User, UserInput, UserDocument };
