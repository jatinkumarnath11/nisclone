import http from 'http';

const API_URL = process.env.API_URL || 'http://localhost:5000/api/v1/health';

function checkHealth() {
  console.log(`🔍 Probing system health at: ${API_URL}`);

  http
    .get(API_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ UMS API is operational:', data);
          process.exit(0);
        } else {
          console.error(`❌ Health check failed with status ${res.statusCode}:`, data);
          process.exit(1);
        }
      });
    })
    .on('error', (err) => {
      console.error('❌ Could not connect to API server:', err.message);
      process.exit(1);
    });
}

checkHealth();
