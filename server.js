// =============================================
// 🔥 RENX PROXY — ULTIMATE BRUTAL LICENSE EDITION
// =============================================
// VERSION: 8.0 — AUTO DETECT + BRUTAL CONFIG + LICENSE
// FITUR: AUTO-UPDATE VERSION, LISENSI, BRUTAL CONFIG
// =============================================

const http = require('http');

const PORT = process.env.PORT || 8080;

// =============================================
// 🔥 DATABASE USER (LISENSI) — BRUTAL
// =============================================
const users = {
  "user1": { 
    expired: "2026-12-31", 
    status: "premium", 
    quota: "unlimited",
    device: "all",
    rank: "god"
  },
  "user2": { 
    expired: "2026-10-20", 
    status: "premium", 
    quota: "1000",
    device: "android",
    rank: "pro"
  },
  "user3": { 
    expired: "2027-09-01", 
    status: "trial", 
    quota: "50",
    device: "all",
    rank: "basic"
  }
};

// =============================================
// 🔥 KONFIGURASI BRUTAL — ULTIMATE
// =============================================
const baseConfig = {
  status: "active",
  version: "8.0",
  
  // ====== AIMBOT ULTIMATE ======
  aimbot: {
    enabled: true,
    headshot: true,
    smooth: 0.05,
    speed: 9999,
    fov: 360,
    snap: true,
    prediction: true,
    tracking: true,
    auto_fire: true,
    auto_fire_delay: 0,
    bone: "head",
    range: 9999,
    deadzone: 0.000001,
    lock: true,
    magnet: 1000,
    priority: "head",
    silent_aim: true,
    visible_check: true,
    max_targets: 10
  },
  
  // ====== ESP / WALLHACK ULTIMATE ======
  esp: {
    enabled: true,
    box: true,
    line: true,
    health: true,
    distance: true,
    skeleton: true,
    chams: true,
    radar: true,
    wallhack: true,
    esp_color: "#FF0000",
    distance_limit: 9999,
    show_name: true,
    show_weapon: true,
    show_health_bar: true,
    show_ammo: true,
    show_armor: true,
    glow: true,
    outline: true
  },
  
  // ====== WEAPON ULTIMATE ======
  weapon: {
    no_recoil: true,
    no_spread: true,
    rapid_fire: true,
    instant_hit: true,
    damage_multiplier: 99999,
    unlimited_ammo: true,
    reload_speed: 0,
    weapon_switch: 0,
    bullet_speed: 99999,
    range: 99999,
    penetration: 99999,
    aimbot_priority: "head"
  },
  
  // ====== PLAYER ULTIMATE ======
  player: {
    speed_hack: true,
    speed_multiplier: 10.0,
    no_fall_damage: true,
    aim_lock: true,
    wall_climb: true,
    no_gravity: true,
    teleport: true,
    fly_hack: true,
    no_water_damage: true,
    no_zone_damage: true,
    infinite_health: true,
    infinite_armor: true
  },
  
  // ====== SYSTEM ULTIMATE ======
  system: {
    sensitivity: 9999,
    drag_sensitivity: 9999,
    swipe_sensitivity: 9999,
    touch_response: 9999,
    touch_latency: 0,
    fps: 120,
    anti_ban: true,
    bypass_fair_balance: true,
    spoof_device: true,
    hide_root: true,
    memory_patch: true,
    bypass_obs: true
  },
  
  // ====== UI ULTIMATE ======
  ui: {
    crosshair: true,
    crosshair_color: "#FF0000",
    crosshair_size: 300,
    crosshair_type: "dot",
    aim_fov_circle: true,
    show_stats: true,
    show_fps: true,
    show_players: true,
    show_ping: true,
    show_rank: true,
    show_kda: true,
    custom_menu: true
  },
  
  message: "🔥 RENX PROXY — ULTIMATE BRUTAL",
  developer: "RENX TEAM",
  release: "2026-08-20"
};

// =============================================
// 🔥 VERSION DATABASE — AUTO UPDATE
// =============================================
let versionDatabase = {
  "1.130.21": { ob: "55", release: "2026-08-18", status: "stable", config: {} },
  "1.130.20": { ob: "55", release: "2026-08-17", status: "stable", config: {} },
  "1.130.19": { ob: "54", release: "2026-08-10", status: "stable", config: {} },
  "1.130.18": { ob: "54", release: "2026-08-03", status: "stable", config: {} },
  "default": { ob: "55", release: "2026-08-18", status: "stable", config: {} }
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
// 🔥 FUNGSI GET CONFIG — AUTO VERSION
// =============================================
function getConfig(gameVersion, userData) {
  const versionInfo = versionDatabase[gameVersion] || versionDatabase["default"];
  
  // Konfigurasi berdasarkan rank user
  let userConfig = { ...baseConfig };
  
  if (userData && userData.rank === "god") {
    userConfig.weapon.damage_multiplier = 999999;
    userConfig.player.speed_multiplier = 15.0;
  } else if (userData && userData.rank === "pro") {
    userConfig.weapon.damage_multiplier = 99999;
    userConfig.player.speed_multiplier = 8.0;
  }
  
  return {
    ...userConfig,
    game_version: gameVersion,
    ob: versionInfo.ob,
    version_info: versionInfo,
    user: userData,
    timestamp: Date.now()
  };
}

// =============================================
// 🔥 AUTO UPDATE VERSION — DARI GITHUB
// =============================================
async function autoUpdateVersion() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/rendiakunffakunrendi-blip/renx-proxyy/main/version.json');
    const data = await response.json();
    
    if (data.game_version) {
      versionDatabase[data.game_version] = {
        ob: data.ob || "55",
        release: data.release || new Date().toISOString().split('T')[0],
        status: "stable",
        config: {}
      };
      console.log(`[AUTO-UPDATE] Version updated from GitHub: ${data.game_version}`);
    }
  } catch (error) {
    console.log('[AUTO-UPDATE] Failed to fetch from GitHub, using local database');
  }
}

