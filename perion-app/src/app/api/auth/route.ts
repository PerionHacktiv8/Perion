// src/pages/api/auth/route.ts
import { getMongoClientInstance } from '../../../db/config/index';
import { admin } from '../../config/firebaseAdminInit';
import { NextResponse, NextRequest } from 'next/server';


// POST handler
export async function POST(request: NextRequest) {
    const token = request.headers.get('authorization')?.split('Bearer ')[1];
    if (!token) {
        return NextResponse.next();
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { email, uid } = decodedToken;
        const db = await getMongoClientInstance();

        const result = await db.collection('users').updateOne(
            { uid },
            { $set: { email, uid } },
            { upsert: true }
        );
        console.log(result);
        return NextResponse.next({
            status: 200,
        });
    } catch (error) {
        return NextResponse.next();
    }
}

// GET handler
export async function GET(request: Request) {
    // ...
    return NextResponse.json({ message: "Hello World" });
}