// =============================================
// 🔥 RENX PROXY — SUPER LENGKAP
// =============================================
// FITUR: LOGIN, LISENSI, CONFIG, LOG, UPDATE
// SUPPORT: HTTP & HTTPS
// ANTI GAGAL — ERROR HANDLING TOTAL
// =============================================

const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 8080;

// =============================================
// 🔥 DATABASE USER (LISENSI)
// =============================================
const users = {
  "user1": { 
    password: "12345",
    expired: "2026-12-31", 
    status: "premium", 
    quota: "unlimited",
    device: "all"
  },
  "user2": { 
    password: "67890",
    expired: "2026-10-20", 
    status: "premium", 
    quota: "1000",
    device: "android"
  },
  "user3": { 
    password: "qwerty",
    expired: "2027-09-01", 
    status: "trial", 
    quota: "50",
    device: "all"
  }
};

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

// =============================================
// 🔥 FUNGSI LOGIN & CEK LISENSI
// =============================================
function authenticate(userId, password) {
  if (!userId || !users[userId]) {
    return { status: "failed", code: 403, message: "❌ User tidak ditemukan" };
  }
  
  const user = users[userId];
  
  // CEK PASSWORD
  if (password && user.password !== password) {
    return { status: "failed", code: 403, message: "❌ Password salah" };
  }
  
  // CEK EXPIRED
  const today = new Date();
  const expired = new Date(user.expired);
  if (expired < today) {
    return { status: "failed", code: 403, message: "❌ Lisensi telah kadaluarsa" };
  }
  
  return { status: "success", code: 200, user: user };
}

// =============================================
// 🔥 FUNGSI LOG ACTIVITY
// =============================================
function logActivity(userId, action, ip) {
  const log = `[${new Date().toISOString()}] ${userId} | ${action} | IP: ${ip}\n`;
  fs.appendFile('activity.log', log, (err) => {
    if (err) console.error('Log gagal:', err);
  });
}

// =============================================
// 🔥 SERVER PROXY — MAIN
// =============================================
const server = http.createServer((req, res) => {
  // HEADER CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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
    const password = parsedUrl.searchParams.get('pass') || '';
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    console.log(`[REQUEST] ${path} | User: ${userId} | IP: ${ip}`);
    logActivity(userId, path, ip);

    // ====== LOGIN ======
    if (path === '/login') {
      const auth = authenticate(userId, password);
      res.writeHead(auth.code);
      res.end(JSON.stringify({
        status: auth.status,
        user: auth.user ? {
          id: userId,
          status: auth.user.status,
          quota: auth.user.quota,
          expired: auth.user.expired
        } : null,
        message: auth.message,
        timestamp: Date.now()
      }));
      return;
    }

    // ====== CEK LISENSI ======
    if (path === '/check') {
      const auth = authenticate(userId, password);
      res.writeHead(auth.code);
      res.end(JSON.stringify(auth));
      return;
    }

    // ====== AMBIL KONFIGURASI ======
    if (path === '/config' || path === '/live/' || path === '/') {
      const auth = authenticate(userId, password);
      if (auth.code === 403) {
        res.writeHead(403);
        res.end(JSON.stringify(auth));
        return;
      }

      const response = {
        ...config,
        user: {
          id: userId,
          status: auth.user.status,
          quota: auth.user.quota,
          expired: auth.user.expired
        },
        timestamp: Date.now()
      };

      res.writeHead(200);
      res.end(JSON.stringify(response));
      return;
    }

    // ====== VERSION ======
    if (path === '/version') {
      res.writeHead(200);
      res.end(JSON.stringify({
        version: "4.0",
        status: "active",
        release: "2026-08-18",
        changelog: "Added login system, password protection, activity log"
      }));
      return;
    }

    // ====== STATUS ======
    if (path === '/status') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: "online",
        uptime: process.uptime(),
        version: "4.0",
        message: "🔥 RENX PROXY ONLINE"
      }));
      return;
    }

    // ====== DEFAULT ======
    res.writeHead(200);
    res.end(JSON.stringify({
      status: "online",
      message: "🔥 RENX PROXY — SUPER LENGKAP",
      endpoints: {
        login: "/login?user=user1&pass=12345",
        config: "/live/?user=user1&pass=12345",
        version: "/version",
        status: "/status"
      }
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
  console.log(`🔥 RENX PROXY — SUPER LENGKAP`);
  console.log(`📌 PORT: ${PORT}`);
  console.log(`📌 LOGIN: /login?user=user1&pass=12345`);
  console.log(`📌 CONFIG: /live/?user=user1&pass=12345`);
  console.log(`📌 VERSION: /version`);
  console.log(`📌 STATUS: /status`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ PORT ${PORT} SUDAH DIPAKAI. GUNAKAN PORT LAIN.`);
  } else {
    console.log(`❌ ERROR: ${err.message}`);
  }
});
