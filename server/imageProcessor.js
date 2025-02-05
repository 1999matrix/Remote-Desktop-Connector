const sharp = require('sharp');

async function processImage(base64Image) {
    try {
        const imageBuffer = Buffer.from(base64Image, 'base64');
        
        // Example processing: Convert to grayscale and adjust contrast
        const processedBuffer = await sharp(imageBuffer)
            .grayscale() // Convert to grayscale
            .linear(1.2, 0) // Adjust contrast (multiplier: 1.2, offset: 0)
            .toBuffer();
            
        return processedBuffer.toString('base64');
    } catch (error) {
        console.error('Image processing error:', error);
        throw error;
    }
}

module.exports = { processImage };