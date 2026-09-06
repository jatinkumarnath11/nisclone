import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { FILE_UPLOAD_LIMITS } from '@ums/shared';
import { ValidationError } from '../utils/errors.util';

// In-memory storage for buffering before stream upload to S3 / MinIO
const storage = multer.memoryStorage();

const allowedMimeTypes = new Set<string>([
  ...FILE_UPLOAD_LIMITS.ALLOWED_IMAGE_TYPES,
  ...FILE_UPLOAD_LIMITS.ALLOWED_DOCUMENT_TYPES,
]);

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (allowedMimeTypes.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ValidationError(
        `Unsupported file type: ${file.mimetype}. Allowed types are: images (JPG, PNG, WebP) and documents (PDF, DOC, DOCX, TXT)`
      )
    );
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: FILE_UPLOAD_LIMITS.MAX_FILE_SIZE_BYTES, // 25 MB
  },
  fileFilter,
});

export const uploadSingle = (fieldName: string) => upload.single(fieldName);
export const uploadMultiple = (fieldName: string, maxCount = 5) =>
  upload.array(fieldName, maxCount);

export interface UploadedFileMeta {
  key: string;
  bucket: string;
  url: string;
  size: number;
  mimeType: string;
  originalName: string;
}

// Storage abstraction interface for AWS S3 / Local MinIO
export interface FileStorageProvider {
  uploadFile(file: Express.Multer.File, folder: string): Promise<UploadedFileMeta>;
  deleteFile(key: string): Promise<void>;
  getSignedDownloadUrl(key: string, expiresInSeconds?: number): Promise<string>;
}
