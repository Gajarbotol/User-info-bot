const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// Replace 'YOUR_TOKEN' with the token you got from BotFather
const token = '6222597603:AAG9JmNoqdYG64aGvxB9ELCcAK0KzJwGkFA';
// Replace 'YOUR_URL' with your actual Vercel app URL
const URL = 'https://user-info-bot.vercel.app';

const bot = new TelegramBot(token);
const app = express();
app.use(bodyParser.json());

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

module.exports = app;
