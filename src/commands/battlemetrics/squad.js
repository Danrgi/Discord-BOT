// src/commands/battlemetrics/squad.js
const { EmbedBuilder } = require('discord.js');
const { getServersByIds } = require('../../services/battlemetrics');

// IDs dos servidores favoritos
const FAVORITE_SERVERS = (process.env.BM_SQUAD_SERVERS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

module.exports = {
  name: 'squad',
  description: 'Mostra a lista de servidores favoritos configurados no BattleMetrics',

  async execute(message) {
    if (!FAVORITE_SERVERS.length) {
      return message.reply(
        'Nenhum servidor configurado ainda.\n' +
          'Defina a variável de ambiente `BM_SQUAD_SERVERS` com os IDs separados por vírgula.\n\n' +
          'Exemplo:\n`BM_SQUAD_SERVERS=123456,987654,555666`'
      );
    }

    try {
      const servers = await getServersByIds(FAVORITE_SERVERS);

      if (!servers.length) {
        return message.reply(
          'Não consegui encontrar nenhum dos servidores configurados na BattleMetrics.'
        );
      }

      const lines = servers.map((s, i) => {
        const header = `**${i + 1}. ${s.name || 'Servidor sem nome'}**`;
        const ipLine =
          s.ip && s.port ? `IP: \`${s.ip}:${s.port}\`` : 'IP: (não informado)';
        const playersLine =
          s.players != null && s.maxPlayers != null
            ? `Players: **${s.players}/${s.maxPlayers}**`
            : 'Players: (sem info)';
        const linkLine = s.bmUrl ? `[BattleMetrics](${s.bmUrl})` : '';

        return [header, ipLine, playersLine, linkLine].filter(Boolean).join('\n');
      });

      await message.reply(lines.join('\n\n'));
    } catch (err) {
      console.error('[BattleMetrics] Erro ao buscar servidores:', err);
      await message.reply(
        '❌ [BattleMetrics] Erro ao buscar servidores. Veja o log do console para mais detalhes.'
      );
    }
  },
};