const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("paybutton")
      .setDescription("Returns a PayPal button!"),
    async execute(interaction, client) {
      const button = new ButtonBuilder()
        .setCustomId("sub-pay")
        .setLabel("Click!")
        .setStyle(ButtonStyle.Primary);
  
      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(button)],
      });
    },
  };
  