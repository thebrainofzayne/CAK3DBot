module.exports = {
    data: {
      customId: 'inputModal',
      title: 'Input Modal',
    },
    execute(interaction) {
      const amount = interaction.fields.getTextInputValue('amount');
      return interaction.reply(`You entered: ${amount}`);
    },
  };
  