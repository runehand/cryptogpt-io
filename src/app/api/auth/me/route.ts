import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
        return NextResponse.json({ success: false, error: 'Token is required' }, { status: 400 })
    }

    const supabase = createCustomServerClient();
    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error) {
            console.error('Error fetching user info:', error);
            return NextResponse.json({ success: false, error: 'Failed to authenticate user' }, { status: 401 });
        }

        const { data: authUser, error: authUserError } = await supabase
            .from('auth_users')
            .select('encrypted_password')
            .eq('id', user?.id)
            .single();

        if (authUserError) {
            console.error('Error fetching encrypted password:', authUserError);
            return NextResponse.json({ success: false, error: 'Failed to fetch encrypted password' }, { status: 500 });
        }

        return NextResponse.json({
            success: true, data: {
                user: {
                    ...user,
                    encrypted_password_exists: !!authUser?.encrypted_password
                }
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error in fetching user info:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
