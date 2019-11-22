const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = cloudinaryStorage({
    cloudinary,
    folder: "blog_images",
    allowedFormats: ["jpg", "png"],
    // transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const imageParser = multer({ storage });

module.exports = {
    port: process.env.PORT,
    secret: process.env.SECRET,
    connectionString: process.env.CONNECTION_STRING,
    imageParser: imageParser
};