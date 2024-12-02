const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Returns a modal."),
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId("fav-color")
      .setTitle("What's your favorite color?");

    const textInput = new TextInputBuilder()
      .setCustomId("favColorInput")
      .setLabel("Enter your favorite color")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    modal.addComponents(new ActionRowBuilder().addComponents(textInput));
    await interaction.showModal(modal);
  },
};
