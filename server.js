// =============================================
// 🔥 RENX PROXY — OB55 BRUTAL EDITION
// =============================================
// VERSION: 3.0 — OB55 (1.130.21)
// FITUR: LISENSI, USER LOGIN, CONFIG CHEAT
// ANTI BAN + BYPASS FAIR BALANCE
// =============================================

const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 8080;

// =============================================
// 🔥 DATABASE USER (LISENSI) — OB55
// =============================================
const users = {
  "user1": { 
    expired: "2026-12-31", 
    status: "premium", 
    quota: "unlimited",
    device: "all"
  },
  "user2": { 
    expired: "2026-10-20", 
    status: "premium", 
    quota: "1000",
    device: "android"
  },
  "user3": { 
    expired: "2027-09-01", 
    status: "trial", 
    quota: "50",
    device: "all"
  }
};

// =============================================
// 🔥 KONFIGURASI CHEAT — OB55 (1.130.21)
// =============================================
const config = {
  status: "active",
  version: "3.0",
  game_version: "1.130.21",
  ob: "55",
  
  // ====== AIMBOT ======
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
    auto_fire_delay: 0,
    bone: "head",
    range: 500,
    deadzone: 0.000001
  },
  
  // ====== ESP / WALLHACK ======
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
    wallhack: true,
    color: "#FF0000",
    distance_limit: 500
  },
  
  // ====== WEAPON ======
  weapon: {
    no_recoil: true,
    no_spread: true,
    rapid_fire: true,
    instant_hit: true,
    damage_multiplier: 999,
    unlimited_ammo: true,
    reload_speed: 0,
    weapon_switch: 0
  },
  
  // ====== PLAYER ======
  player: {
    speed_hack: true,
    fly_hack: false,
    no_fall_damage: true,
    teleport: false,
    wall_climb: true,
    aim_lock: true
  },
  
  // ====== SYSTEM ======
  system: {
    sensitivity: 999,
    drag_sensitivity: 999,
    swipe_sensitivity: 999,
    touch_response: 999,
    fps: 120,
    anti_ban: true,
    bypass_fair_balance: true,
    spoof_device: true,
    hide_root: true
  },
  
  // ====== UI ======
  ui: {
    crosshair: true,
    crosshair_color: "#FF0000",
    crosshair_size: 100,
    crosshair_type: "dot",
    aim_fov_circle: true,
    show_stats: true,
    show_fps: true
  },
  
  // ====== MESSAGE ======
  message: "🔥 RENX PROXY — OB55 BRUTAL EDITION",
  developer: "RENX TEAM",
  release: "2026-08-18"
};

// =============================================
// 🔥 FUNGSI CEK LISENSI
// =============================================
function checkLicense(userId) {
  if (!userId || !users[userId]) {
    return { 
      status: "unlicensed", 
      message: "❌ Lisensi tidak ditemukan",
      code: 403
    };
  }

  const user = users[userId];
  const today = new Date();
  const expired = new Date(user.expired);

  if (expired < today) {
    return { 
      status: "expired", 
      message: "❌ Lisensi telah kadaluarsa",
      code: 403
    };
  }

  return { 
    status: "licensed", 
    message: "✅ Lisensi valid",
    code: 200,
    user: user
  };
}

// =============================================
// 🔥 FUNGSI RESPON — OB55
// =============================================
function getResponse(userId, license) {
  return {
    status: "active",
    version: "3.0",
    game_version: "1.130.21",
    ob: "55",
    ...config,
    user: {
      id: userId,
      status: license.user.status,
      quota: license.user.quota,
      expired: license.user.expired
    },
    timestamp: Date.now()
  };
}

// =============================================
// 🔥 SERVER PROXY — MAIN
// =============================================
const server = http.createServer((req, res) => {
  // HEADER CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache');

  // HANDLE OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const userId = parsedUrl.searchParams.get('user') || 'unknown';
    const gameVersion = parsedUrl.searchParams.get('version') || '1.130.21';

    console.log(`[REQUEST] ${path} | User: ${userId} | Version: ${gameVersion}`);

    // ====== CEK LISENSI ======
    if (path === '/check') {
      const license = checkLicense(userId);
      res.writeHead(license.code);
      res.end(JSON.stringify(license));
      return;
    }

    // ====== CEK VERSI GAME ======
    if (path === '/version') {
      res.writeHead(200);
      res.end(JSON.stringify({
        version: "3.0",
        game_version: "1.130.21",
        ob: "55",
        status: "active",
        release: "2026-08-18",
        changelog: "OB55 update — optimized for Free Fire version 1.130.21"
      }));
      return;
    }

    // ====== AMBIL KONFIGURASI ======
    if (path === '/config' || path === '/live/' || path === '/') {
      const license = checkLicense(userId);
      if (license.code === 403) {
        res.writeHead(403);
        res.end(JSON.stringify(license));
        return;
      }

      const response = getResponse(userId, license);
      res.writeHead(200);
      res.end(JSON.stringify(response));
      return;
    }

    // ====== STATUS ======
    if (path === '/status') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: "online",
        uptime: process.uptime(),
        version: "3.0",
        game_version: "1.130.21",
        ob: "55",
        message: "🔥 RENX PROXY ONLINE — OB55 BRUTAL EDITION"
      }));
      return;
    }

    // ====== DEFAULT ======
    res.writeHead(200);
    res.end(JSON.stringify({
      status: "online",
      version: "3.0",
      game_version: "1.130.21",
      ob: "55",
      message: "🔥 RENX PROXY — OB55 BRUTAL EDITION"
    }));

  } catch (error) {
    console.error(`[ERROR] ${error.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({
      status: "error",
      message: "Internal Server Error",
      error: error.message
    }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🔥 RENX PROXY — OB55 BRUTAL EDITION`);
  console.log(`📌 PORT: ${PORT}`);
  console.log(`📌 GAME VERSION: 1.130.21 | OB: 55`);
  console.log(`📌 ENDPOINT: /live/?user=user1`);
  console.log(`📌 CEK LISENSI: /check?user=user1`);
  console.log(`📌 CEK VERSI: /version`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ PORT ${PORT} SUDAH DIPAKAI. GUNAKAN PORT LAIN.`);
  } else {
    console.log(`❌ ERROR: ${err.message}`);
  }
});
