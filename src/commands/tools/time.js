const { SlashCommandBuilder, SlashCommandAssertions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("time")
    .setDescription("Replies with the database log time difference."),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `5 hours ahead in database`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
