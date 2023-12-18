// src/app/api/auth/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { getMongoClientInstance } from '../../../db/config/index';
import { admin } from '../../../db/config/firebaseAdminInit';

type Request = {
    headers: {
        get: (key: string) => string | null;
    };
};

type MyResponse<T> = {
    status: number;
    message: string;
    data?: T;
};

export async function POST(request: NextRequest) {
    const token = request.headers.get('authorization')?.split('Bearer ')[1];
    if (!token) {
        return NextResponse.json(<MyResponse<unknown>>{
            status: 401,
            message: 'Unauthorized',
        });
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
        return NextResponse.json(<MyResponse<unknown>>{
            status: 200,
            message: 'success',
            data: { email, uid },
        });
    } catch (error) {
        return NextResponse.json(<MyResponse<unknown>>{
            status: 500,
            message: error as string,
        });
    }
}

export async function GET(request: Request) {
    return NextResponse.json({ message: "Hello World" });
}
