// import multer from 'multer';
// import crypto from "crypto";
// import path from "path";

// // Disk Storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images/upload')
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(10,function(err,bytes){
//       const fn = bytes.toString("hex") +path.extname(file.originalname)
//       cb(null, fn);
//     })
//   }
// })

// // export upload variable
// export const upload = multer({ storage: storage })




import multer from "multer";
import { newStorage } from "./cloudinary";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "newStorage")
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })

export const upload = multer({ storage: newStorage })