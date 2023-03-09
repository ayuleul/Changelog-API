import jwt from "jsonwebtoken";
import { MiddlewareFn } from "../types";
import bcrypt from "bcrypt";

export const hashPassword = (password: string | Buffer) => {
  return bcrypt.hash(password, 5);
};

export const comparePassword = (password: string | Buffer, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const createJWT = (user: { id: string; username: string }) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d",
      algorithm: "HS256",
    }
  );

  return token;
};

export const protect: MiddlewareFn = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user;
    next();
    return;
  } catch (e) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }
};
