import { QueryResult, Client } from 'pg';

export default async function deletePost(client: Client, id: number) {
    const query = `
        DELETE
        FROM blog
        WHERE blogid = ${id};`
    try {
        const res: QueryResult = await client.query(query);
        return res;
    }
    catch (err) {
        console.log("Error querying blog:", err);
        return [];
    }  
}