import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { supabase } from 'src/lib/supabase';

const publicEndpoints = [
    '/api/auth',
    '/api/profile/status/',
    '/api/video-stream',
]

export async function middleware(request: NextRequest) {
    console.log('Middleware executed for path:', request.nextUrl.pathname);

    if (request.method === 'OPTIONS') {
        return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith('/api/') &&
        !publicEndpoints.some(endpoint => request.nextUrl.pathname.startsWith(endpoint))) {
        const token = request.headers.get('Authorization')?.split('Bearer ')[1];

        if (!token) {
            return NextResponse.json({ error: 'No token provided' }, { status: 401 });
        }

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const response = NextResponse.next();
        const userData = {
            id: user.id,
            email: user.email,
            phone: user.phone,
        };
        response.headers.set('x-user', JSON.stringify(userData));

        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/api/:path*'
    ]
};