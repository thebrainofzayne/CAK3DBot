const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: {
    customId: 'confirmation',
    type: 1,
  },
  execute(interaction) {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('yes')
          .setLabel('Yes')
          .setStyle('DANGER'),
        new MessageButton()
          .setCustomId('no')
          .setLabel('No')
          .setStyle('SUCCESS')
      );

    return interaction.update({ components: [row] });
  },
};
