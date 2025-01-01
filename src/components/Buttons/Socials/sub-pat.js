module.exports = {
  data: {
    name: `sub-pat`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `https://www.patreon.com/CAK3D`,
    });
  },
};