// =============================================
// 🔥 SERVER PROXY — MAIN
// =============================================
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const userId = url.searchParams.get('user') || 'unknown';
    const gameVersion = url.searchParams.get('version') || '1.130.21';

    console.log(`[REQUEST] ${path} | User: ${userId} | Version: ${gameVersion}`);

    // ====== CEK LISENSI ======
    if (path === '/check') {
      const license = checkLicense(userId);
      res.writeHead(license.code);
      res.end(JSON.stringify(license));
      return;
    }

    // ====== UPDATE VERSION MANUAL ======
    if (path === '/update-version') {
      const newVersion = url.searchParams.get('new_version');
      const ob = url.searchParams.get('ob') || '55';
      if (newVersion) {
        versionDatabase[newVersion] = { ob: ob, release: new Date().toISOString().split('T')[0], status: 'stable', config: {} };
        console.log(`[UPDATE] New version added: ${newVersion}`);
        res.writeHead(200);
        res.end(JSON.stringify({ status: "updated", version: newVersion, ob: ob }));
        return;
      }
      res.writeHead(400);
      res.end(JSON.stringify({ status: "error", message: "Missing new_version parameter" }));
      return;
    }

    // ====== GET VERSIONS ======
    if (path === '/versions') {
      res.writeHead(200);
      res.end(JSON.stringify({
        current_version: "8.0",
        supported_versions: Object.keys(versionDatabase),
        latest: Object.keys(versionDatabase).filter(v => v !== 'default').pop() || "1.130.21",
        message: "🔥 AUTO-UPDATE ACTIVE"
      }));
      return;
    }

    // ====== GET CONFIG — DENGAN LISENSI ======
    if (path === '/live/' || path === '/config' || path === '/') {
      const license = checkLicense(userId);
      if (license.code === 403) {
        res.writeHead(403);
        res.end(JSON.stringify(license));
        return;
      }

      const config = getConfig(gameVersion, license.user);
      res.writeHead(200);
      res.end(JSON.stringify(config));
      return;
    }

    // ====== VERSION ======
    if (path === '/version') {
      res.writeHead(200);
      res.end(JSON.stringify({
        version: "8.0",
        game_version: gameVersion,
        ob: versionDatabase[gameVersion]?.ob || "55",
        status: "active",
        message: "🔥 RENX PROXY — ULTIMATE BRUTAL"
      }));
      return;
    }

    // ====== STATUS ======
    if (path === '/status') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: "online",
        uptime: process.uptime(),
        version: "8.0",
        supported_versions: Object.keys(versionDatabase).length,
        message: "🔥 RENX PROXY — ULTIMATE BRUTAL"
      }));
      return;
    }

    // ====== IP ======
    if (path === '/ip') {
      res.writeHead(200);
      res.end(JSON.stringify({
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        status: "online",
        version: "8.0"
      }));
      return;
    }

    // ====== DEFAULT ======
    res.writeHead(200);
    res.end(JSON.stringify({
      status: "online",
      version: "8.0",
      message: "🔥 RENX PROXY — ULTIMATE BRUTAL"
    }));

  } catch (error) {
    console.error(`[ERROR] ${error.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ status: "error", message: "Internal Server Error" }));
  }
});

// =============================================
// 🔥 START SERVER + AUTO UPDATE
// =============================================
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🔥 RENX PROXY — ULTIMATE BRUTAL LICENSE EDITION`);
  console.log(`📌 PORT: ${PORT}`);
  console.log(`📌 VERSION: 8.0`);
  console.log(`📌 AUTO-UPDATE ACTIVE (every 1 hour)`);
  console.log(`📌 ENDPOINT: /live/?user=user1`);
  console.log(`📌 ADD VERSION: /update-version?new_version=1.130.22&ob=56`);
  console.log(`📌 VERSIONS: /versions`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ PORT ${PORT} SUDAH DIPAKAI.`);
  }
});

// =============================================
// 🔥 JALANKAN AUTO UPDATE SAAT START & SETIAP JAM
// =============================================
autoUpdateVersion();
setInterval(autoUpdateVersion, 3600000);
