import express from 'express';
import { startClient } from './blogRouterMethods/utils';
import { readAll, getPost } from './blogRouterMethods/read';
import deletePost from './blogRouterMethods/delete';
import createPost from './blogRouterMethods/create';
import editPost from './blogRouterMethods/edit';
import { Request } from 'express';
const blogRouter = express.Router();

let client = startClient();

blogRouter.use(express.json());

blogRouter.post('/getAll', async (req, res) => {
    try {
        const posts = await readAll(client).then((response: any) => response)
        res.status(200).send(posts);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})

blogRouter.post('/getPost', async (req, res) => {
    try {
        const post = await getPost(client, req.body.blogId).then((response: any) => response)
        res.status(200).send(post)
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})

blogRouter.post('/delete', async (req, res) => {
    try {
        await deletePost(client, req.body.blogId)
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

blogRouter.post('/create', async (req, res) => {
    const idResult = await client.query('SELECT MAX(blogId) as max FROM blog');
    const id = idResult.rows[0].max ? Number(idResult.rows[0].max) + 1 : 1;
    try {
        await createPost(req.body, client, id)
        res.status(200).send({id: id});
    }
    catch (err) {
        res.status(500).send(err);
    }
})

blogRouter.post('/edit', async (req, res) => {
    try {
        const id = await editPost(req.body, client)
        res.status(200).send({id: id});
    }
    catch (err) {
        res.status(500).send(err);
    }
})

module.exports = blogRouter;