const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({ url: 'redis://redis:6379' });

client.connect().catch(console.error);

app.get('/', async (req, res) => {
  await client.incr('visits');
  const visits = await client.get('visits');
  res.json({ message: 'Hello from web', visits: parseInt(visits) });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(3000, () => console.log('Web running on port 3000'));
