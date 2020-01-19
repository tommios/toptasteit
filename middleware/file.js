const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const keys = require("../keys");

aws.config.update({
  secretAccessKey: keys.Secret_Access_Key,
  accessKeyId: keys.Access_Key_Id,
  region: "eu-central-1"
});

const s3 = new aws.S3();

const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage: multerS3({
    s3: s3,
    bucket: keys.Bucket_Name + "/images",
    ACL: "public-read",
    key: function(req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    }
  }),
  fileFilter: fileFilter
});
