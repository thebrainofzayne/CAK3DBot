const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("await-react")
    .setDescription("Returns await reactions"),
  async execute(interaction, client) {
    const message = await interaction.reply({
      content: "React here . . .",
      fetchReply: true,
    });

    const filter = (reaction, user) => {
      return reaction.emoji.name === "🤙" && user.id == interaction.user.id;
    };

    message
      .awaitReactions({ filter, max: 5, time: 60000, errors: ["time"] })
      .then((collected) => console.log(collected.size))
      .catch((collected) => {
        console.log(
          "After ONE minute, only ${collected.size} out of 5 reacted."
        );
      });
  },
};
