const express = require("express");
const upload=require("./uploadController/uploadController");
const router = express.Router();

router.get('/upload',upload.uploadImage);
router.get('/getUrlImage',upload.getUrlImage);

module.exports=router