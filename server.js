// =============================================
// ðŸ”¥ RENX PROXY â€” BRUTAL AUTO-UPDATE EDITION
// =============================================
// VERSION: 7.0 â€” AUTO DETECT + BRUTAL CONFIG
// FITUR: AUTO-UPDATE VERSION DARI GITHUB
// =============================================

const http = require('http');

const PORT = process.env.PORT || 8080;

// =============================================
// ðŸ”¥ KONFIGURASI BRUTAL â€” DYNAMIC
// =============================================
const baseConfig = {
  status: "active",
  version: "7.0",
  game_version: "1.130.22",
  ob: "55",
  
  // ====== AIMBOT BRUTAL ======
  aimbot: {
    enabled: true,
    headshot: true,
    smooth: 0.1,
    speed: 999,
    fov: 360,
    snap: true,
    prediction: true,
    tracking: true,
    auto_fire: true,
    auto_fire_delay: 0,
    bone: "head",
    range: 999,
    deadzone: 0.000001,
    lock: true,
    magnet: 100,
    priority: "head"
    silent_aim: true,
    visible_check: true,
    targets: "enemy",
    max_targets: 10
  },
  
  // ====== ESP / WALLHACK BRUTAL ======
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
    distance_limit: 999,
    show_name: true,
    show_weapon: true,
    show_health_bar: true,
    glow: true,
    outline: true
  },
  
  // ====== WEAPON BRUTAL ======
  weapon: {
    no_recoil: true,
    no_spread: true,
    rapid_fire: true,
    instant_hit: true,
    damage_multiplier: 9999,
    unlimited_ammo: true,
    reload_speed: 0,
    weapon_switch: 0,
    bullet_speed: 9999,
    range: 999,
    penetration: 9999,
    aimbot_priority: "head"
  },
  
  // ====== PLAYER BRUTAL ======
  player: {
    speed_hack: true,
    speed_multiplier: 5.0,
    no_fall_damage: true,
    aim_lock: true,
    wall_climb: true,
    no_gravity: true,
    teleport: true,
    fly_hack: true
  },
  
  // ====== SYSTEM BRUTAL ======
  system: {
    sensitivity: 999,
    drag_sensitivity: 999,
    swipe_sensitivity: 999,
    touch_response: 999,
    touch_latency: 0,
    fps: 120,
    anti_ban: true,
    bypass_fair_balance: true,
    spoof_device: true,
    hide_root: true,
    memory_patch: true,
    bypass_obs: true
  },
  
  // ====== UI ======
  ui: {
    crosshair: true,
    crosshair_color: "#FF0000",
    crosshair_size: 200,
    crosshair_type: "dot",
    aim_fov_circle: true,
    show_stats: true,
    show_fps: true,
    show_players: true
  },
  
  message: "ðŸ”¥ RENX PROXY â€” BRUTAL AUTO-UPDATE",
  developer: "RENX TEAM"
};

// =============================================
// ðŸ”¥ VERSION DATABASE â€” AUTO UPDATE
// =============================================
let versionDatabase = {
  "1.130.21": { ob: "55", release: "2026-08-18", status: "stable", config: {} },
  "1.130.20": { ob: "55", release: "2026-08-17", status: "stable", config: {} },
  "1.130.19": { ob: "54", release: "2026-08-10", status: "stable", config: {} },
  "1.130.18": { ob: "54", release: "2026-08-03", status: "stable", config: {} },
  "default": { ob: "55", release: "2026-08-18", status: "stable", config: {} }
};

// =============================================
// ðŸ”¥ FUNCTION GET CONFIG â€” AUTO VERSION
// =============================================
function getConfig(gameVersion) {
  const versionInfo = versionDatabase[gameVersion] || versionDatabase["default"];
  
  return {
    ...baseConfig,
    game_version: gameVersion,
    ob: versionInfo.ob,
    version_info: versionInfo,
    timestamp: Date.now()
  };
}

// =============================================
// ðŸ”¥ AUTO UPDATE VERSION â€” DARI GITHUB
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
// ðŸ”¥ SERVER PROXY â€” MAIN
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
    const gameVersion = url.searchParams.get('version') || '1.130.21';

    console.log(`[REQUEST] ${path} | Version: ${gameVersion}`);

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
        current_version: "7.0",
        supported_versions: Object.keys(versionDatabase),
        latest: Object.keys(versionDatabase).filter(v => v !== 'default').pop() || "1.130.21",
        message: "ðŸ”¥ AUTO-UPDATE ACTIVE"
      }));
      return;
    }

    // ====== GET CONFIG ======
    if (path === '/live/' || path === '/config' || path === '/') {
      const config = getConfig(gameVersion);
      res.writeHead(200);
      res.end(JSON.stringify(config));
      return;
    }

    // ====== VERSION ======
    if (path === '/version') {
      res.writeHead(200);
      res.end(JSON.stringify({
        version: "7.0",
        game_version: gameVersion,
        ob: versionDatabase[gameVersion]?.ob || "55",
        status: "active",
        message: "ðŸ”¥ RENX PROXY â€” BRUTAL AUTO-UPDATE"
      }));
      return;
    }

    // ====== STATUS ======
    if (path === '/status') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: "online",
        uptime: process.uptime(),
        version: "7.0",
        supported_versions: Object.keys(versionDatabase).length,
        message: "ðŸ”¥ RENX PROXY â€” BRUTAL AUTO-UPDATE"
      }));
      return;
    }

    // ====== IP ======
    if (path === '/ip') {
      res.writeHead(200);
      res.end(JSON.stringify({
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        status: "online",
        version: "7.0"
      }));
      return;
    }

      // ====== ENDPOINT VER.PHP (YANG DIMINTA INJEKTOR) ======
    if (path === '/live/ver.php' || path === '/ver.php') {
      res.writeHead(200);
      res.end(JSON.stringify({
        version: "1.0",
        status: "active",
        message: "🔥 RENX PROXY"
      }));
      return;
    }

    // ====== DEFAULT ======
    res.writeHead(200);
    res.end(JSON.stringify({
      status: "online",
      version: "7.0",
      message: "ðŸ”¥ RENX PROXY â€” BRUTAL AUTO-UPDATE"
    }));

  } catch (error) {
    console.error(`[ERROR] ${error.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ status: "error", message: "Internal Server Error" }));
  }
});

// =============================================
// ðŸ”¥ START SERVER + AUTO UPDATE
// =============================================
server.listen(PORT, '0.0.0.0', () => {
  console.log(`ðŸ”¥ RENX PROXY â€” BRUTAL AUTO-UPDATE EDITION`);
  console.log(`ðŸ“Œ PORT: ${PORT}`);
  console.log(`📌 /live/ver.php`);
  console.log(`ðŸ“Œ VERSION: 7.0`);
  console.log(`ðŸ“Œ AUTO-UPDATE ACTIVE (every 1 hour)`);
  console.log(`ðŸ“Œ ENDPOINT: /live/`);
  console.log(`ðŸ“Œ ADD VERSION: /update-version?new_version=1.130.22&ob=56`);
  console.log(`ðŸ“Œ VERSIONS: /versions`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`âŒ PORT ${PORT} SUDAH DIPAKAI.`);
  }
});

// =============================================
// ðŸ”¥ JALANKAN AUTO UPDATE SAAT START & SETIAP JAM
// =============================================
autoUpdateVersion();
setInterval(autoUpdateVersion, 3600000);
