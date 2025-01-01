const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs");
const chalk = require("chalk");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/Commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/Commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        try {
          const command = require(`../../Commands/${folder}/${file}`);
          commands.set(command.data.name, command);
          commandArray.push(command.data.toJSON());
          console.log(
            chalk.green(
              `Command: ✅ ${command.data.name} has been passed through the handler`
            )
          );
        } catch (error) {
          console.error(`❌ Error loading command file ${file}:`, error);
        }
      }
    }

    const clientId = "1310215574281785354";
    const guildId = "1113078006278275184";
    const rest = new REST({ version: "10" }).setToken(process.env.token);
    try {
      console.log(
        chalk.yellow("♻️ Started refreshing application (/) Commands.")
      );

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });
      console.log(
        chalk.green("✅ Successfully reloaded application (/) Commands.")
      );
    } catch (error) {
      console.error("❌ Failed to refresh commands:", error);
    }
  };
};
