const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("patbutton")
      .setDescription("Returns a Patrion button!"),
    async execute(interaction, client) {
      const button = new ButtonBuilder()
        .setCustomId("sub-pat")
        .setLabel("Click!")
        .setStyle(ButtonStyle.Primary);
  
      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(button)],
      });
    },
  };
  