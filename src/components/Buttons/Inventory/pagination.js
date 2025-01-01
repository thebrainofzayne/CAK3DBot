const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: {
    customId: 'pagination',
    type: 1,
  },
  execute(interaction) {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('previous')
          .setLabel('Previous')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId('make_selection')
          .setLabel('Make Selection')
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId('next')
          .setLabel('Next')
          .setStyle('PRIMARY')
      );

    return interaction.update({ components: [row] });
  },
};
