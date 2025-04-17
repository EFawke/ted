import express from 'express';
const blogRouter = express.Router();
const { Client } = require('pg');
const axios = require('axios');

let client;
if (!process.env.DATABASE_URL) {
    client = new Client();
} else {
    client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        allowExitOnIdle: true
    });
}
client.connect();

blogRouter.use(express.json());

const getMaxIdFromBlogs = async () => {
    const query = 'SELECT MAX(blogId) FROM blog';
    try {
        const result = await client
            .query(query);
        return result.rows[0];
    } catch (err: any) {
        console.log(err);
    }
};


blogRouter.post('/', async (req, res) => {
    const title = req.body.title;
    const elements = req.body.elements;
    const action = req.body.action;
    const id = req.body.blogId;

    if (action == 'create') {
        const headerImage = req.body.headerImage || '';
        const tags = req.body.tags || [];
        
        let id = await getMaxIdFromBlogs();
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
            if (i != elements.length - 1) query += ', ';
        }
        client.query(query);
        res.status(200).json({ message: 'Blog created' });
    }
    if (action == 'edit') {
        const headerImage = req.body.headerImage || '';
        const tags = req.body.tags || [];
        
        let query = `DELETE FROM blog WHERE blogId = ${id}`;
        await client.query(query);
        
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
            if (i != elements.length - 1) query += ', ';
        }
        client.query(query);
        res.status(200).json({ message: 'Blog edited' });
    }
    if (action == 'fetchAllPosts') {
        const query = 'SELECT * FROM blog';
        try {
            const result = await client
                .query(query);
            res.status(200).json(result.rows);
        } catch (err: any) {
            console.log(err);
        }

    }
    if (action == 'delete') {
        const query = `DELETE FROM blog WHERE blogId = ${id}`;
        try {
            const result = await client
                .query(query);
            res.status(200).json(result.rows);
        } catch (err: any) {
            console.log(err);
        }
    }
    if (action == 'fetchPost') {
        const query = `SELECT * FROM blog WHERE blogId = ${id} ORDER BY blockOrder DESC`;
        try {
            const result = await client
                .query(query);
            res.status(200).json(result.rows);
        } catch (err: any) {
            console.log(err);
        }
    }
    if (action == 'archive') {
        const query = `UPDATE blog SET isLive = false WHERE blogId = ${id}`;
        try {
            const result = await client
                .query(query);
            res.status(200).json(result.rows);
        } catch (err: any) {
            console.log(err);
        }
    }
    if (action == 'publish') {
        const query = `UPDATE blog SET isLive = true WHERE blogId = ${id}`;
        try {
            const result = await client
                .query(query);
            res.status(200).json(result.rows);
        } catch (err: any) {
            console.log(err);
        }
    }
});

module.exports = blogRouter;