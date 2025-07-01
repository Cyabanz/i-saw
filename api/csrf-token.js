export default async function handler(req, res) {
  const csrfToken = crypto.randomUUID();

  // Set CSRF token as cookie
  res.setHeader('Set-Cookie', `csrfToken=${csrfToken}; HttpOnly; Path=/; Max-Age=300`);

  res.status(200).json({ csrfToken });
}
