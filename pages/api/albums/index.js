import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import nc from "next-connect";
import { authOptions } from "../auth/[...nextauth]";
import { moveFile } from "../media/lib";

// const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const handler = nc({
  onError: (err, req, res, next) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .get(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    // TODO agregar verificacion de que sea admin o fotografo
    if (!session) {
      res.status(401);
      res.end();
    }
    const albums = await prisma.album.findMany({
      where: {
        ownerId: session.user.id,
        status: {
          not: "DELETED",
        },
      },
    });

    // TODO formatear fechas en modo dd-mm-yyyy
    res.json(albums);
  })
  .post(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401);
      res.end();
    }

    let slug = await prisma.album.findFirst({
      where: {
        slug: req.body.slug,
        ownerId: session.user.id,
      },
    });

    //TODO cambiar datos del bucket fijos ,con los datos del bucket de cada usuario //cada usuario va a tener su bucket con todos su album
    if (slug) {
      res
        .status(500)
        .send({ error: "El slug ya ha sido utilizado en otro album" });
    } else {
      // copiar image al bucket definitivo

      const fileId = req.body.fileId;

      const movedFile = await moveFile({
        fileId: fileId,
        destinationBucketId: process.env.BACKBLAZE_MAIN_BUCKET_ID,
      });

      req.body.imageUrl = movedFile.url;
      //movedFile.url
      delete req.body.fileId;

      const album = await prisma.album.create({
        data: {
          ownerId: session.user.id,
          bucketId: "70e5d59def5906838b620310",
          bucketName: "fe-extremoyveloz",
          ...req.body,
        },
      });
      res.json({ created: true, album });
    }
  })

  .put(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401);
      res.end();
    }

    const album = await prisma.album.update({
      where: { id: req.body.id },
      data: {
        status: "DELETED",
      },
    });
    res.json({ deleted: true, album });
  })

  .patch(async (req, res) => {
    const { name, content, status, eventDate } = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401);
      res.end();
    }
    const album = await prisma.album.update({
      where: { id: req.body.id },
      data: {
        name,
        content,
        status,
        eventDate,
      },
    });
    res.json({ edited: true, album });
  })
  .delete(async (req, res) => { });

export default handler;
