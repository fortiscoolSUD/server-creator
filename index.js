const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const prefix = '!';

client.on('ready', () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const [command, action, ...args] = message.content.slice(prefix.length).split(' ');

  if (command === 'create') {
    if (action === 'channel') {
      const channelName = args.join(' ');
      await message.guild.channels.create({
        name: channelName,
        type: 0 // 0 = text, 2 = voice
      });
      message.reply(`✅ Channel "${channelName}" created.`);
    } else if (action === 'role') {
      const roleName = args.join(' ');
      await message.guild.roles.create({ name: roleName });
      message.reply(`✅ Role "${roleName}" created.`);
    }
  }

  if (command === 'send' && action === 'welcome') {
    const msg = args.join(' ');
    message.channel.send(`👋 ${msg}`);
  }
});

client.login('YOUR_BOT_TOKEN');
