const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Returns a select Menu!"),
  async execute(interaction, client) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId("sub-menu")
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        new StringSelectMenuOptionBuilder({
          label: `Option 1`,
          value: `https://x.com/_CAK3D_`,
        }),
        new StringSelectMenuOptionBuilder({
          label: `Option 2`,
          value: `https://paypal.me/CAK3D?country.x=US&locale.x=en_US`,
        })
      );
    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
