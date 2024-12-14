const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const InventoryItem = require('../../schemas/inventoryItem');
const StockRequest = require('../../schemas/stockRequest'); 

module.exports = {
  customId: 'manage-options',

  async execute(interaction) {
    const itemId = interaction.message.embeds[0].footer.text.split(' ')[2]; // Extract the itemId from the footer
    const item = await InventoryItem.findById(itemId);

    if (!item) {
      return interaction.reply({
        content: 'Item not found!',
        ephemeral: true,
      });
    }

    if (interaction.values[0] === 'deduct') {
      // Deduct from stock
      const deductAmountModal = new ActionRowBuilder()
        .addComponents(new TextInputComponent()
          .setCustomId('deduct-amount')
          .setLabel('Amount to Deduct')
          .setStyle('SHORT')
          .setRequired(true));

      return interaction.showModal(deductAmountModal);
    }

    if (interaction.values[0] === 'request') {
      // Request more stock
      const requestAmountModal = new ActionRowBuilder()
        .addComponents(new TextInputComponent()
          .setCustomId('request-amount')
          .setLabel('Amount to Request')
          .setStyle('SHORT')
          .setRequired(true));

      return interaction.showModal(requestAmountModal);
    }
  },
};
