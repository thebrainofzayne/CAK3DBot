module.exports = {
    customId: 'inputModal', // Modal identifier
    async execute(interaction) {
      const amount = parseInt(interaction.fields.getTextInputValue('amount'), 10);
  
      // If it's a deduction
      if (interaction.customId === 'deduct-amount') {
        const itemId = interaction.message.embeds[0].footer.text.split(' ')[2];
        const item = await InventoryItem.findById(itemId);
  
        if (!item) {
          return interaction.reply({
            content: 'Item not found.',
            ephemeral: true,
          });
        }
  
        // Deduct the amount
        if (amount <= 0 || amount > item.currentStock) {
          return interaction.reply({
            content: 'Invalid amount to deduct.',
            ephemeral: true,
          });
        }
  
        item.currentStock -= amount;
        await item.save();
  
        return interaction.reply({
          content: `Successfully deducted **${amount}** from the stock of **${item.title}**.`,
          ephemeral: true,
        });
      }
  
      // If it's a request for more stock
      if (interaction.customId === 'request-amount') {
        const itemId = interaction.message.embeds[0].footer.text.split(' ')[2];
        const item = await InventoryItem.findById(itemId);
  
        if (!item) {
          return interaction.reply({
            content: 'Item not found.',
            ephemeral: true,
          });
        }
  
        // Create a stock request entry
        const stockRequest = new StockRequest({
          itemId: item._id,
          requestedBy: interaction.user.id,
          requestedQuantity: amount,
          status: 'Pending',
        });
  
        await stockRequest.save();
  
        return interaction.reply({
          content: `Your request for **${amount}** of **${item.title}** has been submitted.`,
          ephemeral: true,
        });
      }
    },
  };
  