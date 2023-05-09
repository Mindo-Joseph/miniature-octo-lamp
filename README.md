# Pitch Deck Generator

This project allows you to create pitch decks for a list of ideas stored in an Excel sheet. It generates pitch deck content using OpenAI's GPT-3 API, converts it to a Marp markdown format, and produces HTML files to view as slide presentations. The project also contains instructions for deploying the HTML files with Vercel, making them accessible online.

## Prerequisites

- [Node.js](https://nodejs.org/en/) installed on your system
- An [OpenAI API key](https://beta.openai.com/signup/) to use GPT-3 for generating content

## Installation

1. Clone this repository or download it as a ZIP file and extract it.
2. Inside the project folder, run `npm install` to install the necessary dependencies.

## Usage

1. Replace the `inputFile` variable in `app.js` with the path to your Excel sheet containing the ideas.
2. Create a `.env` file in the project directory and add your OpenAI API key:
3. `OPENAI_API_KEY=your_api_key_here`
4. 3. Run `node createPitchDecks.js` to generate Marp markdown files in the `marp_pitchdecks` folder.
4. Run `node convertToHTML.js` to convert the Marp markdown files to HTML files in the `html_pitchdecks` folder.

To view the generated pitch decks, deploy the project to Vercel or serve the HTML files using a local web server. Instructions for both are provided below.

### Deploy to Render

Follow the [tutorial](https://www.freecodecamp.org/news/how-to-deploy-nodejs-application-with-render/) to deploy the project to Render.

After completing the setup, Render will provide you with a unique URL.

Visit the URL provided to access your pitch decks. To view a specific pitch deck, append the slide index to the URL, e.g., `https://your-url.render.app/1` to access pitch deck 1.

### Run a Local Web Server

1. Install Express: `npm install express`
2. Start the server `node server.js`
3. Visit `http://localhost:3000/ROWINDEX` to view the pitch decks, replacing `ROWINDEX` with the corresponding row index from the Excel sheet.

## License

This project is released under the [MIT License](LICENSE).


