import {createPool} from '@vercel/postgres';
import { NextResponse } from 'next/server';

const pool = createPool({
    connectionString: 'postgres://default:ayjNn08BPSgr@ep-falling-hat-14938566-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb',
});

export async function POST(request) {
    try {
        //const {email, password} = await request.json();
        const email ="killer@gmail.com";
        const password = "1234";
        console.log('Received data:', email, password);
        /*const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        const password = searchParams.get('password');*/

        if (!email || !password) throw new Error('Email and Password required');

        const client = await pool.connect();

        await client.query('INSERT INTO Users (Email, Password) VALUES ($1, $2);', [email, password]);


        const result = await client.query(`SELECT * FROM Users;`);

        client.release(); // Gib den Client zurück in den Pool

        const users = result.rows;
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}