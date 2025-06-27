import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ENCRYPTION_KEY = process.env.EMAIL_ENCRYPTION_KEY!.padEnd(32, '0'); // Must be 32 bytes
const IV_LENGTH = 16;

export function encryptEmail(email: string, expiresInMinutes = 10): string {
  const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;

  const payload = JSON.stringify({ email, expiresAt });

  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  const encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decryptEmail(encryptedEmail: string): string {
  const [ivHex, encryptedHex] = encryptedEmail.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(encryptedHex, 'hex');

  const decipher = createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  const { email, expiresAt } = JSON.parse(decrypted.toString());

  if (!email || !expiresAt) throw new Error('Invalid token payload');

  if (Date.now() > expiresAt) throw new Error('Token has expired');

  return email;
}
