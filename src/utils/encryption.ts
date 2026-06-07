import crypto from 'crypto';

import { ENCRYPTION_KEY } from 'src/config-global';

const IV_LENGTH = 16; // For AES, this is always 16

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
    throw new Error('Invalid encryption key length. It must be 64 hexadecimal characters.');
}

const key = Buffer.from(ENCRYPTION_KEY, 'hex') as unknown as crypto.CipherKey;

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        key as unknown as crypto.CipherKey,
        iv as unknown as crypto.BinaryLike,
    );
    const encryptedChunk: any = cipher.update(text);
    const encryptedFinal: any = cipher.final();
    const encrypted = Buffer.concat([
        new Uint8Array(encryptedChunk),
        new Uint8Array(encryptedFinal),
    ]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(text: string): string {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        key as unknown as crypto.CipherKey,
        iv as unknown as crypto.BinaryLike,
    );
    const decryptedChunk: any = decipher.update(encryptedText as any);
    const decryptedFinal: any = decipher.final();
    const decrypted = Buffer.concat([
        new Uint8Array(decryptedChunk),
        new Uint8Array(decryptedFinal),
    ]);
    return decrypted.toString();
}
