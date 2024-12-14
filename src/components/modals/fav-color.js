module.exports = {
  data: {
    name: `fav-color`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `Your color of choice is ${interaction.fields.getTextInputValue(
        "favColorInput"
      )}`,
    });
  },
};
