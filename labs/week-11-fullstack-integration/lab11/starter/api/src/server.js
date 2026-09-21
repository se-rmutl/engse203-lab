import { config } from './config.js';
import { createApp } from './app.js';
import { loadSeed } from './services/requestService.js';

await loadSeed();
const app = createApp();

app.listen((config.port ?? 3001), () => {
  console.log(`Campus Service API พร้อมที่ http://localhost:${(config.port ?? 3001)}`);
  console.log(`อนุญาตให้เรียกจาก: ${(config.corsOrigin ?? "http://localhost:5173")}`);
});
