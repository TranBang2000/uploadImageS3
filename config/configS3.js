const fs = require("fs");
const AWS = require("aws-sdk");
const uuid = require("uuid");
require('dotenv').config()
const configS3 = {
  bucketName: process.env.S3_BUCKET,
  region:process.env.S3_REGION,
  accessKeyId: process.env.S3_KEY_ID,
  secretAccessKey: process.env.S3_SECRET,
};

AWS.config.update({
  accessKeyId: configS3.accessKeyId,
  secretAccessKey: configS3.secretAccessKey,
  region: configS3.region,
  signatureVersion: "v4",
});

const s3 = new AWS.S3();


/**
 * generate signed s3 url. Returns image path with limited lifetime
 * @param {*} key: Saved on DB
 * @param {*} expires: lifetime
 * @returns fileUrl
 */
const generateSignedURL = (path, expires) => {
  const signedUrl = s3.getSignedUrl("getObject", {
    Key: path,
    Bucket: configS3.bucketName,
    Expires: expires || 900, // S3 default is 900 seconds (15 minutes)
  });
  return signedUrl;
};

const generateUploadUrl = async () => {
  const name = uuid.v4();
  const params = {
    Bucket: configS3.bucketName,
    //ACL: 'public-read',
    Expires: 900,
    Key: "original/" + uuid.v4(),
  };
  const path = params.Key;

  const signedUrl = await s3.getSignedUrlPromise("putObject", params);
  return {
    url: signedUrl,
    path,
  };
};

module.exports = {
  generateSignedURL,
  generateUploadUrl,
};
