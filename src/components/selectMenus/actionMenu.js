const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
  data: {
    customId: 'actionMenu',
    type: 1,  // Action row type
  },

  async execute(interaction) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId('actionMenu')
      .setPlaceholder('Select an action')
      .addOptions([
        { label: 'Deduct', value: 'deduct' },
        { label: 'Request', value: 'request' },
        { label: 'Order', value: 'order' },
      ]);

    // Create an action row with the select menu
    const row = new ActionRowBuilder().addComponents(menu);

    return interaction.update({ components: [row] });
  },
};
