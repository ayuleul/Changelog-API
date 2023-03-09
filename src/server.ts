import express, { NextFunction } from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";
import { ErrorRequestHandler } from "./types";
const app = express();

const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid Input" });
  } else {
    res.status(500).json({ message: "That is on us!" });
  }
};

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  throw new Error("hello");
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/login", signIn);

app.use(ErrorHandler);

export default app;
