import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
        return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }

    const videoPath = path.resolve('./public', 'videos', `${url}`);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.get("range");

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize.toString(),
            'Content-Type': 'video/mp4',
        };
        return new NextResponse(file as any, { status: 206, headers });
    }

    const file = fs.createReadStream(videoPath);
    const headers = {
        'Content-Length': fileSize.toString(),
        'Content-Type': 'video/mp4',
    };
    return new NextResponse(file as any, { status: 200, headers });
}
