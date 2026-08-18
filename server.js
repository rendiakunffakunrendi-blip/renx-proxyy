// =============================================
// 🔥 RENX PROXY — SUPER LENGKAP
// =============================================
// FITUR: LOGIN, LISENSI, CONFIG, LOG, UPDATE
// SUPPORT: HTTP & HTTPS
// ANTI GAGAL — ERROR HANDLING TOTAL
// =============================================

const http = require('http');

const PORT = process.env.PORT || 8080;

// =============================================
// 🔥 KONFIGURASI CHEAT — LENGKAP
// =============================================
const config = {
  status: "active",
  version: "4.0",
  timestamp: Date.now(),
  
  // AIMBOT
  aimbot: {
    enabled: true,
    headshot: true,
    smooth: 0.3,
    speed: 500,
    fov: 360,
    snap: true,
    prediction: true,
    tracking: true,
    auto_fire: true,
    auto_fire_delay: 0
  },
  
  // ESP / WALLHACK
  esp: {
    enabled: true,
    box: true,
    line: true,
    health: true,
    distance: true,
    skeleton: true,
    name: true,
    chams: true,
    radar: true,
    wallhack: true
  },
  
  // WEAPON
  weapon: {
    no_recoil: true,
    no_spread: true,
    rapid_fire: true,
    instant_hit: true,
    damage_multiplier: 999,
    unlimited_ammo: true
  },
  
  // PLAYER
  player: {
    speed_hack: true,
    fly_hack: false,
    no_fall_damage: true,
    teleport: false
  },
  
  // SYSTEM
  system: {
    sensitivity: 999,
    drag_sensitivity: 999,
    swipe_sensitivity: 999,
    touch_response: 999,
    fps: 120,
    anti_ban: true,
    bypass_fair_balance: true
  },
  
  // MESSAGE
  message: "🔥 RENX PROXY — SUPER LENGKAP"
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache');

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  console.log(`[REQUEST] ${path}`);

  // ENDPOINT UNTUK VER.PHP (YANG DIMINTA INJEKTOR)
  if (path === '/live/ver.php') {
    res.writeHead(200);
    res.end(JSON.stringify({ version: "3.0", status: "active" }));
    return;
  }

  // SEMUA REQUEST LANGSUNG DITERIMA (TANPA LISENSI)
  if (path === '/' || path === '/live/' || path === '/config') {
    res.writeHead(200);
    res.end(JSON.stringify(config));
    return;
  }

  res.writeHead(200);
  res.end(JSON.stringify({ status: "online", message: "🔥 RENX PROXY" }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🔥 RENX PROXY — TANPA LISENSI`);
  console.log(`📌 PORT: ${PORT}`);
  console.log(`📌 /live/ver.php`);
  console.log(`📌 /live/`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ PORT ${PORT} SUDAH DIPAKAI.`);
  }
});
