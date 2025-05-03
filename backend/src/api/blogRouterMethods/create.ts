import { QueryResult, Client } from 'pg';
import { writeQuery } from './utils'

export default async function createPost(reqBody: any, client: Client, id: number) {
    const title = reqBody.title;
    const elements = reqBody.elements;
    const tags = reqBody.tags;
    const headerImage = reqBody.headerImage

    if (elements.length == 0 || title == "") {
        throw new Error("No Elements Added");
    }

    const { query, params } = writeQuery(elements, title, id, tags, headerImage);

    try {
        const res: QueryResult = await client.query(query, params);
        return res.rows || [];
    }
    catch (err) {
        throw new Error("Something went wrong!");
    }
}