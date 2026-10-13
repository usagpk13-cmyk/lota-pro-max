export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Serve the app from the homepage only.
  if (url.pathname !== "/" && url.pathname !== "/index.html") {
    return context.next();
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { "Allow": "GET, HEAD" }
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

body {
  background: #090909;
  color: #fff;
  font-family: Arial, sans-serif;
}

.app {
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  margin: auto;
  padding-bottom: 78px;
  background: #111;
}

.header {
  height: 58px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #141414;
  border-bottom: 1px solid #292929;
}

.logo {
  font-size: 22px;
  font-weight: 800;
}

.logo span {
  color: #ff3040;
}

.header-label {
  font-size: 12px;
  color: #bbb;
}

.heading {
  padding: 18px 14px 12px;
  font-size: 15px;
  font-weight: bold;
}

.feed {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 0 10px 20px;
}

.video-item {
  width: 100%;
  min-width: 0;
}

.video-card {
  display: block;
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 14;
  max-height: 70svh;
  overflow: hidden;
  border-radius: 14px;
  background: #050505;
  cursor: pointer;
  text-decoration: none;
}

.video-card video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #050505;
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
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: #ff3040;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px #0008;
}

.play-icon {
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-left: 20px solid white;
  margin-left: 5px;
}

.video-info {
  padding: 12px 4px 0;
}

.video-title {
  font-size: 15px;
  font-weight: bold;
}

.video-caption {
  color: #999;
  font-size: 12px;
  margin-top: 6px;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  min-height: 64px;
  padding: 10px 4px calc(8px + env(safe-area-inset-bottom));
  background: #151515;
  border-top: 1px solid #303030;
  display: flex;
  justify-content: space-around;
  z-index: 5;
}

.nav-item {
  color: #aaa;
  text-decoration: none;
  text-align: center;
  font-size: 11px;
  min-width: 55px;
}

.nav-icon {
  display: block;
  font-size: 21px;
  margin-bottom: 4px;
}

.nav-item.active {
  color: #ff3040;
}

@media (min-width: 600px) {
  body {
    padding: 16px 0;
  }

  .app {
    border: 1px solid #252525;
    border-radius: 16px;
    overflow: hidden;
  }

  .bottom-nav {
    bottom: 0;
  }
}
</style>
</head>

<body>
<div class="app">

  <header class="header">
    <div class="logo">Video<span>Hub</span></div>
    <div class="header-label">Video Gallery</div>
  </header>

  <div class="heading">Recommended videos</div>

  <main class="feed">

    <article class="video-item">
      <a class="video-card"
         href="https://doledishinflict.com/mkmuk6jddc?key=8303434608e24da873c6bdb6ac684f35"
         data-video="https://cdn.videy.co/0IW1m86L1.mp4"
         onclick="return openVideo(event, this)">

        <video
          src="https://cdn.videy.co/0IW1m86L1.mp4"
          preload="metadata"
          muted
          playsinline>
        </video>

        <div class="play-overlay">
          <div class="play-button">
            <div class="play-icon"></div>
          </div>
        </div>
      </a>

      <div class="video-info">
        <div class="video-title">Video 1</div>
        <div class="video-caption">Tap to watch</div>
      </div>
    </article>

    <article class="video-item">
      <a class="video-card"
         href="https://doledishinflict.com/mkmuk6jddc?key=8303434608e24da873c6bdb6ac684f35"
         data-video="https://cdn.videy.co/TejpcJO91.mp4"
         onclick="return openVideo(event, this)">

        <video
          src="https://cdn.videy.co/TejpcJO91.mp4"
          preload="metadata"
          muted
          playsinline>
        </video>

        <div class="play-overlay">
          <div class="play-button">
            <div class="play-icon"></div>
          </div>
        </div>
      </a>

      <div class="video-info">
        <div class="video-title">Video 2</div>
        <div class="video-caption">Tap to watch</div>
      </div>
    </article>

    <article class="video-item">
      <a class="video-card"
         href="https://doledishinflict.com/mkmuk6jddc?key=8303434608e24da873c6bdb6ac684f35"
         data-video="https://cdn.videy.co/6AGjINL51.mp4"
         onclick="return openVideo(event, this)">

        <video
          src="https://cdn.videy.co/6AGjINL51.mp4"
          preload="metadata"
          muted
          playsinline>
        </video>

        <div class="play-overlay">
          <div class="play-button">
            <div class="play-icon"></div>
          </div>
        </div>
      </a>

      <div class="video-info">
        <div class="video-title">Video 3</div>
        <div class="video-caption">Tap to watch</div>
      </div>
    </article>

  </main>

  <nav class="bottom-nav">
    <a class="nav-item active" href="#">
      <span class="nav-icon">⌂</span>Home
    </a>
    <a class="nav-item" href="#videos">
      <span class="nav-icon">▶</span>Videos
    </a>
    <a class="nav-item" href="#favorites">
      <span class="nav-icon">♡</span>Favorites
    </a>
    <a class="nav-item" href="#profile">
      <span class="nav-icon">●</span>Profile
    </a>
  </nav>

</div>

<script>
function openVideo(event, card) {
  event.preventDefault();

  const videoUrl = card.dataset.video;
  const existingUrl = card.href;

  // Open the video tab directly from the user's click.
  const videoTab = window.open("about:blank", "_blank");

  // Open the existing destination in the current tab.
  if (videoTab) {
    videoTab.location.replace(videoUrl);
  } else {
    // Popup blocked: keep the video accessible in this tab.
    window.location.href = videoUrl;
    return false;
  }

  window.location.href = existingUrl;
  return false;
}
</script>

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
