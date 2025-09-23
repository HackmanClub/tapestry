// This script was made with help of ChatGPT and adjusted to correct working state.

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

hexo.extend.filter.register('after_init', async function() {
    if (!hexo.theme.config.thumbnails) return; 
    if ( (hexo.env.cmd !== 'generate') && (hexo.env.cmd !== 'g') ) return;

    console.log('Generating thumbnails...');

    const source = path.join(hexo.base_dir, 'source/images');
    const thumbnails = path.join(hexo.base_dir, 'source/thumbnails');

    if (!fs.existsSync(thumbnails)) {
        fs.mkdirSync(thumbnails, { recursive: true });
    }

    // Thumbnail sizes
    const sizes = [
        { name: 'small', width: 333 },      // Three-column layout
        { name: 'medium', width: 666 },     // Two-column layout
        { name: 'large', width: 1000 }      // Normal post
    ];

    const getAllFilesInclSubfolders = (dir) => {
        let results = [];
        fs.readdirSync(dir).forEach(file => {
            if (file === '.' || file === '..') return;
            
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                results = results.concat(getAllFilesInclSubfolders(fullPath));
            } else {
                results.push(fullPath);
            }
        });
        return results;
    };
    
    const imageFiles = getAllFilesInclSubfolders(source);
    imageFiles.forEach(inputFile => {
        const ext = path.extname(inputFile).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            sizes.forEach(size => {
                // Maintain folder structure in thumbnails
                const relativePath = path.relative(thumbnails, inputFile).replace(/^(\.\.\/)+images\//, '');

                const outputFile = path.join(thumbnails, size.name + '-' + relativePath);
                console.log(`PARTIAL: ${inputFile} - ${relativePath}`);
    
                // Ensure the output directory structure exists
                fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    
                if (!fs.existsSync(outputFile)) {
                    sharp(inputFile)
                        .resize(size.width)
                        .toFile(outputFile)
                        .then(() => console.log(`Generated: ${outputFile}`))
                        .catch(err => console.error(`Error processing ${inputFile}:`, err));
                }
            });
        }
    });
});
