export const APP_NAME = 'University Management System';
export const APP_SHORT_NAME = 'UMS';
export const API_VERSION = 'v1';

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: '15m',
  REFRESH_TOKEN: '7d',
} as const;

export const FILE_UPLOAD_LIMITS = {
  MAX_FILE_SIZE_BYTES: 25 * 1024 * 1024, // 25 MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
} as const;
