const { SlashCommandBuilder } = require('discord.js');
const InventoryItem = require('../../schemas/inventoryItem');

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

    try {
      // Corrected model reference
      const item = await InventoryItem.findOne({ title: itemName });

      if (!item) {
        return interaction.reply("Item not found.");
      }

      // Check if the item is out of stock
      if (item.currentStock <= 0) {
        return interaction.reply(`Item **${itemName}** is out of stock.`);
      }

      // Check if there is enough stock to fulfill the request
      if (item.currentStock - amount < item.minStock) {
        return interaction.reply(`Insufficient stock to request **${amount}** of **${itemName}**. Only ${item.currentStock} available.`);
      }

      // Deduct the requested amount from the current stock
      item.currentStock -= amount;
      await item.save();

      // Send a confirmation message to the user
      interaction.reply(`Request for **${amount}** of **${itemName}** received.`);

      // Here, you can add logic to notify the management or send an embed with the request details
      // For now, we'll simulate sending the request to a management channel
      const managementChannel = interaction.guild.channels.cache.find(ch => ch.name === 'management'); // Change this to your management channel's name
      if (managementChannel) {
        managementChannel.send({
          content: `Request for **${amount}** of **${itemName}** received from **${interaction.user.username}**. Current stock: **${item.currentStock}**.`,
        });
      } else {
        console.log("Management channel not found.");
      }

    } catch (error) {
      console.error('Error executing request command:', error);
      interaction.reply({
        content: 'An error occurred while processing your request. Please try again later.',
        ephemeral: true,
      });
    }
  },
};
