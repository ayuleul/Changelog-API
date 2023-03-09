import prisma from "../db";
import { RequestFn } from "../types";

export const getProducts: RequestFn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user?.products || [] });
};

//Get one
export const getProductById: RequestFn = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      id: req.params.id,
      belogsToId: req.user.id,
    },
  });

  res.json({ data: product });
};

export const createProduct: RequestFn = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belogsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

export const updateProduct: RequestFn = async (req, res) => {
  const updated = prisma.product.update({
    where: {
      id_belogsToId: {
        id: req.params.id,
        belogsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });
  res.json({ data: updated });
};

export const deleteProduct: RequestFn = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belogsToId: {
        id: req.params.id,
        belogsToId: req.user.id,
      },
    },
  });
  res.json({ data: deleted });
};
