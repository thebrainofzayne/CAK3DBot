const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("xbutton")
    .setDescription("Returns a X button!"),
  async execute(interaction, client) {
    const button = new ButtonBuilder()
      .setCustomId(`sub-x`)
      .setLabel(`Click!`)
      .setStyle(ButtonStyle.Primary);

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(button)],
    });
  },
};
