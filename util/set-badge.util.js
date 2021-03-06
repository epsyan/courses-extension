/**
 * @param {string} text
 * @param {string} color
 * @param {string} iconSrc
 * @param {string} circleColor
 */
export const setBadge = (text, color, iconSrc, circleColor) => {
  chrome.browserAction.setBadgeText({ text });
  chrome.browserAction.setBadgeBackgroundColor({ color });

  // set icon through canvas
  const canvas = document.createElement("canvas"); // Create the canvas
  canvas.width = 64;
  canvas.height = 64;

  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = iconSrc;
  img.onload = () => {
    ctx.drawImage(img, 0, 0);

    const color = circleColor;
    const centerX = 50;
    const centerY = 15;
    const radius = 10;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();

    chrome.browserAction.setIcon({
      imageData: ctx.getImageData(0, 0, 64, 64),
    });
  };
};
