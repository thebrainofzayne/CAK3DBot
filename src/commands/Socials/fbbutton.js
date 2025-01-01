const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("fbbutton")
      .setDescription("Returns a Facebook button!"),
    async execute(interaction, client) {
      const button = new ButtonBuilder()
        .setCustomId("sub-fb")
        .setLabel("Click!")
        .setStyle(ButtonStyle.Primary);
  
      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(button)],
      });
    },
  };
  