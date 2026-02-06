import http from 'http';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health' || req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        status: 'ok',
        service: 'tipspay-blockc-backend',
        timestamp: new Date().toISOString(),
      })
    );
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('tipspay-blockc backend is running');
});

server.listen(PORT, () => {
  console.log(`tipspay-blockc backend listening on port ${PORT}`);
});

