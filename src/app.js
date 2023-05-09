require('dotenv').config();
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY});
const openai = new OpenAIApi(configuration);

const inputFile = 'ideas.xlsx';
const outputFolder = 'pitch_decks';

async function createMarpPitchDecks(inputFile, outputFolder) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(inputFile);
    const worksheet = workbook.getWorksheet(1);

    fs.mkdirSync(outputFolder, {recursive: true});

    for (let rowIndex = 168; rowIndex <= 195; rowIndex++) {
        const idea = worksheet.getCell(rowIndex, 1).value;

        const pitchDeckContent = await generateMarpPitchDeckContent(idea);

        fs.writeFileSync(path.join(outputFolder, `pitchdeck_${rowIndex}.md`), pitchDeckContent);
    }
}

async function generateMarpPitchDeckContent(idea) {
    const prompt = `Create a pitch deck in Marp markdown format for the idea "${idea}".`;

    const gpt3Response = await openai.createCompletion({
model : "text-davinci-003",

        prompt: prompt,
        max_tokens: 500,
        n: 1,
        stop: null,
        temperature: 0.7
    });

    const content = gpt3Response.data.choices[0].text.trim();

    const marpTemplate = `---
marp: true
theme: default
paginate: true
---
${content}
  `;

    return marpTemplate;
}

createMarpPitchDecks(inputFile, outputFolder);
