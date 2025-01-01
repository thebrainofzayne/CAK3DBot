const { SlashCommandBuilder } = require('discord.js');
const InventoryItem = require('../../Schemas/InventoryItem');

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

    if (item.currentStock - amount < item.minStock) {
      return interaction.reply("Cannot deduct below minimum stock level.");
    }

    item.currentStock -= amount;
    await item.save();

    return interaction.reply(`${amount} ${itemName} deducted from inventory.`);
  },
};
