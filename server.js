const express = require('express');
const { OpenAI } = require("openai");
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

console.log('test', process.env.TEST);

const app = express();
const port = process.env.SERVER_PORT || 3000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(bodyParser.json());

app.post('/api/send-message', async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: message
  });  
  console.log(completion.choices[0].text);

      res.json({ response: completion.choices[0].text });
 
    // const apiKey = process.env.OPENAI_API_KEY;
    // const apiUrl = 'https://api.openai.com/v1/chat/completions';
    // const response = await axios.post(apiUrl, {
    //   prompt: message,
    //   max_tokens: 150,
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${apiKey}`,
    //   },
    // });

    // res.json({ response: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error sending message to GPT-3:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// async function main() {
//   const completion = await openai.completions.create({
//       model: 'gpt-3.5-turbo-instruct',
//       prompt: 'Write a tagline for an ice cream shop.'
//   });  
//   console.log(completion.choices[0].text);
// }
// main();

