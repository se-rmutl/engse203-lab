import fs from 'node:fs';
import path from 'node:path';

const requiredFiles = ['src/hello.js', 'package.json', 'README.md'];
const missing = requiredFiles.filter((file) => !fs.existsSync(path.resolve(file)));

if (missing.length > 0) {
  console.error('Missing required file(s):');
  missing.forEach((file) => console.error(`- ${file}`));
  process.exitCode = 1;
} else {
  console.log('LAB 01 file structure check: PASS');
}
