const InventoryItem = require('../../Schemas/InventoryItem'); // Import the schema

module.exports = {
  data: {
    name: 'delete-item-select',
    customId: 'delete-item-select',
  },

  async execute(interaction) {
    try {
      // Get the selected item's ID
      const itemId = interaction.values[0];

      // Find and delete the item from the database
      const deletedItem = await InventoryItem.findByIdAndDelete(itemId);

      if (!deletedItem) {
        return interaction.reply({
          content: 'The selected item could not be found. Please try again.',
          ephemeral: true,
        });
      }

      return interaction.update({
        content: `Item **${deletedItem.title}** has been successfully deleted.`,
        components: [], // Remove the select menu after selection
      });
    } catch (error) {
      console.error('Error while deleting item:', error);
      return interaction.reply({
        content: 'There was an error while deleting the item. Please try again later.',
        ephemeral: true,
      });
    }
  },
};
