// src/index.js
const { Client, GatewayIntentBits } = require('discord.js');
const { PREFIX, DISCORD_TOKEN } = require('./config');
const commands = require('./commands');
const { getGuildConfig } = require('./config-store');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const guildId = message.guild.id;
  const guildConfig = getGuildConfig(guildId);
  const allowedChannelId = guildConfig.allowedChannelId || null;

  // 🔒 Se houver canal configurado para esse servidor, só lê daquele canal
  if (allowedChannelId && message.channel.id !== allowedChannelId) {
    return;
  }

  // Daqui pra baixo só trata comandos
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  const command = commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(`Erro ao executar comando ${commandName}:`, err);
    message.reply('❌ Ocorreu um erro ao executar esse comando.');
  }
});

client.once('ready', () => {
  console.log(`Logado como ${client.user.tag}`);
});

client.login(DISCORD_TOKEN);