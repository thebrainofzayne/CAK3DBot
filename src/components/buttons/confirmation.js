const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: {
    customId: 'confirmation',
    type: 1,
  },

  async execute(interaction) {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('yes')
          .setLabel('Yes')
          .setStyle('DANGER'),
        new MessageButton()
          .setCustomId('no')
          .setLabel('No')
          .setStyle('SUCCESS')
      );

    await interaction.update({ content: 'Are you sure you want to proceed?', components: [row] });

    // Set up a filter to only allow the user who initiated the interaction to respond
    const filter = (i) => i.user.id === interaction.user.id;
    
    // Set up the collector to handle user responses
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async (i) => {
      if (i.customId === 'yes') {
        // Handle the "Yes" response (e.g., confirm an action)
        await i.update({ content: 'Action confirmed!', components: [] });
      } else if (i.customId === 'no') {
        // Handle the "No" response (e.g., cancel the action)
        await i.update({ content: 'Action canceled.', components: [] });
      }

      collector.stop(); // Stop the collector after the user responds
    });

    collector.on('end', (_, reason) => {
      if (reason === 'time') {
        // Disable buttons if the user takes too long to respond
        interaction.editReply({
          content: 'Confirmation timed out.',
          components: [],
        });
      }
    });
  },
};
