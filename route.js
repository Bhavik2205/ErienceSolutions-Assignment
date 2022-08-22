import express from "express";
import { getallData, addData, updateData, deleteData } from "./controller.js";
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    if(
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ){
        cb(null, true);
    }else {
        cb(null, false);
    }
};

const upload = multer({storage, filefilter});

router.get('/getAll', getallData);
router.post('/createData', upload.single('ProfilePicture'), addData);
router.patch('/updateData/:dataId', upload.single('ProfilePicture'), updateData);
router.delete('/deleteData/:dataId', deleteData);

export default router;