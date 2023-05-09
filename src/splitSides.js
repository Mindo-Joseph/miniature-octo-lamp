const fs = require('fs');
const path = require('path');

const inputFolder = 'original_mds';
const outputFolder = 'updated_mds';

fs.mkdirSync(outputFolder, {recursive: true});

fs.readdirSync(inputFolder).forEach((file) => {
    if (path.extname(file) === '.md') {
        const inputPath = path.join(inputFolder, file);
        const outputPath = path.join(outputFolder, file);

        const originalContent = fs.readFileSync(inputPath, 'utf-8');
        const updatedContent = splitContentIntoSlides(originalContent);

        fs.writeFileSync(outputPath, updatedContent);
    }
});

function splitContentIntoSlides(content) {
    const lines = content.split('\n');
    let updatedContent = '';

    lines.forEach((line) => {
        if (line.startsWith('#') || line.startsWith('---')) {
            updatedContent += line + '\n';
        } else if (line.startsWith('###') || line.startsWith('##')) {
            updatedContent += '---\n' + line + '\n';
        } else {
            updatedContent += line ? line + '\n' : '\n';
        }
    });

    return updatedContent;
}
