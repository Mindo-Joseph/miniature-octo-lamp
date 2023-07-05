require('dotenv').config();
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY});
const openai = new OpenAIApi(configuration);

const inputFile = 'TestIdea.xlsx';
const outputFolder = 'cohort_3_decks';

async function createMarpPitchDecks(inputFile, outputFolder) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(inputFile);
    const worksheet = workbook.getWorksheet(1);

    fs.mkdirSync(outputFolder, {recursive: true});

    for (let rowIndex = 1; rowIndex <= 2; rowIndex++) {
        const idea = worksheet.getCell(rowIndex, 1).value;

        const pitchDeckContent = await generateMarpPitchDeckContent(idea);

        fs.writeFileSync(path.join(outputFolder, `pitchdeck_${rowIndex}.md`), pitchDeckContent);
    }
}

async function generateMarpPitchDeckContent(idea) {
    const prompt = `You are an expert entrepreneur and investor, your role is to come up with a pitch-deck. I will give you an idea and you need to create an investor ready pitchdeck. The pitchdeck will be in marp format be sure to include all the relevant sections, the idea is: "${idea}".`;

    const gpt3Response = await openai.createCompletion({
        model : "text-davinci-003",
        prompt: prompt,
        max_tokens: 900,
        n: 1,
        stop: null,
        temperature: 1
    });

    const content = gpt3Response.data.choices[0].text.trim();

    const marpTemplate = `---
marp: true
theme: uncover
paginate: true
---
${content}
  `;

    return marpTemplate;
}

createMarpPitchDecks(inputFile, outputFolder);
