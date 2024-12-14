const { InteractionType } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const currentTime = new Date().toLocaleString();
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        console.log(
          chalk.green(`[Command]: ${commandName} executed at ${currentTime}`)
        );
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing that command!",
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("Button not found.");

      try {
        console.log(
          chalk.green(`[Button]: ${customId} clicked at ${currentTime}`)
        );
        await button.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    } else if (interaction.isStringSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);
      if (!menu) return new Error("Select menu not found.");

      try {
        console.log(
          chalk.green(`[SelectMenu]: ${customId} selected at ${currentTime}`)
        );
        await menu.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error("Modal not found.");

      try {
        console.log(
          chalk.green(`[Modal]: ${customId} submitted at ${currentTime}`)
        );
        await modal.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    } else if (interaction.isContextMenuCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const contextCommand = commands.get(commandName);
      if (!contextCommand) return;

      try {
        await contextCommand.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    }
  },
};
