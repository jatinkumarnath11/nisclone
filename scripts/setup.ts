import fs from 'fs';
import path from 'path';

function main() {
  console.log('🚀 Setting up University Management System workspace...');

  const rootDir = process.cwd();
  const envPath = path.join(rootDir, '.env');
  const envExamplePath = path.join(rootDir, '.env.example');

  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created local .env from .env.example');
  } else if (fs.existsSync(envPath)) {
    console.log('ℹ️ Local .env already exists.');
  }

  console.log('✨ Workspace initialization complete.');
}

main();
