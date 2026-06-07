import { NextRequest, NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function GET(req: NextRequest) {
  const supabase = createCustomServerClient();
  const userHeader = req.headers.get("x-user") as string;

  if (!userHeader) {
    return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
  }
  const user = JSON.parse(userHeader);

  try {
    // Get profile from users_profile table
    const { data: profileData, error: profileError } = await supabase
      .from("users_profile")
      .select("*")
      .eq("user_id", user?.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        { code: profileError.code, error: profileError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(profileData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const supabase = createCustomServerClient();
  const userHeader = req.headers.get("x-user") as string;

  if (!userHeader) {
    return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
  }
  const user = JSON.parse(userHeader);
  console.log("userId", user)
  try {
    const body = await req.json();

    // Check if user_name already exists
    const { data: existingUsername } = await supabase
      .from("users_profile")
      .select("user_name")
      .eq("user_name", body.user_name)
      .single();

    if (existingUsername) {
      return NextResponse.json(
        { error: { username: "username already exists" } },
        { status: 409 }
      );
    }

    // // Check if email already exists
    // const { data: existingEmail } = await supabase
    //   .from("users_profile")
    //   .select("email")
    //   .eq("email", body.email)
    //   .single();

    // if (existingEmail) {
    //   return NextResponse.json(
    //     { error: "email already exists" },
    //     { status: 409 }
    //   );
    // }

    // If both checks pass, insert the new profile

    const { data: existingUserProfile } = await supabase
      .from("users_profile")
      .select("user_name")
      .eq("user_id", user?.id)
      .single();

    if (existingUserProfile) {
      const { error } = await supabase
        .from('users_profile')
        .update({ ...body })
        .eq('user_id', user?.id)
      console.log('error', error)
      if (error) {
        return NextResponse.json({ success: false, error: 'Error updating user profile' }, { status: 500 });
      }
    } else {
      const { error } = await supabase
        .from("users_profile")
        .insert([{ ...body, user_id: user.id }])
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({
      message: "User profile created or updated successfully"
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    return NextResponse.json(
      { error: "Failed to create profile data" },
      { status: 500 }
    );
  }
}
