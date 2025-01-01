const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("disbutton")
      .setDescription("Returns a Discord button!"),
    async execute(interaction, client) {
      const button = new ButtonBuilder()
        .setCustomId("sub-dis")
        .setLabel("Click!")
        .setStyle(ButtonStyle.Primary);
  
      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(button)],
      });
    },
  };
  