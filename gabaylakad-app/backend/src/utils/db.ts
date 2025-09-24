import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

export const query = (text: string, params?: any[]) => {
    return pool.query(text, params);
};

export const getClient = async () => {
    const client = await pool.connect();
    return client;
};