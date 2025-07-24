const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body; // only expecting messages now

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://www.sitename.com',
        'X-Title': 'SiteName',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3-0324:free', 
        messages: messages,
        stream: false,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
