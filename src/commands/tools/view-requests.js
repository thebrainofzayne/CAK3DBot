const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const StockRequest = require('../../schemas/stockRequest');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('view-requests')
    .setDescription('View all pending stock requests'),

  async execute(interaction) {
    try {
      const requests = await StockRequest.find({ status: 'Pending' }).populate('itemId');
      
      if (requests.length === 0) {
        return interaction.reply({
          content: 'No pending stock requests at the moment.',
          ephemeral: true,
        });
      }

      // Pagination setup
      const requestsPerPage = 5;
      let currentPage = 0;
      const totalPages = Math.ceil(requests.length / requestsPerPage);

      const generateEmbed = (page) => {
        const requestList = requests
          .slice(page * requestsPerPage, (page + 1) * requestsPerPage)
          .map(req => {
            // Check if createdAt exists and format it, otherwise return a default value
            const requestDate = req.createdAt ? req.createdAt.toLocaleDateString() : 'N/A';

            return `**${req.itemId.title}** (Requested by: <@${req.requestedBy}>) - Quantity: ${req.requestedQuantity} - Date: ${requestDate}`;
          });

        return new EmbedBuilder()
          .setTitle('Pending Stock Requests')
          .setColor('#0000FF') // Blue color code
          .setDescription(requestList.join('\n'))
          .setFooter({ text: `Page ${page + 1} of ${totalPages}` });
      };

      const generateButtons = (page) => {
        return new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('prev')
            .setLabel('◀')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(page === 0),
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
        } else if (i.customId === 'next') {
          currentPage++;
        }

        await i.update({
          embeds: [generateEmbed(currentPage)],
          components: [generateButtons(currentPage)],
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
      console.error('Error fetching stock requests:', error);
      interaction.reply({
        content: 'There was an error retrieving the stock requests. Please try again later.',
        ephemeral: true,
      });
    }
  },
};
