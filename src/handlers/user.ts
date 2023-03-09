import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";
import { MiddlewareFn, RequestFn } from "../types";

export const createNewUser: MiddlewareFn = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (e: any) {
    e.type = "input";
    next(e);
  }
};

export const signIn: RequestFn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    res.status(401);
    res.json({ message: "Incorrect credential" });
    return;
  }

  const isValid = await comparePassword(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "Incorrect credential" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
