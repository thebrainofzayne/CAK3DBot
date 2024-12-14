const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("getAvatar")
    .setType(ApplicationCommandType.User),
  async execute(interaction) {
    try {
      const avatarURL = interaction.targetUser.displayAvatarURL({ format: "png", size: 1024 });

      // Embed the avatar in the response for better presentation
      const avatarEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(`${interaction.targetUser.username}'s Avatar`)
        .setImage(avatarURL)
        .setTimestamp()
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

      await interaction.reply({
        content: `Here is the avatar of **${interaction.targetUser.username}**:`,
        embeds: [avatarEmbed],
      });
    } catch (error) {
      console.error("Error fetching avatar:", error);
      await interaction.reply({
        content: "There was an error fetching the avatar. Please try again later.",
        ephemeral: true,
      });
    }
  },
};
