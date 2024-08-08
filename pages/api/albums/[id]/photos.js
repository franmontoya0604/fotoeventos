const { PrismaClient } = require("@prisma/client");
import nc from "next-connect";

const prisma = new PrismaClient();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    const { id } = req.query;
    res.status(404).end("Page is not found");
  },
}).get(async (req, res) => {
  const { id } = req.query;
  const cursor = parseInt(req.query.cursor) || 1;
  const pageSize = 5;
  const whereCond = {
    album_id: parseInt(id),
    status: "DRAFT",
  };
  const data = await prisma.Photo.findMany({
    cursor: {
      id: cursor,
    },
    take: pageSize,
    where: whereCond,
    orderBy: {
      id: "asc",
    },
  });

  const last = await prisma.photo.findFirst({
    where: whereCond,
    orderBy: {
      id: "desc",
    },
  });

  const nextId = cursor < last.id ? data[data.length - 1].id + 1 : null;
  const photos = data.map((photo) => ({
    ...photo,
  }));

  res.json({ photos, nextId });
});

export default handler;
