export default function calculateExpiresAt(expiresIn: number): number {
  const now = Date.now();
  const expiresAt = now + expiresIn * 1000;

  return expiresAt;
}
