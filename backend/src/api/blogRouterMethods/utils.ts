import { Client } from 'pg';

export function startClient(){
    let client;
    if (!process.env.DATABASE_URL) {
        client = new Client();
    } else {
        client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        });
    }
    client.connect();
    return client;
};

type BlogBlock = {
    blocktype: string;
    blockcontent: string;
    blockorder: number;
};

export function writeQuery(elements: BlogBlock[], title: string, id: number, tags: string[], headerImage: string){
    let query = `INSERT INTO blog (headerimage, tags, blockorder, islive, blogdate, blogid, blockcontent, blogtitle, blocktype) VALUES`
    const values = [];
    const params = [];
    let paramIndex = 1;
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        values.push(`($${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++})`);
        params.push(
            headerImage,
            JSON.stringify(tags),
            el.blockorder,
            true,
            new Date(),
            id,
            el.blockcontent,
            title,
            el.blocktype,
        );
    }
    query += values.join(', ')
    return { query, params };
};