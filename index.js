const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// Replace 'YOUR_TOKEN' with the token you got from BotFather
const token = 'YOUR_TOKEN';
const bot = new TelegramBot(token);
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://your-vercel-app-url.vercel.app';

bot.setWebHook(`${URL}/bot${token}`);

app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Listen for the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const user = msg.from;
    
    const userInfo = `
\`\`\`
ID: ${user.id}
Name: ${user.first_name} ${user.last_name || ''}
Username: @${user.username}
Language Code: ${user.language_code}
\`\`\`
`;

    bot.sendMessage(chatId, `Hello, ${user.first_name}!\nHere is your info:\n\n${userInfo}`, { parse_mode: 'Markdown' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
