
export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);

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
<title>XXXVideo</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;height:100%;overflow:hidden;background:#090909;color:#fff;font-family:Arial,sans-serif}
.app{width:100%;max-width:480px;height:100vh;height:100dvh;margin:auto;display:flex;flex-direction:column;overflow:hidden;background:#111}
.header{height:56px;flex-shrink:0;padding:0 16px;display:flex;align-items:center;justify-content:space-between;background:#141414;border-bottom:1px solid #292929}
.logo{font-size:21px;font-weight:800}
.logo span{color:#ff3040}
.badge{font-size:11px;color:#bbb}
.heading{flex-shrink:0;padding:14px;font-size:14px;font-weight:bold}
.stage{flex:1;min-height:0;display:flex;flex-direction:column;padding:0 10px 12px}
.video-card{position:relative;flex:1;min-height:0;display:block;overflow:hidden;border-radius:14px;background:#000;text-decoration:none;cursor:pointer}
.video-card video{width:100%;height:100%;display:block;object-fit:contain;background:#000}
.play-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#0002;pointer-events:none}
.play-button{width:68px;height:68px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#ff3040;box-shadow:0 4px 25px #0008}
.play-icon{width:0;height:0;border-top:13px solid transparent;border-bottom:13px solid transparent;border-left:21px solid white;margin-left:5px}
.video-info{flex-shrink:0;padding:12px 4px 5px;display:flex;align-items:center;justify-content:space-between}
.video-title{font-size:14px;font-weight:bold}
.video-subtitle{margin-top:5px;font-size:12px;color:#999}
.bottom-nav{flex-shrink:0;height:calc(60px + env(safe-area-inset-bottom));padding:8px 5px env(safe-area-inset-bottom);display:flex;justify-content:space-around;align-items:center;border-top:1px solid #292929;background:#151515}
.nav-item{color:#aaa;text-align:center;font-size:11px;text-decoration:none}
.nav-item.active{color:#ff3040}
.nav-icon{display:block;font-size:20px;margin-bottom:4px}
@media(max-height:550px){.header{height:42px}.heading{padding:7px 12px}.video-info{padding:6px 4px}.bottom-nav{height:44px;padding:4px}.nav-icon{font-size:16px;margin-bottom:1px}}
</style>
</head>
<body>
<div class="app">
  <header class="header">
    <div class="logo">XXX<span>Video</span></div>
    <div class="badge">Discover</div>
  </header>


  <main class="stage">
    <a class="video-card" id="videoCard" href="#">
      <video id="preview" muted playsinline preload="metadata"></video>
      <div class="play-overlay" id="playOverlay">
        <div class="play-button"><div class="play-icon"></div></div>
      </div>
    </a>
  </main>

  <nav class="bottom-nav">
    <a class="nav-item active" href="#"><span class="nav-icon">⌂</span>Home</a>
    <a class="nav-item" href="#"><span class="nav-icon">▶</span>Videos</a>
    <a class="nav-item" href="#"><span class="nav-icon">♡</span>Favorites</a>
  </nav>
</div>

<script>
(function () {
  "use strict";

  var videos = [
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

  var destination =
    "https://bonnetdetectiveshomecoming.com/nh8gvjya9?key=e9bbe4f8f1e32fe45b90af691b82cfbe";

  var selectedVideo = videos[
    Math.floor(Math.random() * videos.length)
  ];

  var preview = document.getElementById("preview");
  var overlay = document.getElementById("playOverlay");
  var card = document.getElementById("videoCard");
  var subtitle = document.getElementById("videoSubtitle");

  preview.src = selectedVideo;
  preview.load();

  preview.addEventListener("play", function () {
    overlay.style.display = "none";
  });

  preview.addEventListener("pause", function () {
    overlay.style.display = "flex";
  });

  preview.addEventListener("ended", function () {
    overlay.style.display = "flex";
  });

  card.addEventListener("click", function (event) {
    event.preventDefault();

    // Open a blank tab synchronously during the user's click.
    var videoTab = window.open("about:blank", "_blank");

    if (!videoTab) {
      subtitle.textContent = "Tap play to watch the video";
      preview.controls = true;
      preview.play().catch(function () {
        overlay.style.display = "flex";
      });
      return;
    }

    // Build the player without nested template literals.
    var playerHTML =
      '<!DOCTYPE html>' +
      '<html lang="en"><head>' +
      '<meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
      '<meta name="theme-color" content="#000">' +
      '<title>Video Player</title>' +
      '<style>' +
      '*{box-sizing:border-box}' +
      'html,body{margin:0;width:100%;height:100%;background:#000;overflow:hidden}' +
      'body{display:flex;align-items:center;justify-content:center}' +
      'video{display:block;width:100%;height:100%;object-fit:contain;background:#000}' +
      '</style></head><body>' +
      '<video id="player" src="VIDEO_SOURCE" autoplay muted playsinline controls></video>' +
      '<script>' +
      'var p=document.getElementById("player");' +
      'p.play().catch(function(){' +
      'p.controls=true;' +
      '});' +
      '<\/script>' +
      '</body></html>';

    playerHTML = playerHTML.replace(
      "VIDEO_SOURCE",
      selectedVideo
    );

    try {
      videoTab.document.open();
      videoTab.document.write(playerHTML);
      videoTab.document.close();
    } catch (error) {
      videoTab.location.href = selectedVideo;
    }

    // Navigate the original tab to the configured destination.
    window.location.href = destination;
  });
})();
</script>

<!-- Waust.at widget -->
<script id="_wauftb">
var _wau = _wau || [];
_wau.push(["tab", "f564ux0p31", "xn0", "bottom-center"]);
</script>
<script async src="//waust.at/t.js"></script>

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
