import {createPool} from '@vercel/postgres';
import { NextResponse } from 'next/server';

const pool = createPool({
    connectionString: 'postgres://default:ayjNn08BPSgr@ep-falling-hat-14938566-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb',
});

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const password = searchParams.get('password');

    try {
        if (!email || !password) throw new Error('Pet and owner names required');

        const client = await pool.connect();

        //await client.query(`INSERT INTO Pets (Name, Owner) VALUES (${petName}, ${ownerName});`);
        await client.query('INSERT INTO Users (Email, Password) VALUES ($1, $2);', [email, password]);


        const result = await client.query(`SELECT * FROM Users;`);

        client.release(); // Gib den Client zurück in den Pool

        const users = result.rows;
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}