// =============================================
// 🔥 RENX PROXY — PREMIUM EDITION
// =============================================
// SUPPORT: VERCEL / RAILWAY / RENDER
// FITUR: LISENSI, USER LOGIN, CONFIG CHEAT
// =============================================

const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 8080;

// =============================================
// 🔥 DATABASE USER (LISENSI)
// =============================================
const users = {
  "user1": { 
    expired: "2026-12-31", 
    status: "premium", 
    quota: "unlimited" 
  },
  "user2": { 
    expired: "2026-10-20", 
    status: "premium", 
    quota: "1000" 
  },
  "user3": { 
    expired: "2027-09-01", 
    status: "trial", 
    quota: "50" 
  }
};

// =============================================
// 🔥 KONFIGURASI CHEAT
// =============================================
const config = {
  status: "active",
  version: "3.0",
  aimbot: true,
  headshot: true,
  no_recoil: true,
  no_spread: true,
  wallhack: true,
  esp: true,
  speed_hack: true,
  auto_fire: true,
  aim_fov: 360,
  aim_smooth: 0.3,
  aim_speed: 500,
  crosshair_scale: 2.0,
  sensitivity: 999,
  drag_sensitivity: 999,
  touch_response: 999,
  fps: 120,
  anti_ban: true,
  message: "🔥 RENX PROXY — PREMIUM"
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
// 🔥 SERVER PROXY
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

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const userId = parsedUrl.query.user || 'unknown';

  // ====== CEK LISENSI ======
  if (path === '/check') {
    const license = checkLicense(userId);
    res.writeHead(license.code);
    res.end(JSON.stringify(license));
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

    // KIRIM KONFIGURASI + DATA USER
    const response = {
      ...config,
      user: {
        id: userId,
        status: license.user.status,
        quota: license.user.quota,
        expired: license.user.expired
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
      version: "3.0", 
      status: "active",
      release: "2026-08-17"
    }));
    return;
  }

  // ====== STATUS ======
  if (path === '/status') {
    res.writeHead(200);
    res.end(JSON.stringify({ 
      status: "online", 
      uptime: process.uptime(),
      message: "🔥 RENX PROXY ONLINE"
    }));
    return;
  }

  // ====== DEFAULT ======
  res.writeHead(200);
  res.end(JSON.stringify({ 
    status: "online", 
    message: "🔥 RENX PROXY — PREMIUM EDITION"
  }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🔥 RENX PROXY — PREMIUM EDITION`);
  console.log(`📌 PORT: ${PORT}`);
  console.log(`📌 ENDPOINT: /live/?user=user1`);
  console.log(`📌 CEK LISENSI: /check?user=user1`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ PORT ${PORT} SUDAH DIPAKAI. GUNAKAN PORT LAIN.`);
  }
});
