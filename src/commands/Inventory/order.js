const { SlashCommandBuilder } = require('discord.js');
const InventoryItem = require('../../Schemas/InventoryItem');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('order')
    .setDescription('Order new stock for an item')
    .addStringOption(option =>
      option.setName('item')
        .setDescription('The item to reorder')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Amount of stock to order')
        .setRequired(true)),

  async execute(interaction) {
    const itemName = interaction.options.getString('item');
    const amount = interaction.options.getInteger('amount');

    const item = await InventoryItem.findOne({ title: itemName });
    if (!item) {
      return interaction.reply("Item not found.");
    }

    item.currentStock += amount;
    await item.save();

    return interaction.reply(`${amount} ${itemName} ordered and added to stock.`);
  },
};
