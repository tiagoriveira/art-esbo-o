import { SketchSettings } from '../context/ImageContext';

/**
 * Converts an image to grayscale
 */
export function convertToGrayscale(imageData: ImageData): ImageData {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;     // R
        data[i + 1] = avg; // G
        data[i + 2] = avg; // B
        // Alpha remains unchanged
    }
    return imageData;
}

/**
 * Applies Sobel operator for edge detection
 * @param imageData - Grayscale image data
 * @param threshold - Sensitivity (0-100), higher = fewer edges
 */
export function applySobelOperator(imageData: ImageData, threshold: number = 50): ImageData {
    const width = imageData.width;
    const height = imageData.height;
    const src = imageData.data;
    const output = new Uint8ClampedArray(src.length);

    // Sobel kernels
    const sobelX = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ];

    const sobelY = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]
    ];

    // Normalize threshold (0-100 to actual pixel value)
    const thresholdValue = (100 - threshold) * 2.55;

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let gx = 0;
            let gy = 0;

            // Apply kernels
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const idx = ((y + ky) * width + (x + kx)) * 4;
                    const pixel = src[idx]; // Already grayscale, so R = G = B
                    gx += pixel * sobelX[ky + 1][kx + 1];
                    gy += pixel * sobelY[ky + 1][kx + 1];
                }
            }

            // Calculate gradient magnitude
            const magnitude = Math.sqrt(gx * gx + gy * gy);

            // Apply threshold
            const edgeValue = magnitude > thresholdValue ? 255 : 0;

            const idx = (y * width + x) * 4;
            output[idx] = edgeValue;
            output[idx + 1] = edgeValue;
            output[idx + 2] = edgeValue;
            output[idx + 3] = 255;
        }
    }

    // Copy output back to imageData
    for (let i = 0; i < src.length; i++) {
        imageData.data[i] = output[i];
    }

    return imageData;
}

/**
 * Inverts colors (white background, black lines)
 */
export function invertColors(imageData: ImageData): ImageData {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];         // R
        data[i + 1] = 255 - data[i + 1]; // G
        data[i + 2] = 255 - data[i + 2]; // B
        // Alpha remains unchanged
    }
    return imageData;
}

/**
 * Adjusts line weight by dilating/eroding the edges
 * @param imageData - Edge-detected image
 * @param weight - Line weight (0-100), 50 = normal
 */
export function adjustLineWeight(imageData: ImageData, weight: number): ImageData {
    if (weight === 50) return imageData;

    const width = imageData.width;
    const height = imageData.height;
    const src = new Uint8ClampedArray(imageData.data);
    const radius = Math.abs(weight - 50) / 25; // 0-2 pixel radius

    const isDilation = weight > 50;

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = (y * width + x) * 4;

            if (isDilation) {
                // Dilation: if any neighbor is dark, make this dark
                let hasDarkNeighbor = false;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        const nIdx = ((y + dy) * width + (x + dx)) * 4;
                        if (src[nIdx] < 128) {
                            hasDarkNeighbor = true;
                            break;
                        }
                    }
                    if (hasDarkNeighbor) break;
                }
                if (hasDarkNeighbor && radius > 0.5) {
                    imageData.data[idx] = 0;
                    imageData.data[idx + 1] = 0;
                    imageData.data[idx + 2] = 0;
                }
            } else {
                // Erosion: if any neighbor is light, make this light
                let hasLightNeighbor = false;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        const nIdx = ((y + dy) * width + (x + dx)) * 4;
                        if (src[nIdx] > 128) {
                            hasLightNeighbor = true;
                            break;
                        }
                    }
                    if (hasLightNeighbor) break;
                }
                if (hasLightNeighbor && radius > 0.5) {
                    imageData.data[idx] = 255;
                    imageData.data[idx + 1] = 255;
                    imageData.data[idx + 2] = 255;
                }
            }
        }
    }

    return imageData;
}

/**
 * Main function to generate a sketch from an image URL
 */
export async function generateSketch(
    imageURL: string,
    settings: SketchSettings,
    canvas: HTMLCanvasElement
): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Failed to get canvas context'));
                return;
            }

            // Set canvas size to match image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw original image
            ctx.drawImage(img, 0, 0);

            // Get image data
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // Apply processing pipeline
            imageData = convertToGrayscale(imageData);
            imageData = applySobelOperator(imageData, settings.complexity);
            imageData = invertColors(imageData);
            imageData = adjustLineWeight(imageData, settings.lineWeight);

            // Write back to canvas
            ctx.putImageData(imageData, 0, 0);

            // Export as data URL
            const sketchURL = canvas.toDataURL('image/png');
            resolve(sketchURL);
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };

        img.src = imageURL;
    });
}

/**
 * Download a data URL as a file
 */
export function downloadSketch(dataURL: string, filename: string = 'sketch.png'): void {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
