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
const { Guilds, GuildMessages , GuildBans, GuildEmojis, GuildWebhooks } = GatewayIntentBits
const client = new Client({ intents: 32767 });

client.color = "#1F8B4C";
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

client.on("ready", (c) => {
  console.log(`🍃 ${c.user.tag} is getting baked . . .`);
});

const functionFolders = fs.readdirSync(`./src/Functions`);
for (const folder of functionFolders) {
  console.log(folder);
  const functionFiles = fs
    .readdirSync(`./src/Functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles)
    require(`./Functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
(async () => {
await connect(databaseToken).catch(console.error);
})();
