module.exports = {
  date: {
    name: `sub-fb`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `https://www.facebook.com/profile.php?id=61569344205362`,
    });
  },
};
