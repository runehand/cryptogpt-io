import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { createCustomServerClient } from "src/utils/supabase";

function generateRandomFilename(length: number = 32): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let result: string = '';

  // eslint-disable-next-line no-plusplus
  for (let i: number = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return `${result}.png`;
}

async function fetchImageBuffer(imageUrl: string): Promise<Buffer> {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
}

// eslint-disable-next-line consistent-return
const uploadImage = async (imageUrl: string) => {
  const filename = generateRandomFilename();
  const REGION = '';
  const STORAGE_ZONE_NAME = 'updated-upy';
  const ACCESS_KEY = 'f9dfe60e-2b46-457b-ae153a3662eb-293b-4e1e';
  let base_url = "storage.bunnycdn.com";
  if (REGION) {
    base_url = `${REGION}.${base_url}`;
  }

  const url = `https://${base_url}/${STORAGE_ZONE_NAME}/images/${filename}`;
  const headers = {
    "AccessKey": ACCESS_KEY,
    "Content-Type": "application/octet-stream",
    "accept": "application/json"
  };
  try {
    const imageBuffer = await fetchImageBuffer(imageUrl);
    // eslint-disable-next-line no-plusplus
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const response = await fetch(url, {
          method: 'PUT',
          headers,
          body: imageBuffer as unknown as BodyInit,
        });

        if (response.status === 201) {
          return { success: true, file_url: `https://upyai.b-cdn.net/images/${filename}` };
        }
        if (attempt === 5 || ![502, 503, 504].includes(response.status)) {
          // eslint-disable-next-line no-await-in-loop
          const message = await response.text();
          return { success: false, status_code: response.status, message };
        }
      } catch (error) {
        if (attempt === 5) {
          return { success: false, message: error.message };
        }
      }
    }
  } catch (error) {
    return { success: false, message: `Failed to fetch image: ${error.message}` };
  }
}

export async function PUT(req: NextRequest) {
  const supabase = createCustomServerClient();
  const userHeader = req.headers.get("x-user") as string;

  if (!userHeader) {
    return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
  }
  const user = JSON.parse(userHeader);

  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ success: false, error: 'Image URL is required.' }, { status: 400 });
    }

    const uploadResult = await uploadImage(imageUrl);
    if (!uploadResult?.success) {
      return NextResponse.json({ success: false, error: uploadResult?.message }, { status: 500 });
    }

    const { data: existingUserProfile } = await supabase
      .from("users_profile")
      .select("user_id")
      .eq("user_id", user?.id)
      .single();

    if (existingUserProfile) {
      const { error } = await supabase
        .from('users_profile')
        .update({ avatar: uploadResult?.file_url })
        .eq('user_id', user?.id)
      if (error) {
        return NextResponse.json({ success: false, error: 'Error updating user profile' }, { status: 500 });
      }
    } else {
      const { error } = await supabase
        .from("users_profile")
        .insert([{ avatar: uploadResult?.file_url, user_id: user.id }])
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { success: false, error: `An error occurred: ${error.message}` },
      { status: 500 }
    );
  }
}
