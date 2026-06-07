import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const userHeader = req.headers.get("x-user") as string;
        if (!userHeader) {
            return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
        }
        const user = JSON.parse(userHeader);

        const body = await req.json();
        console.log('body', body);

        const { id, label, type, color, icon, is_default } = body;

        const { data, error } = await supabase
            .from('user_status')
            .insert({
                value: id,
                label,
                type,
                color,
                icon,
                is_default,
            })
            .select();


        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data[0], { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { data, error } = await supabase
            .from('user_status')
            .select('*');

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data || [], { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization')?.split('Bearer ')[1];
        const { data: { user } } = await supabase.auth.getUser(token);
        console.log('user', user);

        const body = await req.json();
        console.log('body', body);

        const { status } = body;

        const { data, error } = await supabase
            .from('users_profile')
            .update({ status })
            .eq('user_id', user?.id)
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data[0], { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('user_status')
            .delete()
            .eq('value', id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}