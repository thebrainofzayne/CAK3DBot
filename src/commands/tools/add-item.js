const { SlashCommandBuilder } = require('discord.js');
const InventoryItem = require('../../schemas/inventoryItem');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add-item')
    .setDescription('Add a new item to the inventory')
    .addStringOption(option =>
      option.setName('title')
        .setDescription('The title of the item')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('description')
        .setDescription('Description of the item')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('category')
        .setDescription('Category of the item')
        .setRequired(true)
        .addChoices(
          { name: 'Mechanics', value: 'mechanics' },
          { name: 'Management', value: 'management' },
          { name: 'Technicians', value: 'technicians' },
          { name: 'Shop', value: 'shop' }
        ))
    .addIntegerOption(option =>
      option.setName('max-stock')
        .setDescription('Maximum stock for the item')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('min-stock')
        .setDescription('Minimum stock for the item')
        .setRequired(true)),

  async execute(interaction) {
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const category = interaction.options.getString('category');
    const maxStock = interaction.options.getInteger('max-stock');
    const minStock = interaction.options.getInteger('min-stock');

    // Prompt user to upload an image
    await interaction.reply({
      content: 'Please upload an image for the item. You have 60 seconds to respond.',
      ephemeral: true,
    });

    // Set up a message collector for the user response
    const filter = (message) => message.author.id === interaction.user.id && message.attachments.size > 0;
    const collector = interaction.channel.createMessageCollector({ filter, time: 60000, max: 1 });

    collector.on('collect', async (message) => {
      const attachment = message.attachments.first();

      // Validate the uploaded image type (only jpg, png, jpeg, gif)
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileExtension = attachment.name.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        return interaction.followUp({
          content: 'Please upload a valid image file (jpg, jpeg, png, or gif).',
          ephemeral: true,
        });
      }

      // Create a new inventory item with the uploaded image URL
      const newItem = new InventoryItem({
        title,
        description,
        category,
        imageURL: attachment.url, // Use the URL of the uploaded image
        maxStock,
        minStock,
        currentStock: minStock, // Set current stock to minimum initially
        pageNumber: 1, // Default to page 1
      });

      await newItem.save();

      return interaction.followUp({
        content: `Item **${title}** added to the inventory with the uploaded image!`,
        ephemeral: true,
      });
    });

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        interaction.followUp({
          content: 'You did not upload an image in time. Please try again.',
          ephemeral: true,
        });
      }
    });
  },
};
