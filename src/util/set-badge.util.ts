type DrawCanvasCb = (image: ImageData) => void;

const CANVAS_DIMENSION = 64;
const ARC_CENTER_X = 50;
const ARC_CENTER_Y = 15;
const ARC_RADIUS = 10;

export const setBadge = (text: string, color: string, iconSrc: string, circleColor: string): void => {
    chrome.browserAction.setBadgeText({ text });
    chrome.browserAction.setBadgeBackgroundColor({ color });

    drawCanvas(iconSrc, circleColor, (imageData) => chrome.browserAction.setIcon({ imageData }));
};

const drawCanvas = (iconSrc: string, circleColor: string, cb: DrawCanvasCb) => {
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_DIMENSION;
    canvas.height = CANVAS_DIMENSION;

    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = iconSrc;
    img.onload = () => {
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);

        const color = circleColor;
        const centerX = ARC_CENTER_X;
        const centerY = ARC_CENTER_Y;
        const radius = ARC_RADIUS;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.stroke();

        cb(ctx.getImageData(0, 0, CANVAS_DIMENSION, CANVAS_DIMENSION));
    };
};
