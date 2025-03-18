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
        console.log(elements);
        let id = await getMaxIdFromBlogs();
        if (id.max == null) {
            id = 1;
        } else {
            id = Number(id.max) + 1;
        }
        let query = 'INSERT INTO blog (blogTitle, blogId, blockType, blockOrder, blockContent, isLive) VALUES ';
        for (let i = 0; i < elements.length; i++) {
            query += `('${title.replace(/'/g, "''")}', ${id}, '${elements[i].blocktype.replace(/'/g, "''")}', ${elements[i].blockorder}, '${elements[i].blockcontent.replace(/'/g, "''")}', ${true})`;
            if (i != elements.length - 1) {
                query += ', ';
            }
        }
        client.query(query);
        res.status(200).json({ message: 'Blog created' });
    }
    if (action == 'edit') {
        console.log("EDITING")
        let query = `DELETE FROM blog WHERE blogId = ${id}`;
        client.query(query);
        if(elements.length === 0){
            res.status(200).json({ message: 'Blog edited' });
            return;
        }
        query = 'INSERT INTO blog (blogTitle, blogId, blockType, blockOrder, blockContent, isLive) VALUES ';
        for (let i = 0; i < elements.length; i++) {
            query += `('${title.replace(/'/g, "''")}', ${id}, '${elements[i].blocktype.replace(/'/g, "''")}', ${elements[i].blockorder}, '${elements[i].blockcontent.replace(/'/g, "''")}', ${true})`;
            if (i != elements.length - 1) {
                query += ', ';
            }
        }
        try {
            console.log("trying to edit")
            console.log(query)
            client.query(query);
            res.status(200).json({ message: 'Blog edited' });
        }
        catch (err: any) {
            console.log(err);
        }
    }
    if (action == 'fetchAllPosts') {
        console.log("FETCH ALL POSTS")
        const query = 'SELECT * FROM blog';
        try {
            const result = await client
                .query(query);
            console.log(result.rows);
            res.status(200).json(result.rows);
        } catch (err: any) {
            console.log("WHAT THE FUCKK")
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
        const query = `SELECT * FROM blog WHERE blogId = ${id}`;
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