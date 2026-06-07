// eslint-disable-next-line import/no-extraneous-dependencies
import Jimp from 'jimp';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import QRCode from 'qrcode';
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

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

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userName = url.searchParams.get('userName');

    if (!userName) {
      return NextResponse.json({ success: false, error: 'Missing userName parameter' }, { status: 400 });
    }

    console.log(userName);
    
    const qrCodeBuffer = await QRCode.toBuffer(userName, {
      errorCorrectionLevel: 'H',
      type: 'png',
      margin: 2,
      scale: 10
    });

    const qrImage = await Jimp.read(qrCodeBuffer);

    const icon = await Jimp.read('https://upyai.b-cdn.net/images/crgpt-icon.png');
    const iconSize = 10;
    icon.resize(iconSize, iconSize);

    const finderPatterns = [
      { x: 0, y: 0 },
      { x: qrImage.bitmap.width - iconSize * 9, y: 0 },
      { x: 0, y: qrImage.bitmap.height - iconSize * 9 }
    ];

    const finderPatterns1 = [
      { x: 0, y: qrImage.bitmap.height - iconSize * 3 }
    ];

    const isFinderPattern = (x: number, y: number): boolean =>
      finderPatterns.some(pattern =>
        x >= pattern.x && x < pattern.x + iconSize * 9 && y >= pattern.y && y < pattern.y + iconSize * 9
      );

    const isFinderPattern1 = (x: number, y: number): boolean =>
      finderPatterns1.some(pattern =>
        x >= pattern.x && x < pattern.x + iconSize * 9 && y >= pattern.y && y < pattern.y + iconSize * 9
      );

    qrImage.scan(0, 0, qrImage.bitmap.width, qrImage.bitmap.height, function callBack(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];

      if (!isFinderPattern(x, y)) {
        if (red < 10 && green < 10 && blue < 10) {
          this.bitmap.data[idx + 3] = 0;
        }
      }

      if (isFinderPattern1(x, y)) {
        if (red < 10 && green < 10 && blue < 10) {
          this.bitmap.data[idx + 3] = 0;
        }
      }
    });

    for (let y = 0; y < qrImage.bitmap.height; y += iconSize) {
      for (let x = 0; x < qrImage.bitmap.width; x += iconSize) {
        if (!isFinderPattern(x, y)) {
          const idx = (y * qrImage.bitmap.width + x) * 4;
          const red = qrImage.bitmap.data[idx];
          const green = qrImage.bitmap.data[idx + 1];
          const blue = qrImage.bitmap.data[idx + 2];

          if (red < 10 && green < 10 && blue < 10) {
            qrImage.composite(icon, x, y, {
              mode: Jimp.BLEND_SOURCE_OVER,
              opacitySource: 1,
              opacityDest: 1
            });
          }
        }
      }
    }

    qrImage.scan(0, 0, qrImage.bitmap.width, qrImage.bitmap.height, function callBack(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];

      if (red > 200 && green > 200 && blue > 200) {
        this.bitmap.data[idx + 3] = 0;
      }
    });

    const logo = await Jimp.read('https://upyai.b-cdn.net/images/logo_single.png');
    const logoSize = qrImage.bitmap.width / 5;
    logo.resize(logoSize, logoSize);

    const xPos = (qrImage.bitmap.width / 2) - (logoSize / 2);
    const yPos = (qrImage.bitmap.height / 2) - (logoSize / 2);

    qrImage.composite(logo, xPos, yPos, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 1,
      opacityDest: 1,
    });
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'open-sans', 'open-sans-16-black', 'open-sans-16-black.fnt');
    const font = await Jimp.loadFont(fontPath);

    qrImage.print(font, 25, qrImage.bitmap.height - 30, "CRGPT");
    const qrCodeBufferFinal = await qrImage.getBufferAsync(Jimp.MIME_PNG);

    const uploadResult: any = await uploadImage(qrCodeBufferFinal);

    if (uploadResult.success) {
      return NextResponse.json({ success: true, data: { 'qrCodeDataURL': uploadResult.file_url } });
    }
    return NextResponse.json({ success: false, error: uploadResult.message }, { status: 500 });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate QR code' }, { status: 500 });
  }
}
