import { QueryResult, Client } from 'pg';

export async function readAll(client: Client) {
    const query = `
        SELECT
        headerimage,
        tags,
        blockorder,
        islive,
        blogdate,
        blogid,
        blockcontent,
        blogtitle
    FROM blog
    WHERE blockorder = 0
    ORDER BY blogdate DESC;`
    try {
        const res: QueryResult = await client.query(query);
        console.log(res.rows);
        return res.rows || [];
    }
    catch (err) {
        console.log("Error querying blog:", err);
        return [];
    }    
}

export async function getPost(client: Client, id: number) {
    const query = `
        SELECT
            headerimage,
            tags,
            blockorder,
            islive,
            blogdate,
            blogid,
            blockcontent,
            blogtitle,
            blocktype
        FROM blog
        WHERE blogid = ${id}
        ORDER BY blockorder;`
    try {
        const res: QueryResult = await client.query(query);
        return res.rows || [];
    }
    catch (err) {
        console.log("Error querying blog:", err);
        return [];
    }  
}