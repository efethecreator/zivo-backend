import multer from "multer";

const storage = multer.memoryStorage();

export const aws3UploadSingle = (fieldName = "image") =>
  multer({ storage }).single(fieldName);

export const aws3UploadFields = (fields) => multer({ storage }).fields(fields);
