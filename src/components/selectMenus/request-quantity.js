const StockRequest = require('../../schemas/stockRequest');
const InventoryItem = require('../../schemas/inventoryItem'); // Make sure it's capitalized and used consistently

module.exports = {
  customId: 'request-quantity', // Matches the select menu custom ID from the view-inventory command

  async execute(interaction, client) {
    try {
      // Ensure we have a valid quantity selection
      const quantity = parseInt(interaction.values[0], 10); // Get the quantity selected from the menu

      // Get the itemId from the customId or context (preferably passed through a message component context)
      const itemId = interaction.message.interaction.customId.split('-')[0]; // Assuming customId contains itemId in a known format
      
      const item = await InventoryItem.findById(itemId);

      if (!item) {
        return interaction.reply({
          content: 'The item could not be found. Please try again.',
          ephemeral: true,
        });
      }

      if (isNaN(quantity) || quantity <= 0) {
        return interaction.reply({
          content: 'Please select a valid quantity.',
          ephemeral: true,
        });
      }

      // Check if the quantity is greater than available stock
      if (item.currentStock < quantity) {
        return interaction.reply({
          content: `Insufficient stock available. Only **${item.currentStock}** of **${item.title}** are in stock.`,
          ephemeral: true,
        });
      }

      // Create the stock request entry
      const stockRequest = new StockRequest({
        itemId: item._id,
        requestedBy: interaction.user.id,
        requestedQuantity: quantity,
        status: 'pending', // Customize status as needed
      });

      await stockRequest.save();

      // Send confirmation message to the user
      await interaction.reply({
        content: `Your request for **${quantity}** of **${item.title}** has been noted.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error handling request-quantity:', error);
      await interaction.reply({
        content: 'There was an error processing your request. Please try again later.',
        ephemeral: true,
      });
    }
  },
};
