"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uploadRouter = express_1.default.Router();
// Configure multer storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../public/uploads/')); // Change path as needed
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage });
uploadRouter.post('/', upload.single('image'), (req, res) => {
    if (req.file) {
        console.log("Uploaded file path:", req.file.path);
        // Send back a URL that can be accessed in the browser
        res.status(200).json({ url: `/uploads/${req.file.filename}` });
    }
    else {
        res.status(500).json({ error: "Error uploading file" });
    }
});
module.exports = uploadRouter;
