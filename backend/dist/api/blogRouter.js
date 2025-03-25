"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogRouter = express_1.default.Router();
const { Client } = require('pg');
const axios = require('axios');
let client;
if (!process.env.DATABASE_URL) {
    client = new Client();
}
else {
    client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        allowExitOnIdle: true
    });
}
client.connect();
blogRouter.use(express_1.default.json());
const getMaxIdFromBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT MAX(blogId) FROM blog';
    try {
        const result = yield client
            .query(query);
        return result.rows[0];
    }
    catch (err) {
        console.log(err);
    }
});
blogRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const elements = req.body.elements;
    const action = req.body.action;
    const id = req.body.blogId;
    if (action == 'create') {
        const headerImage = req.body.headerImage || '';
        const tags = req.body.tags || [];
        let id = yield getMaxIdFromBlogs();
        id = id.max ? Number(id.max) + 1 : 1;
        // Add headerImage and tags to the insert
        let query = 'INSERT INTO blog (blogTitle, blogId, blockType, blockOrder, blockContent, isLive, headerImage, tags) VALUES ';
        for (let i = 0; i < elements.length; i++) {
            query += `(
                '${title.replace(/'/g, "''")}', 
                ${id}, 
                '${elements[i].blocktype.replace(/'/g, "''")}', 
                ${elements[i].blockorder}, 
                '${elements[i].blockcontent.replace(/'/g, "''")}', 
                ${true},
                '${headerImage.replace(/'/g, "''")}',
                '${JSON.stringify(tags).replace(/'/g, "''")}'
            )`;
            if (i != elements.length - 1)
                query += ', ';
        }
        client.query(query);
        res.status(200).json({ message: 'Blog created' });
    }
    if (action == 'edit') {
        const headerImage = req.body.headerImage || '';
        const tags = req.body.tags || [];
        let query = `DELETE FROM blog WHERE blogId = ${id}`;
        yield client.query(query);
        query = 'INSERT INTO blog (blogTitle, blogId, blockType, blockOrder, blockContent, isLive, headerImage, tags) VALUES ';
        for (let i = 0; i < elements.length; i++) {
            query += `(
                '${title.replace(/'/g, "''")}', 
                ${id}, 
                '${elements[i].blocktype.replace(/'/g, "''")}', 
                ${elements[i].blockorder}, 
                '${elements[i].blockcontent.replace(/'/g, "''")}', 
                ${true},
                '${headerImage.replace(/'/g, "''")}',
                '${JSON.stringify(tags).replace(/'/g, "''")}'
            )`;
            if (i != elements.length - 1)
                query += ', ';
        }
        client.query(query);
        res.status(200).json({ message: 'Blog edited' });
    }
    if (action == 'fetchAllPosts') {
        const query = 'SELECT * FROM blog';
        try {
            const result = yield client
                .query(query);
            res.status(200).json(result.rows);
        }
        catch (err) {
            console.log(err);
        }
    }
    if (action == 'delete') {
        const query = `DELETE FROM blog WHERE blogId = ${id}`;
        try {
            const result = yield client
                .query(query);
            res.status(200).json(result.rows);
        }
        catch (err) {
            console.log(err);
        }
    }
    if (action == 'fetchPost') {
        const query = `SELECT * FROM blog WHERE blogId = ${id}`;
        try {
            const result = yield client
                .query(query);
            res.status(200).json(result.rows);
        }
        catch (err) {
            console.log(err);
        }
    }
    if (action == 'archive') {
        const query = `UPDATE blog SET isLive = false WHERE blogId = ${id}`;
        try {
            const result = yield client
                .query(query);
            res.status(200).json(result.rows);
        }
        catch (err) {
            console.log(err);
        }
    }
    if (action == 'publish') {
        const query = `UPDATE blog SET isLive = true WHERE blogId = ${id}`;
        try {
            const result = yield client
                .query(query);
            res.status(200).json(result.rows);
        }
        catch (err) {
            console.log(err);
        }
    }
}));
module.exports = blogRouter;
