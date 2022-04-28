const { generateUploadUrl, generateSignedURL } = require("../config/configS3");
const uploadImage = async (req,res) => {
  try {
    const data = await generateUploadUrl();
    return res.json({data});
  } catch (error) {
    throw error
  }
};
const getUrlImage = async (req,res) => {
  try {
    const path=req.body.path
    const urlImage = generateSignedURL(path, 900);
    return res.json({urlImage})
  } catch (error) {
    throw error
  }
};
module.exports = { uploadImage, getUrlImage };
