import { Update } from "@prisma/client";
import prisma from "../db";
import { RequestFn } from "../types";

export const getAllUpdate: RequestFn = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belogsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  let data = products.reduce((all: Update[], product) => {
    return [...all, ...product.updates];
  }, []);

  res.json({ data });
};
export const getUpdateByID: RequestFn = async (req, res) => {
  const data = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data });
};

export const updateUpdate: RequestFn = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belogsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((all: Update[], product) => {
    return [...all, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    res.status(400);
    return res.json({ message: "Error " });
  }

  const data = await prisma.update.update({
    where: {
      id: match.id,
    },
    data: { ...req.body },
  });

  res.json({ data });
};

export const deleteUpdate: RequestFn = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belogsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((all: Update[], product) => {
    return [...all, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    res.status(400);
    return res.json({ message: "Error " });
  }

  const data = await prisma.update.delete({
    where: {
      id: match.id,
    },
  });

  res.json({ data });
};

export const createUpdate: RequestFn = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    res.status(400);
    return res.json({ message: "No product" });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });

  res.json({ data: update });
};
