const { SlashCommandBuilder } = require('discord.js');
const InventoryItem = require('../../Schemas/InventoryItem');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('request')
    .setDescription('Request an item from inventory')
    .addStringOption(option =>
      option.setName('item')
        .setDescription('The item to request')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Amount to request')
        .setRequired(true)),

  async execute(interaction) {
    const itemName = interaction.options.getString('item');
    const amount = interaction.options.getInteger('amount');

    const item = await InventoryItem.findOne({ title: itemName });
    if (!item) {
      return interaction.reply("Item not found.");
    }

    if (item.currentStock <= 0) {
      return interaction.reply(`Item ${itemName} is out of stock.`);
    }

    if (item.currentStock - amount < 0) {
      return interaction.reply(`Insufficient stock to request ${amount} ${itemName}.`);
    }

    // Create request confirmation here
    interaction.reply(`Request for ${amount} ${itemName} received.`);
  },
};
