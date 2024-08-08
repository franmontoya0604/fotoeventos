import B2 from "backblaze-b2";
import { nanoid } from "nanoid";
import path from "path";

export const moveFile = async ({ fileId, destinationBucketId }) => {
    const B2Client = await connectB2();
    const fileName = await getFilename(fileId);
    const { data } = await B2Client.copyFile({
        destinationBucketId: destinationBucketId,
        sourceFileId: fileId,
        fileName: fileName,
    });
    if (data) {
        B2Client.deleteFileVersion({
            fileId: fileId,
            fileName: fileName,
        });
    }
    const downloadUrl = await getDownloadUrl();
    data.url = `${downloadUrl}/file/${process.env.BACKBLAZE_MAIN_BUCKET_NAME}/${fileName}`;
    return data;
};

export const getFilename = async (fileId) => {
    const B2Client = await connectB2();
    const fileInfo = await B2Client.getFileInfo({ fileId: fileId });
    return fileInfo.data.fileName;
};

const connectB2 = async () => {
    const b2 = new B2({
        applicationKeyId: process.env.BACKBLAZE_KEY_ID,
        applicationKey: process.env.BACKBLAZE_APP_KEY,
    });
    await b2.authorize();
    return b2;
};

export const getDownloadUrl = async () => {
    const b2 = await connectB2();
    const { data: authData } = await b2.authorize();
    return authData.downloadUrl;
};

export const createRandomFilename = (filepath) => {
    const reqFilename = path.parse(filepath);
    return nanoid(5) + reqFilename.ext;
};
