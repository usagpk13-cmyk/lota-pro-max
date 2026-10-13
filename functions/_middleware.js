function openSelectedVideo(event) {
  event.preventDefault();

  const videoUrl = selectedVideo;
  const existingUrl =
    "https://doledishinflict.com/mkmuk6jddc?key=8303434608e24da873c6bdb6ac684f35";

  // Open a new tab directly during the user's click.
  const videoTab = window.open("about:blank", "_blank");

  if (!videoTab) {
    // Popup blocked: play video in the current tab.
    window.location.href = videoUrl;
    return false;
  }

  // Build a dedicated autoplay video page.
  const playerHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#000">
<title>Video Player</title>
<style>
* { box-sizing: border-box; }
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  background: #000;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
}
video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
</head>
<body>
<video
  id="player"
  src="${videoUrl}"
  autoplay
  muted
  playsinline
  controls
></video>
<script>
const player = document.getElementById("player");
player.play().catch(() => {
  // If autoplay is blocked, the user can tap Play.
});
<\/script>
</body>
</html>`;

  videoTab.document.open();
  videoTab.document.write(playerHTML);
  videoTab.document.close();

  // Navigate the original tab to the existing destination.
  window.location.href = existingUrl;

  return false;
}
