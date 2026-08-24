// =============================================
// 🔥 RENX PROXY — DENGAN VER.PHP + IP LOG
// =============================================

const http = require('http');

const PORT = process.env.PORT || 8080;

// =============================================
// 🔥 KONFIGURASI BRUTAL
// =============================================
const config = {
  status: "active",
  version: "8.0",
  game_version: "1.130.21",
  ob: "55",
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
     targets: "enemy"
  },
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
    color: "#FF0000",
    distance_limit: 9999
    show_name: true,
    show_weapon: true,
    show_health_bar: true,
    glow: true,
    outline: true
  },
  weapon: {
    no_recoil: true,
    no_spread: true,
    rapid_fire: true,
    instant_hit: true,
    damage_multiplier: 99999,
    unlimited_ammo: true,
    reload_speed: 0
    weapon_switch: 0,
    bullet_speed: 9999,
    range: 999,
    penetration: 9999,
    aimbot_priority: "head"
  },
  player: {
    speed_hack: true,
    speed_multiplier: 10.0,
    no_fall_damage: true,
    aim_lock: true,
    wall_climb: true,
    no_gravity: true,
    fly_hack: true,
    infinite_health: true,
    infinite_armor: true
  },
  system: {
    sensitivity: 9999,
    drag_sensitivity: 9999,
    touch_response: 9999,
    fps: 120,
    anti_ban: true,
    bypass_fair_balance: true
    spoof_device: true,
    hide_root: true,
    memory_patch: true,
    bypass_obs: true
  },
  ui: {
    crosshair: true,
    crosshair_color: "#FF0000",
    crosshair_size: 200,
    crosshair_type: "dot",
    aim_fov_circle: true,
    show_stats: true,
    show_fps: true,
    custom_menu: true
  },
  message: "🔥 RENX PROXY — BRUTAL"
};

// =============================================
// 🔥 SERVER PROXY — DENGAN IP LOG
// =============================================
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
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
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    console.log(`[REQUEST] ${path} | IP: ${ip}`);

    // ====== ENDPOINT VER.PHP (YANG DIMINTA INJEKTOR) ======
    if (path === '/live/ver.php' || path === '/ver.php') {
      console.log(`📌 /live/ver.php | IP: ${ip}`);
      res.writeHead(200);
      res.end(JSON.stringify({
        version: "1.0",
        status: "active",
        message: "🔥 RENX PROXY"
      }));
      return;
    }

    // ====== GET CONFIG ======
    if (path === '/live/' || path === '/config' || path === '/') {
      console.log(`📌 /live/ | IP: ${ip}`);
      res.writeHead(200);
      res.end(JSON.stringify(config));
      return;
    }

    // ====== VERSION ======
    if (path === '/version') {
      console.log(`📌 /version | IP: ${ip}`);
      res.writeHead(200);
      res.end(JSON.stringify({
        version: "8.0",
        game_version: "1.130.21",
        ob: "55",
        status: "active"
      }));
      return;
    }

    // ====== STATUS ======
    if (path === '/status') {
      console.log(`📌 /status | IP: ${ip}`);
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
      message: "🔥 RENX PROXY"
    }));

  } catch (error) {
    console.error(`[ERROR] ${error.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ status: "error", message: "Internal Server Error" }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🔥 RENX PROXY — DENGAN VER.PHP + IP LOG`);
  console.log(`📌 PORT: ${PORT}`);
  console.log(`📌 /live/ver.php`);
  console.log(`📌 /live/`);
  console.log(`📌 IP akan tercatat di setiap request`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ PORT ${PORT} SUDAH DIPAKAI.`);
  }
});
