import { Client, Events, GatewayIntentBits } from 'discord.js';
import { codeBlock } from '@discordjs/formatters';
import { DISCORD_CHANNEL_ID_DEV, DISCORD_CHANNEL_ID_PROD, DISCORD_REFRESH_TOKEN_BOT } from '../env';
import { IS_PROD } from '../constants';

class DiscordService {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    this.channelId = IS_PROD ? DISCORD_CHANNEL_ID_PROD : DISCORD_CHANNEL_ID_DEV;

    this.client.on(Events.ClientReady, () => {
      console.log(`Ready! Logged in as ${this.client.user.tag}`);
    });

    this.client.login(DISCORD_REFRESH_TOKEN_BOT);
  }

  sendToFormatCode(logData) {
    // const { title = 'Error!', message = 'Message', ...code } = logData;

    // const codeMessage = {
    //   content: message,
    //   embeds: [
    //     {
    //       color: parseInt('00ff00', 16),
    //       title,
    //       description: `\`\`\`json\n${JSON.stringify(code, null, 2)}\n\`\`\``,
    //     },
    //   ],
    // };

    this.sendToMessage(codeBlock(JSON.stringify(logData, null, 2)));
  }

  sendToMessage(message) {
    const channel = this.client.channels.cache.get(this.channelId);
    if (!channel) {
      console.error(`Couldn't find the channel: ${this.channelId}`);
      return;
    }

    channel.send(message).catch((error) => console.error(error));
  }
}

export default new DiscordService();
