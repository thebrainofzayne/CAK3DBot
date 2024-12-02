module.exports = {
  date: {
    name: `sub-pay`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `https://paypal.me/CAK3D?country.x=US&locale.x=en_US`,
    });
  },
};
