import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { STABLE_DIFUSSION_API_KEY } from 'src/config-global';

function generateRandomFilename(length: number = 32): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let result: string = '';

  // eslint-disable-next-line no-plusplus
  for (let i: number = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return `${result}.png`;
}

// eslint-disable-next-line consistent-return
const uploadImage = async (imageData: Buffer) => {
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

  // eslint-disable-next-line no-plusplus
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: imageData as unknown as BodyInit,
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
}

export async function POST(req: NextRequest) {
  try {
    const formData = (await req.formData()) as any;
    const prompt = formData.get('prompt') as string;
    const imageFile = formData.get('image') as File;

    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Prompt is required.' }, { status: 400 });
    }

    if (!imageFile) {
      return NextResponse.json({ success: false, error: 'Image file is required.' }, { status: 400 });
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const images = await uploadImage(buffer);
    console.log('imageURL', images?.file_url);
    console.log('STABLE_DIFUSSION_API_KEY', STABLE_DIFUSSION_API_KEY)
    const payload = {
      init_image: images?.file_url,
      model_id: formData.get('model') || 'flux',
      key: STABLE_DIFUSSION_API_KEY,
      prompt,
      negative_prompt: "painting, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, deformed, ugly, blurry, bad anatomy, bad proportions, extra limbs, cloned face, skinny, glitchy, double torso, extra arms, extra hands, mangled fingers, missing lips, ugly face, distorted face, extra legs, anime",
      width: formData.get('width') || '512',
      height: formData.get('height') || '512',
      samples: formData.get('image_count') || '4',
      num_inference_steps: formData.get('num_inference_steps') || '30',
      safety_checker: formData.get('safety_checker') || 'no',
      enhance_prompt: formData.get('enhance_prompt') || 'yes',
      guidance_scale: formData.get('guidance_scale') || '7.5',
      strength: formData.get('strength') || '0.7',
      base64: formData.get('base64') || 'no',
      seed: formData.get('seed') || null,
    };

    const response = await axios.post('https://stablediffusionapi.com/api/v3/img2img', payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('response', response)

    if (response.status === 200 && response.data.status === 'success') {
      const results = response.data.output.map((url: string) => (url));
      return NextResponse.json({ success: true, data: results }, { status: 200 });
    } 
    const errorMessage = response.data.message || 'Image creation failed.';
    return NextResponse.json({ success: false, error: errorMessage }, { status: response.status });
    
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { success: false, error: `An error occurred: ${error.message}` },
      { status: 500 }
    );
  }
}
