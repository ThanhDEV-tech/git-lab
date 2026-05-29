const http = require('http');

function request(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  let passed = 0, failed = 0;

  try {
    const res = await request('/health');
    if (res.status === 200) {
      console.log('PASS: /health returns 200');
      passed++;
    } else {
      console.error('FAIL: /health returned ' + res.status);
      failed++;
    }
  } catch (e) {
    console.error('FAIL: could not connect -', e.message);
    failed++;
  }

  console.log(`\nResult: ${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

run();
