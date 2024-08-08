import nc from "next-connect";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).post(async (req, res) => {
  const { photo } = req.body;
  await prisma.photo.update({
    where: {
      id: photo.id,
    },
    data: {
      status: photo.status,
    },
  });

  res.json({ status: photo.status });
});

export default handler;
