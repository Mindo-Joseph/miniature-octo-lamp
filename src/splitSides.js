const fs = require('fs');
const path = require('path');

const inputFolder = 'pitch_decks';
const outputFolder = 'updated_mds';

fs.mkdirSync(outputFolder, {recursive: true});

const mdFiles = fs.readdirSync(inputFolder).filter((file) => path.extname(file) === '.md');

mdFiles.forEach((file) => {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(outputFolder, file);

    const originalContent = fs.readFileSync(inputPath, 'utf-8');
    const updatedContent = splitContentIntoSlides(originalContent);

    fs.writeFileSync(outputPath, updatedContent);
});

function splitContentIntoSlides(content) {
    const lines = content.split('\n');
    let updatedContent = '';

    lines.forEach((line, index) => {
        if (index === 0 && (line.startsWith('###') || line.startsWith('##'))) {
            updatedContent += line + '\n';
        } else if (line.startsWith('---')) {
            updatedContent += line + '\n';
        } else if (line.startsWith('###') || line.startsWith('##')) {
            updatedContent += '---\n' + line + '\n';
        } else {
            updatedContent += line ? line + '\n' : '\n';
        }
    });

    return updatedContent;
}
