import multer from "multer";

// Bellek tabanlı depolama (S3'e göndereceğiz zaten)
const storage = multer.memoryStorage();

/**
 * Tekli dosya yükleme için.
 * Örnek: aws3UploadSingle("image")
 */
export const aws3UploadSingle = (fieldName = "image") =>
  multer({ storage }).single(fieldName);

/**
 * Çoklu alanlarla dosya yüklemek için.
 * Örnek: aws3UploadFields([{ name: "profileImage", maxCount: 1 }])
 */
export const aws3UploadFields = (fields) => multer({ storage }).fields(fields);
