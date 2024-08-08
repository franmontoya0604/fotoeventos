import { PrismaClient } from "@prisma/client";
import B2 from "backblaze-b2";
import multer from "multer";
import { getServerSession } from "next-auth/next";
import nc from "next-connect";
import { authOptions } from "../auth/[...nextauth]";
import { createRandomFilename } from "./lib";

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({});
const prisma = new PrismaClient();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error({ err });
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = upload.single("files");

// Adds the middleware to Next-Connect
handler.use(uploadMiddleware);

handler.post(async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  //TODO check if user has permissions to upload photos and owns the album

  const fileName = createRandomFilename(req.file.originalname);
  const b2 = new B2({
    applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    applicationKey: process.env.BACKBLAZE_APP_KEY,
  });

  let savePhoto = false;

  // b2 auth tokens are valid for 24 hours
  // .authorize returns the download url,
  // .getUploadUrl returns the upload url and auth token
  const { data: authData } = await b2.authorize();
  let bucketId = process.env.BACKBLAZE_TEMP_BUCKET_ID;

  if (req.headers.bucketid) {
    bucketId = req.headers.bucketid;
    savePhoto = true;
    if (!req.headers.albumid) {
      res.status(406);
    }
  }

  const { data: uploadData } = await b2.getUploadUrl({
    bucketId: bucketId,
  });

  try {
    const { data } = await b2.uploadFile({
      uploadUrl: uploadData.uploadUrl,
      uploadAuthToken: uploadData.authorizationToken,
      data: req.file.buffer,
      // there are no real directories in b2, if you want to place
      // your file in a folder structure, do so with slashes. ex:
      //   fileName: `/my-subfolder/uploads/${fileName}`
      fileName,
      // info: {}, // store optional info, like original file name
    });
    if (savePhoto) {
      //ADD to database:
      const album = await prisma.photo.create({
        data: {
          album_id: parseInt(req.headers.albumid),
          original_name: data.fileName,
          fileId: data.fileId,
          status: "PROCESSING",
        },
      });
    }

    res.status(200).json({
      // add timestamp to url to force re-fetching images with the same src
      //`${downloadURL}/file/${bucketName}/${data.fileName}?timestamp=${data.uploadTimestamp}`
      fileId: data.fileId,
    });
  } catch (e) {
    res.status(500);
  }
});

// tell next.js to disable body parsing and handle as a stream
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
