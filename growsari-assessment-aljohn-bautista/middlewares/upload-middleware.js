const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const util = require('util');
const { isEmpty, includes } = require('lodash');
const { INVALID_FILE_TYPE, VALIDATION_ERROR } = require('../enums/error-codes');
const uploadTypes = require('../enums/upload-types');
const {
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_BUCKET_NAME,
} = require('../config');

AWS.config.update({
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  accessKeyId: AWS_ACCESS_KEY_ID,
  region: AWS_REGION,
});

const s3 = new AWS.S3();

const storage = multerS3({
  s3,
  bucket: AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    const { user, body } = req;
    const { id: userId, as: folder } = user;
    const { type } = body;

    if (isEmpty(body)) {
      return cb({ code: VALIDATION_ERROR, message: 'Upload details not found. Make sure data is sent before the file itself.' }, false);
    }

    if (!includes(uploadTypes, type)) {
      return cb({ code: VALIDATION_ERROR, message: 'Invalid upload type' }, false);
    }

    const extname = path.extname(file.originalname).toLowerCase();
    const filename = `${folder}s/${userId}/${type}${extname}`;

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }

  const message = `${file.originalname} is invalid. Must be of type jpeg|jpg|png|gif`;
  return cb({ code: INVALID_FILE_TYPE, message }, false);
};

const uploadFiles = multer({
  fileFilter,
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1mb
});

module.exports = util.promisify(uploadFiles.single('file'));
