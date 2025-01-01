const { InteractionType, TextInputStyle } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const currentTime = new Date().toLocaleString()
    
    if (interaction.isCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        console.log(
          chalk.bgGreen(`[Command]: ${interaction.user.tag} executed ${commandName} at ${currentTime}`)
        );
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        if (!interaction.replied) {
        await interaction.reply({
          content: console.warn(
            chalk.yellow(`[⚠️ Command Warning ⚠️]: Command ${commandName} not found at ${currentTime}`)
          ),
          ephemeral: true,
        });
      }
    }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return;

      try {
        console.log(
          chalk.bgBlue(`[Button]: ${interaction.user.tag} clicked ${customId} at ${currentTime}`)
        );
        await button.execute(interaction, client);
      } catch (err) {
        console.error(err);
        if (!interaction.replied) {
        await interaction.reply({
          content: console.warn(
            chalk.yellow(`[⚠️ Button Warning ⚠️]: Button ${customId} not found at ${currentTime}`)
          ),
          ephemeral: true,
          });
          }
      }
    } else if (interaction.isStringSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);
      if (!menu) return;

      try {
        console.log(
          chalk.bgMagenta(`[SelectMenu]: ${interaction.user.tag} selected ${customId} at ${currentTime}`)
        );
        await menu.execute(interaction, client);
      } catch (err) {
        console.error(err);
        if (!interaction.replied) {
        await interaction.reply({
          content: console.warn(
            chalk.yellow(`[⚠️ SelectMenu Warning ⚠️]: Menu ${customId} not found at ${currentTime}`)
          ),
          ephemeral: true,
          });
          }
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return;

      try {
        console.log(
          chalk.bgCyan(`[Modal]: ${interaction.user.tag} submitted ${customId} at ${currentTime}`)
        );
        await modal.execute(interaction, client);
      } catch (err) {
        console.error(err);
        if (!interaction.replied) {
        await interaction.reply({
          content: console.warn(
            chalk.yellow(`[⚠️ Modal Warning ⚠️]: Modal ${customId} not found at ${currentTime}`)
          ),
          ephemeral: true,
          });
          }
      }
    } else if (interaction.isContextMenuCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const contextCommand = commands.get(commandName);
      if (!contextCommand) return;

      try {
        console.log(
          chalk.bgWhite(`[ContextMenu]: ${interaction.user.tag} submitted ${customId} at ${currentTime}`)
        );
        await contextCommand.execute(interaction, client);
      } catch (err) {
        console.error(err);
        if (!interaction.replied) {
        await interaction.reply({
          content: console.warn(
            chalk.yellow(`[⚠️ ContextMenu Warning ⚠️]: Command ${commandName} not found at ${currentTime}`)
          ),
          ephemeral: true,
          });
          }
      }
    } else if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.autocomplete(interaction, client);
      } catch (err) {
        console.error(err);
        if (!interaction.replied) {
        await interaction.reply({
          content: console.warn(
            chalk.yellow(`[⚠️ Autocomplete Warning ⚠️]: Autocomplete not complete. Submitted at ${currentTime}`)
          ),
          ephemeral: true,
          });
          }
      }
    }
  },
};
