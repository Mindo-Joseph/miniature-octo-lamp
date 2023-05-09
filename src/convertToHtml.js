const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const marpFolder = 'updated_mds';
const htmlFolder = 'html_pitch_decks';

fs.mkdirSync(htmlFolder, { recursive: true });

fs.readdirSync(marpFolder).forEach(file => {
    if (path.extname(file).toLowerCase() === '.md') {
        const marpFile = path.join(marpFolder, file);
        const htmlFile = path.join(htmlFolder, path.basename(file, '.md') + '.html');

        const command = `npx @marp-team/marp-cli ${marpFile} --html --allow-local-files --output ${htmlFile}`;
        execSync(command);

    }
});
