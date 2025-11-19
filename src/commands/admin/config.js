// src/commands/admin/config.js
const { getGuildConfig, setGuildConfig } = require('../../config-store');

module.exports = {
  name: 'config',
  description: 'Painel de configuração do bot',
  async execute(message, args) {
    // Só permite quem tem permissão de gerenciar o servidor
    if (!message.member.permissions.has('ManageGuild')) {
      return message.reply('❌ Você não tem permissão para usar este comando (é necessário Gerenciar Servidor).');
    }

    const sub = (args.shift() || '').toLowerCase();

    if (!sub) {
      return message.reply(
        '📋 Uso do comando:\n' +
        '`!config show` - mostra as configurações atuais\n' +
        '`!config setchannel #Comandos` - define o canal de comandos do bot'
      );
    }

    const guildId = message.guild.id;

    // !config show
    if (sub === 'show') {
      const cfg = getGuildConfig(guildId);
      const channelId = cfg.allowedChannelId;

      const channelText = channelId
        ? `<#${channelId}>`
        : 'Nenhum (bot funciona em qualquer canal)';

      return message.reply(
        '⚙️ **Configurações do servidor:**\n' +
        `• Canal de comandos: ${channelText}`
      );
    }

    // !config setchannel #Comandos
    if (sub === 'setchannel') {
      const channelMention = args[0];

      if (!channelMention) {
        return message.reply('Use: `!config setchannel #nome-do-canal`');
      }

      // Pode vir como <#123456...> ou o próprio ID
      let channelId = channelMention.replace('<#', '').replace('>', '');

      const channel = message.guild.channels.cache.get(channelId);
      if (!channel || channel.type !== 0) {
        // type 0 = canal de texto
        return message.reply('❌ Canal inválido. Escolha um canal de texto do servidor.');
      }

      const updated = setGuildConfig(guildId, { allowedChannelId: channelId });

      return message.reply(
        `✅ Canal de comandos definido para <#${updated.allowedChannelId}>.\n` +
        `Agora o bot só responderá comandos nesse canal.`
      );
    }

    // Subcomando desconhecido
    return message.reply(
      '❌ Subcomando desconhecido.\n' +
      'Use:\n`!config show`\n`!config setchannel #Comandos`'
    );
  },
};