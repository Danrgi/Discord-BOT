# 🎵 Discord Music & Squad Server Bot  
Um **bot avançado para Discord**, escrito em **Node.js**, com:

- 🎶 Sistema completo de música (YouTube → yt-dlp → ffmpeg → Discord)
- 📡 Integração com **BattleMetrics API**
- 🧹 Limpador automático de canal
- ⚙️ Painel de configuração por servidor (`!config`)
- 🛠 Estrutura modular e fácil manutenção

---

## 📁 Estrutura do Projeto

```
src/
  index.js
  config.js
  constants.js
  config-store.js
  music/
    player.js
  services/
    battlemetrics.js
  commands/
    index.js
    admin/
      config.js
    music/
      play.js
      skip.js
      stop.js
      queue.js
    battlemetrics/
      squad.js
data/
  guild-config.json
.env
```

---

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/Discord-BOT.git
cd Discord-BOT
```

### 2. Instale as dependências

```bash
npm install
```

Dependências principais:

```bash
npm install discord.js @discordjs/voice ffmpeg-static play-dl opusscript
```

---

## 🔧 Configuração

Crie o arquivo `.env`:

```env
DISCORD_TOKEN=SEU_TOKEN_DO_DISCORD
PREFIX=!
BATTLEMETRICS_TOKEN=SEU_TOKEN_DA_API
BM_SQUAD_SERVERS=ID1,ID2,ID3
```

### 🔎 Onde pegar o token BattleMetrics?
Login → Account → API Access → *Create Token*

### 🎯 Onde pegar IDs de servidores?
Abra um servidor no BattleMetrics:

```
https://www.battlemetrics.com/servers/squad/1234567
                                      ↑ ID aqui
```

---

## 🧹 Limpeza Automática do Canal de Comandos

O bot **limpa automaticamente** o canal configurado **a cada X minutos**, definido em:

`src/constants.js`:

```js
const SQUAD_REFRESH_MS = 2 * 60 * 1000; // 2 minutos
```

Esse mesmo timer é usado como **cooldown do comando !squad**.

---

## 🛠 Painel de Configuração (`!config`)

### Ver configurações
```
!config show
```

### Definir canal de comandos
```
!config setchannel #comandos
```

### Remover canal de comandos
```
!config clearchannel
```

Configurações ficam salvas em:

```
data/guild-config.json
```

---

## 📡 Comando `!squad` (BattleMetrics)

Mostra os servidores configurados em `BM_SQUAD_SERVERS`, com:

- Status
- Players
- País
- Mapa
- Game Mode
- IP/Port

Formato estilo “Server Browser”.

---

## 🎼 Comandos de Música

- `!play <url | nome>`  
- `!skip`  
- `!stop`  
- `!queue`

Suporta:

- Fila por servidor  
- Busca automática por título  
- Streaming via yt-dlp  

---

## 🧠 Arquivo `constants.js`

Define valores globais usados em:

- Cooldown do `!squad`
- Timer de limpeza automática

---

## 🚀 Rodando o bot

```bash
npm start
```

---

## 🤝 Contribuições

Sinta‑se livre para enviar PRs ou sugestões!

---

## 📜 Licença

MIT License
