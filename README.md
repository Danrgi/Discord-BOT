# 🎵 Discord Music Bot (Node.js + yt-dlp + ffmpeg)

Um **bot de música para Discord** moderno, utilizando:

-   **Node.js**
-   **discord.js**
-   **@discordjs/voice**
-   **yt-dlp** (streaming de áudio estável do YouTube)
-   **ffmpeg** (conversão do áudio)
-   **play-dl** (para buscar músicas e metadados)
-   Sistema modular de comandos em pastas

Funciona em qualquer servidor de Discord e suporta:

✔ `!play`\
✔ `!skip`\
✔ `!stop`\
✔ `!queue`\
✔ Fila de músicas por servidor\
✔ Busca por texto ou link do YouTube\
✔ Suporte para múltiplos servidores simultaneamente\
✔ Sistema de comandos modular

------------------------------------------------------------------------

## 📁 Estrutura do Projeto

    src/
      index.js
      config.js
      music/
        player.js
      commands/
        index.js
        music/
          play.js
          skip.js
          stop.js
          queue.js
    bin/
      yt-dlp.exe
    .env

------------------------------------------------------------------------

## ⚙️ Instalação

### 1. Clone o repositório

``` bash
git clone https://github.com/SEU_USUARIO/Discord-BOT.git
cd Discord-BOT
```

### 2. Instale as dependências

``` bash
npm install
```

Dependências principais:

``` bash
npm install discord.js @discordjs/voice play-dl ffmpeg-static
npm install @discordjs/opus   # ou opusscript se estiver em Windows
```

Se `@discordjs/opus` falhar no Windows, use:

``` bash
npm install opusscript
```

------------------------------------------------------------------------

## 🔥 Configuração

### 1. Crie o arquivo `.env` na raiz do projeto

    DISCORD_TOKEN=SEU_TOKEN_AQUI
    PREFIX=!

### 2. Instale o **yt-dlp**

Baixe aqui:\
https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe

Crie a pasta `bin/` na raiz e coloque o executável lá:

    bin/yt-dlp.exe

Se quiser definir manualmente o caminho no `.env`, adicione:

    YTDLP_PATH=C:/meu/caminho/yt-dlp.exe

------------------------------------------------------------------------

## ▶️ Rodando o bot

``` bash
npm start
```

Ou

``` bash
node src/index.js
```

------------------------------------------------------------------------

## 🧩 Modularidade

Os comandos estão em:

    src/commands/music/

Cada comando é um arquivo separado:

-   `play.js`
-   `skip.js`
-   `stop.js`
-   `queue.js`

Para adicionar um novo comando, basta criar um arquivo e registrá-lo em:

    src/commands/index.js

------------------------------------------------------------------------

## 🛠️ Tecnologias utilizadas

-   Node.js
-   discord.js
-   @discordjs/voice
-   ffmpeg-static
-   yt-dlp
-   play-dl

------------------------------------------------------------------------

## 🤝 Contribuições

Sinta-se livre para abrir issues e PRs.\
Todo código é bem-vindo!

------------------------------------------------------------------------

## 📝 Licença

MIT
