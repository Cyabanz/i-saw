export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method not allowed');
  }

  const { csrfToken } = req.headers;
  const cookies = req.headers.cookie || '';
  const storedToken = cookies.split('; ').find(c => c.startsWith('csrfToken='))
    ?.split('=')[1];

  if (!csrfToken || csrfToken !== storedToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  const response = await fetch('https://engine.hyperbeam.com/v0/vm', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HYPERBEAM_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  res.status(200).json(data);
}
