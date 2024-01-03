import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';

const pool = createPool({
    connectionString: 'postgres://default:ayjNn08BPSgr@ep-falling-hat-14938566-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb',
});

export async function GET(request) {
    try {
        const client = await pool.connect();
        const result = await client.query('CREATE TABLE Users ( Email varchar(255), Password varchar(255) );');
        client.release(); // Gib den Client zurück in den Pool
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

