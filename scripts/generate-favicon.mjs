import fs from 'node:fs';
import path from 'node:path';

// Create a valid 32x32 BMP inside an ICO container
const width = 32;
const height = 32;

// Simple 32x32 ICO generation
// ICO header: 6 bytes
// Icon directory entry: 16 bytes
// BMP Header (BITMAPINFOHEADER): 40 bytes
// Pixel data: 32x32x4 = 4096 bytes
// Mask data: 32 * (32/8) = 128 bytes (all 0 for no transparency mask since 32-bit ARGB)

const pixelDataSize = width * height * 4;
const maskSize = Math.ceil(width / 32) * 4 * height; // 128 bytes
const imageSize = 40 + pixelDataSize + maskSize;

const icoBuffer = Buffer.alloc(6 + 16 + imageSize);

// ICO Header
icoBuffer.writeUInt16LE(0, 0); // Reserved
icoBuffer.writeUInt16LE(1, 2); // 1 = ICO
icoBuffer.writeUInt16LE(1, 4); // Number of images

// Directory Entry
icoBuffer.writeUInt8(width, 6);        // Width (32)
icoBuffer.writeUInt8(height, 7);       // Height (32)
icoBuffer.writeUInt8(0, 8);            // Color count (0 for >= 8bpp)
icoBuffer.writeUInt8(0, 9);            // Reserved
icoBuffer.writeUInt16LE(1, 10);        // Color planes
icoBuffer.writeUInt16LE(32, 12);       // Bits per pixel (32-bit ARGB)
icoBuffer.writeUInt32LE(imageSize, 14);// Image data size
icoBuffer.writeUInt32LE(22, 18);       // Offset of image data (6 + 16 = 22)

// BITMAPINFOHEADER (offset 22)
let offset = 22;
icoBuffer.writeUInt32LE(40, offset); offset += 4;         // Header size
icoBuffer.writeInt32LE(width, offset); offset += 4;       // Width
icoBuffer.writeInt32LE(height * 2, offset); offset += 4;  // Height (in ICO BMP header, height is doubled: image + mask)
icoBuffer.writeUInt16LE(1, offset); offset += 2;          // Planes
icoBuffer.writeUInt16LE(32, offset); offset += 2;         // Bit count
icoBuffer.writeUInt32LE(0, offset); offset += 4;          // Compression (0 = BI_RGB)
icoBuffer.writeUInt32LE(pixelDataSize + maskSize, offset); offset += 4; // Image size
icoBuffer.writeInt32LE(0, offset); offset += 4;          // X pixels per meter
icoBuffer.writeInt32LE(0, offset); offset += 4;          // Y pixels per meter
icoBuffer.writeUInt32LE(0, offset); offset += 4;          // Colors used
icoBuffer.writeUInt32LE(0, offset); offset += 4;          // Important colors

// 32-bit ARGB pixel data (bottom-up in BMP format)
// Background: #0C0E17 (Dark navy/black) -> B: 0x17, G: 0x0E, R: 0x0C, A: 0xFF
// Foreground V-mark: #CDFF00 (Lime) -> B: 0x00, G: 0xFF, R: 0xCD, A: 0xFF
for (let y = 0; y < height; y++) {
  // Real Y coordinate in icon from top (0) to bottom (31)
  const topY = 31 - y;
  for (let x = 0; x < width; x++) {
    // Draw rounded background & V symbol
    const distFromCenter = Math.hypot(x - 15.5, topY - 15.5);
    const isInsideBox = x >= 2 && x <= 29 && topY >= 2 && topY <= 29;

    let r = 0x0C, g = 0x0E, b = 0x17, a = 0xFF;

    if (distFromCenter > 15.8) {
      a = 0; // Rounded corners transparent
    } else {
      // Draw "V" shape
      // Left stroke: from (8, 9) to (15, 23)
      // Right stroke: from (16, 23) to (23, 9)
      const leftLineDist = Math.abs((topY - 9) * 0.5 - (x - 8));
      const rightLineDist = Math.abs((topY - 9) * 0.5 - (23 - x));
      
      const isVLeft = topY >= 9 && topY <= 23 && leftLineDist <= 1.8 && x <= 16;
      const isVRight = topY >= 9 && topY <= 23 && rightLineDist <= 1.8 && x >= 15;
      const isDot = Math.hypot(x - 24, topY - 9) <= 2;

      if (isVLeft || isVRight || isDot) {
        r = 0xCD;
        g = 0xFF;
        b = 0x00;
        a = 0xFF;
      }
    }

    icoBuffer.writeUInt8(b, offset++);
    icoBuffer.writeUInt8(g, offset++);
    icoBuffer.writeUInt8(r, offset++);
    icoBuffer.writeUInt8(a, offset++);
  }
}

// Write 0s for mask (offset already at end of pixels)
icoBuffer.fill(0, offset, offset + maskSize);

// Write to public folders
const targets = [
  path.resolve('artifacts/vernox-vision/public/favicon.ico'),
  path.resolve('dist/favicon.ico'),
];

for (const t of targets) {
  try {
    fs.mkdirSync(path.dirname(t), { recursive: true });
    fs.writeFileSync(t, icoBuffer);
    console.log(`Generated valid favicon.ico -> ${t}`);
  } catch (err) {
    console.error(`Error writing ${t}:`, err);
  }
}
