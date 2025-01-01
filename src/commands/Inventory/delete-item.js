const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const InventoryItem = require('../../Schemas/InventoryItem');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete-item')
    .setDescription('Delete an item from the inventory'),

  async execute(interaction) {
    try {
      // Fetch all items from the database
      const items = await InventoryItem.find();

      if (items.length === 0) {
        return interaction.reply({
          content: 'No items are available in the inventory to delete.',
          ephemeral: true,
        });
      }

      // Create a select menu with items
      const menuOptions = items.map(item => ({
        label: item.title,
        description: item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description, // Only truncate if necessary
        value: item._id.toString(),
      }));

      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('delete-item-menu')
        .setPlaceholder('Select an item to delete')
        .addOptions(menuOptions);

      const row = new ActionRowBuilder().addComponents(selectMenu);

      // Send the select menu to the user
      await interaction.reply({
        content: 'Select an item to delete:',
        components: [row],
        ephemeral: true,
      });

      // Set up a collector to handle the user's selection
      const filter = i => i.customId === 'delete-item-menu' && i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', async i => {
        const selectedItemId = i.values[0];

        // Delete the selected item from the database
        try {
          const deletedItem = await InventoryItem.findByIdAndDelete(selectedItemId);

          if (deletedItem) {
            await i.update({
              content: `Item **${deletedItem.title}** has been deleted from the inventory.`,
              components: [], // Remove the select menu
              ephemeral: true,
            });
          } else {
            await i.update({
              content: 'Failed to delete the selected item. Please try again.',
              components: [],
              ephemeral: true,
            });
          }
        } catch (error) {
          console.error('Error deleting item:', error);
          await i.update({
            content: 'An error occurred while trying to delete the item. Please try again later.',
            components: [],
            ephemeral: true,
          });
        }
      });

      collector.on('end', (_, reason) => {
        if (reason === 'time') {
          interaction.editReply({
            content: 'You did not select an item in time. Please try again.',
            components: [],
          });
        }
      });
    } catch (error) {
      console.error('Error executing delete-item command:', error);
      interaction.reply({
        content: 'An error occurred while trying to delete the item. Please try again later.',
        ephemeral: true,
      });
    }
  },
};
