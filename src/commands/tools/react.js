const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("react")
    .setDescription("Returns reactions"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      content: `React here!`,
      fetchReply: true,
    });

    const emoji = client.emojis.cache.find(
      (emoji) => emoji.id == "1147977543018893432"
    );

    message.react(emoji);
    message.react(`:call_me:`);

    const filter = (reaction, user) => {
      return (
        reaction.emoji.name == `:call_me: ` && user.id == interaction.user.id
      );
    };

    const collector = message.createReactionCollector({ filter, time: 15000 });

    collector.on("collect", (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });

    collector.on(`end`, (collected) => {
      console.log(`Collected ${collected.size} items`);
    });
  },
};
