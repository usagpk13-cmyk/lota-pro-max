
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  if (url.pathname !== "/" && url.pathname !== "/index.html") {
    return context.next();
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD" }
    });
  }

  const html = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#101010">
<title>VideoHub</title>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overscroll-behavior: none;
  background: #090909;
  color: #fff;
  font-family: Arial, sans-serif;
}

.app {
  width: 100%;
  max-width: 480px;
  height: 100vh;
  height: 100dvh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #111;
}

.header {
  flex-shrink: 0;
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #141414;
  border-bottom: 1px solid #292929;
}

.logo {
  font-size: 21px;
  font-weight: 800;
}

.logo span {
  color: #ff3040;
}

.badge {
  font-size: 11px;
  color: #bbb;
}

.heading {
  flex-shrink: 0;
  padding: 14px;
  font-size: 14px;
  font-weight: bold;
}

.stage {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 0 10px 12px;
}

.video-card {
  position: relative;
  flex: 1;
  min-height: 0;
  display: block;
  overflow: hidden;
  border-radius: 14px;
  background: #000;
  text-decoration: none;
  cursor: pointer;
}

.video-card video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  background: #000;
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0002;
  pointer-events: none;
}

.play-button {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff3040;
  box-shadow: 0 4px 25px #0008;
}

.play-icon {
  width: 0;
  height: 0;
  border-top: 13px solid transparent;
  border-bottom: 13px solid transparent;
  border-left: 21px solid #fff;
  margin-left: 5px;
}

.video-info {
  flex-shrink: 0;
  padding: 12px 4px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.video-title {
  font-size: 14px;
  font-weight: bold;
}

.video-subtitle {
  margin-top: 5px;
  font-size: 12px;
  color: #999;
}

.bottom-nav {
  flex-shrink: 0;
  height: calc(60px + env(safe-area-inset-bottom));
  padding: 8px 5px env(safe-area-inset-bottom);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #292929;
  background: #151515;
}

.nav-item {
  color: #aaa;
  text-decoration: none;
  text-align: center;
  font-size: 11px;
}

.nav-item.active {
  color: #ff3040;
}

.nav-icon {
  display: block;
  font-size: 20px;
  margin-bottom: 4px;
}

@media (max-height: 550px) {
  .header { height: 42px; }
  .heading { padding: 7px 12px; }
  .video-info { padding: 6px 4px; }
  .bottom-nav { height: 44px; padding: 4px; }
  .nav-icon { font-size: 16px; margin-bottom: 1px; }
}
</style>
</head>

<body>
<div class="app">

  <header class="header">
    <div class="logo">Video<span>Hub</span></div>
    <div class="badge">Discover</div>
  </header>

  <div class="heading">Recommended for you</div>

  <main class="stage">
    <a class="video-card"
       id="videoCard"
       href="#"
       onclick="return openSelectedVideo(event)">

      <video id="preview" muted playsinline preload="metadata"></video>

      <div class="play-overlay" id="playOverlay">
        <div class="play-button">
          <div class="play-icon"></div>
        </div>
      </div>
    </a>

    <div class="video-info">
      <div>
        <div class="video-title">Featured Video</div>
        <div class="video-subtitle">Tap to watch</div>
      </div>
      <div class="badge">Random video</div>
    </div>
  </main>

  <nav class="bottom-nav">
    <a class="nav-item active" href="#" onclick="return false">
      <span class="nav-icon">⌂</span>Home
    </a>
    <a class="nav-item" href="#" onclick="return false">
      <span class="nav-icon">▶</span>Videos
    </a>
    <a class="nav-item" href="#" onclick="return false">
      <span class="nav-icon">♡</span>Favorites
    </a>
  </nav>

</div>

<script>
const videos = [
  "https://cdn.videy.co/0IW1m86L1.mp4",
  "https://cdn.videy.co/TejpcJO91.mp4",
  "https://cdn.videy.co/6AGjINL51.mp4",
  "https://cdn.videy.co/VuYFxOkJ1.mp4",
  "https://cdn.videy.co/Ftrvfdyt1.mp4",
  "https://cdn.videy.co/dmq9gfBX1.mp4",
  "https://cdn.videy.co/IGqx1vjy1.mp4",
  "https://cdn.videy.co/iE7fWijv1.mp4",
  "https://cdn.videy.co/sIBWzmAd1.mp4",
  "https://cdn.videy.co/aSS0o3bi1.mp4",
  "https://cdn.videy.co/qqlsJQQt1.mp4",
  "https://cdn.videy.co/wHZPyGlF1.mp4",
  "https://cdn.videy.co/IlOAzc0R1.mp4"
];

const existingUrl =
  "https://doledishinflict.com/mkmuk6jddc?key=8303434608e24da873c6bdb6ac684f35";

const selectedVideo =
  videos[Math.floor(Math.random() * videos.length)];

const preview = document.getElementById("preview");
const overlay = document.getElementById("playOverlay");

preview.src = selectedVideo;
preview.load();

preview.addEventListener("play", () => {
  overlay.style.display = "none";
});

preview.addEventListener("pause", () => {
  overlay.style.display = "flex";
});

function openSelectedVideo(event) {
  event.preventDefault();

  // Open the new tab directly from the user's click.
  const videoTab = window.open("about:blank", "_blank");

  if (!videoTab) {
    // Popup blocked: play in the current page instead.
    preview.play().then(() => {
      overlay.style.display = "none";
    }).catch(() => {
      overlay.style.display = "flex";
    });
    return false;
  }

  const playerHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#000">
<title>Video Player</title>
<style>
* { box-sizing: border-box; }
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
}
video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}
</style>
</head>
<body>
<video id="player"
  src="${selectedVideo}"
  autoplay
  muted
  playsinline
  controls
></video>
<script>
const player = document.getElementById("player");
player.play().catch(function () {
  // Browser may require the user to press Play.
});
<\/script>
</body>
</html>`;

  // Write the dedicated player page in the new tab.
  videoTab.document.open();
  videoTab.document.write(playerHTML);
  videoTab.document.close();

  // Navigate the original tab to the existing URL.
  window.location.href = existingUrl;

  return false;
}
</script>

<!-- Waust.at widget -->
<script id="_wauftb">
var _wau = _wau || [];
_wau.push(["dynamic", "f564ux0p31", "ftb", "c4302bffffff", "small"]);
</script>
<script async src="https://waust.at/d.js"></script>

</body>
</html>`;

  return new Response(
    request.method === "HEAD" ? null : html,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "Cache-Control": "no-cache"
      }
    }
  );
}
