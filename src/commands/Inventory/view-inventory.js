const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const InventoryItem = require('../../Schemas/InventoryItem');
const StockRequest = require('../../Schemas/StockRequest'); // Make sure you import StockRequest schema

// Store current page for each user
const currentPages = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('view-inventory')
    .setDescription('View all items in the inventory'),

  async execute(interaction) {
    try {
      const items = await InventoryItem.find();

      if (items.length === 0) {
        return interaction.reply({
          content: 'The inventory is empty!',
          ephemeral: true,
        });
      }

      // Set current page to 0 if this is the user's first time interacting
      if (!currentPages.has(interaction.user.id)) {
        currentPages.set(interaction.user.id, 0);
      }

      let currentPage = currentPages.get(interaction.user.id);
      const totalPages = items.length;

      const generateEmbed = page => {
        const item = items[page];
        return new EmbedBuilder()
          .setTitle(item.title)
          .setDescription(item.description)
          .setColor('Blue')
          .addFields(
            { name: 'Category', value: item.category, inline: true },
            { name: 'Stock', value: `${item.currentStock}/${item.maxStock}`, inline: true }
          )
          .setImage(item.imageURL)
          .setFooter({ text: `Item ${page + 1} of ${totalPages}` });
      };

      const generateButtons = page => {
        return new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('prev')
            .setLabel('◀')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(page === 0),
          new ButtonBuilder()
            .setCustomId('manage')
            .setLabel('Manage Item')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId('next')
            .setLabel('▶')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(page === totalPages - 1)
        );
      };

      const message = await interaction.reply({
        embeds: [generateEmbed(currentPage)],
        components: [generateButtons(currentPage)],
        fetchReply: true,
      });

      const collector = message.createMessageComponentCollector({ time: 120000 });

      collector.on('collect', async i => {
        if (i.user.id !== interaction.user.id) {
          return i.reply({ content: "You can't interact with this menu.", ephemeral: true });
        }

        if (i.customId === 'prev') {
          currentPage--;
          currentPages.set(i.user.id, currentPage);  // Update the page in the map
        }
        if (i.customId === 'next') {
          currentPage++;
          currentPages.set(i.user.id, currentPage);  // Update the page in the map
        }

        if (i.customId === 'manage') {
          const item = items[currentPage];

          // Generate select menu for item management
          const manageMenu = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('manage-options')
              .setPlaceholder('Select an option...')
              .addOptions([
                {
                  label: 'Deduct from Stock',
                  description: 'Remove stock from this item',
                  value: 'deduct',
                },
                {
                  label: 'Request More Stock',
                  description: 'Request additional stock',
                  value: 'request',
                },
              ])
          );

          return i.update({
            content: `Managing item: **${item.title}**`,
            components: [manageMenu],
            embeds: [],
          });
        }

        const updatedEmbed = generateEmbed(currentPage);
        const updatedButtons = generateButtons(currentPage);

        await i.update({
          embeds: [updatedEmbed],
          components: [updatedButtons],
        });
      });

      collector.on('end', () => {
        const disabledButtons = generateButtons(currentPage).components.map(button =>
          button.setDisabled(true)
        );

        interaction.editReply({
          components: [new ActionRowBuilder().addComponents(disabledButtons)],
        });
      });
    } catch (error) {
      console.error('Error executing view-inventory command:', error);
      interaction.reply({
        content: 'An error occurred while fetching the inventory. Please try again later.',
        ephemeral: true,
      });
    }
  },
};



