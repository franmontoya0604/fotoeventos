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
})
  .get((req, res) => {
    res.send("Hello world");
  })
  .post(async (req, res) => {
    // TODO USER AUTH
    req.body.tags.forEach(async (tagin) => {
      let result = await prisma.tags.findFirst({
        where: {
          albumid: req.body.photo.album_id,
          tag: tagin,
        },
      });
      if (result == null) {
        result = await prisma.tags.create({
          data: {
            albumid: req.body.photo.album_id,
            tag: tagin,
          },
        });
      }
      //Needs to remove all tags before creating a new one
      const deleteTags = await prisma.PhotoTag.deleteMany({
        where: {
          tagid: result.id,
          photoid: req.body.photo.id,
        },
      });

      await prisma.PhotoTag.create({
        data: {
          tagid: result.id,
          photoid: req.body.photo.id,
        },
      });
    });

    // for (let taginput in req.body.tags) {
    //     let result = await prisma.tags.findFirst({
    //         where: {
    //             userid: 2,
    //             tag: String(taginput)
    //         }
    //     });
    // if(tag) {
    //
    // }
    // }

    res.json({ hello: "world" });
  })
  .put(async (req, res) => {
    res.end("async/await is also supported!");
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

export default handler;
