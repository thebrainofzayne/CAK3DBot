require("dotenv").config();
const { token, databaseToken } = process.env;
const { connect } = require("mongoose");
const {
  Client,
  Collection,
  IntentsBitField,
  GatewayIntentBits,
} = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    32767,
  ],
});

client.on("ready", (c) => {
  console.log(`🍃 ${c.user.tag} is getting baked . . .`);
});

client.on("messageCreate", (message) => {
  console.log(message.content);
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  console.log(folder);
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
connect(databaseToken).catch(console.error);
(async () => {
  await connect(databaseToken).catch(console.error);
})();
