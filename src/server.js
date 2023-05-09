const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const htmlFolder = 'html_pitch_decks';

app.use(express.static(htmlFolder));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, htmlFolder, 'index.html'));
})

app.get('/:pitchdeck', (req, res) => {
    res.sendFile(path.join(__dirname, htmlFolder, `pitchdeck_${req.params.pitchdeck}.html`));
})

app.listen(port, () => {
    console.log('App running on port ' + port + '.')
});
