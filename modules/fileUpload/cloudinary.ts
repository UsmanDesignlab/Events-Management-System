import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: "ddbt1xklb",
  api_key:"491492488472368" ,
  api_secret:"nNYXtcTv_dhHVgdouLiFFyKzq4Y"
});

export const newStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'development',
      allowedFormats: ["png", "jpeg", "jpg"]
    };
  },
});

export const upload = multer({ storage: newStorage })
