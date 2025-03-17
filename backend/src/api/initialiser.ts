const { Client } = require('pg');
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

client.query(`
    CREATE TABLE IF NOT EXISTS blog (
    id SERIAL PRIMARY KEY,
    blogTitle TEXT,
    blogId INT,
    blockType TEXT,
    blockOrder INT,
    blockContent TEXT,
    isLive BOOLEAN DEFAULT FALSE,
    blogDate DATE DEFAULT CURRENT_DATE
    );`)
    .then(() => console.log('Table created successfully'))
    .catch((err :Error) => console.error(err))
