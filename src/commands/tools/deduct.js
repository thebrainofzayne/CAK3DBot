const { SlashCommandBuilder } = require('discord.js');
const InventoryItem = require('../../schemas/inventoryItem');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deduct')
    .setDescription('Deduct items from inventory')
    .addStringOption(option =>
      option.setName('item')
        .setDescription('The item to deduct')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Amount to deduct')
        .setRequired(true)),

  async execute(interaction) {
    const itemName = interaction.options.getString('item');
    const amount = interaction.options.getInteger('amount');

    const item = await InventoryItem.findOne({ title: itemName });
    if (!item) {
      return interaction.reply("Item not found.");
    }

    if (amount <= 0) {
      return interaction.reply("You must deduct a positive amount.");
    }

    if (item.currentStock - amount < item.minStock) {
      return interaction.reply("Cannot deduct below minimum stock level.");
    }

    try {
      item.currentStock -= amount;
      await item.save();
      return interaction.reply(`${amount} ${itemName} deducted from inventory.`);
    } catch (error) {
      console.error(error);
      return interaction.reply("An error occurred while updating the inventory.");
    }
  },
};
