const { SlashCommandBuilder } = require('discord.js');
const InventoryItem = require('../../schemas/inventoryItem');

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

    try {
      const item = await InventoryItem.findOne({ title: itemName });

      if (!item) {
        return interaction.reply("Item not found.");
      }

      // Check if the new stock exceeds max stock limit
      if (item.currentStock + amount > item.maxStock) {
        return interaction.reply({
          content: `Cannot order ${amount} more of **${itemName}** as it would exceed the maximum stock limit of ${item.maxStock}.`,
          ephemeral: true,
        });
      }

      // Add the ordered amount to the stock
      item.currentStock += amount;
      await item.save();

      return interaction.reply(`${amount} of **${itemName}** ordered and added to stock. Current stock: ${item.currentStock}`);
    } catch (error) {
      console.error("Error ordering stock:", error);
      return interaction.reply({
        content: "There was an error ordering the stock. Please try again later.",
        ephemeral: true,
      });
    }
  },
};
