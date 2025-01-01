const { StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  data: {
    customId: 'actionMenu',
    type: 3,
  },
  execute(interaction) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId('actionMenu')
      .setPlaceholder('Select an action')
      .addOptions([
        { label: 'Deduct', value: 'deduct' },
        { label: 'Request', value: 'request' },
        { label: 'Order', value: 'order' },
      ]);

    return interaction.update({ components: [menu] });
  },
};
