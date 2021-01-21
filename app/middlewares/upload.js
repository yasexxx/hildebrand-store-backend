const util = require("util");
const multer = require("multer");

// var storage = new GridFsStorage({
//     url: process.env.MONGODB_URL ,
//     options: { useNewUrlParser:true, useUnifiedTopology: true  },
//     file: (req,file) => {
//         const match = ["image/png", "image/jpeg"];

//         if (match.indexOf(file.mimetype) === -1){
//             const filename = `${file.originalname}-${Date.now()}`;
//             return filename;
//         }

//         return {
//             bucketName: "photos",
//             filename: `${file.originalname}-${Date.now()}`,
//         };
//     }
// });

var storage = multer.memoryStorage();


var uploadFile = multer({ storage: storage }).single("file");
var uploadText = multer({ storage: storage }).single("text");
var uploadFilesMiddleware = util.promisify(uploadFile, uploadText);
module.exports = uploadFilesMiddleware;


