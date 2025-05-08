import { QueryResult, Client } from 'pg';
import { writeQuery } from './utils'

const getOriginalDate = async (id: number, client :Client) => {
    const date = await client.query("SELECT blogDate FROM blog WHERE blogId = " + id);
    return date.rows[0].blogdate;
}

export default async function editPost(reqBody: any, client: Client) {
    const title = reqBody.title;
    const elements = reqBody.elements;
    const tags = reqBody.tags;
    const headerImage = reqBody.headerImage;
    const id = reqBody.id;

    if (elements.length == 0 || title == "") {
        throw new Error("No Elements Added");
    }

    const date = await getOriginalDate(id, client);

    const { query, params } = writeQuery(elements, title, id, tags, headerImage, date);
    await client.query(`DELETE FROM blog WHERE blogid = ${id}`);

    try {
        const res: QueryResult = await client.query(query, params);
        return res.rows || [];
    }
    catch (err) {
        console.log("Error querying blog:", err);
        return [];
    }
}