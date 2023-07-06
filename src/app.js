require('dotenv').config();
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY});
const openai = new OpenAIApi(configuration);

const inputFile = 'Ideas3.xlsx';
const outputFolder = 'cohort_3_decks';

async function createMarpPitchDecks(inputFile, outputFolder) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(inputFile);
    const worksheet = workbook.getWorksheet(1);

    fs.mkdirSync(outputFolder, {recursive: true});

    for (let rowIndex = 1; rowIndex <= 25; rowIndex++) {
        const idea = worksheet.getCell(rowIndex, 1).value;

        const pitchDeckContent = await generateMarpPitchDeckContent(idea);

        fs.writeFileSync(path.join(outputFolder, `pitchdeck_${rowIndex}.md`), pitchDeckContent);
    }
}

async function generateMarpPitchDeckContent(idea) {
    const prompt = `You are an expert entrepreneur and investor, your role is to come up with a pitch-deck.
    I will give you an idea and you need to reflect on each of the following sections for the pitchdeck. First off come up with a unique app name and use it as ## Title  Then first section is what
    problem is the idea solving, what is the solution statement that really suits the idea, what is the product definition
    for an app or website that can be used to implement this solution. Think about who are the target audience for this
    product. Also incorporate the potential market size for this idea as well as what is its potential competitive advantage. In another section, capture the roadmap
    that will be used to bring this idea to life. In another section talk about the business and revenue model. After this
    section we also need a go to market strategy and in the last section what is the ask.
    The pitchdeck will be in marp format be sure to include all the
    relevant sections mentioned with each section being prefixed by ## to denote it is a heading, the idea is: "${idea}".`;

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
