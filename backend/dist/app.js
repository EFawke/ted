"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// app.ts
const googleRouter_1 = __importDefault(require("./auth/googleRouter"));
dotenv_1.default.config();
const apiRouter = require('./api/apiRouter');
// const googleRouter = require('./auth/googleRouter');
const app = (0, express_1.default)();
// const path = require('path');
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', apiRouter);
app.use('/auth/google', googleRouter_1.default);
// Serve static files from public directory
app.use(express_1.default.static('public'));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, './public/uploads')));
let port = process.env.PORT ? parseInt(process.env.PORT) : 8000;
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('../frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
    });
}
app.listen(port);
console.log(`Listening on port ${port}`);
