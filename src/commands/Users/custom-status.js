const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('custom-status')
    .setDescription('Set a custom presence for the bot')
    .addStringOption(option =>
      option.setName('type')
        .setDescription('Type of presence (Watching, Listening, Playing)')
        .setRequired(true)
        .addChoices(
          { name: 'Watching', value: 'WATCHING' },
          { name: 'Listening', value: 'LISTENING' },
          { name: 'Playing', value: 'PLAYING' }
        ))
    .addStringOption(option =>
      option.setName('text')
        .setDescription('The status text to display')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('duration')
        .setDescription('Duration in minutes for the custom status')
        .setRequired(true)),

  async execute(interaction, client) {
    const type = interaction.options.getString('type');
    const text = interaction.options.getString('text');
    const duration = interaction.options.getInteger('duration');

    // Set the custom presence
    await interaction.reply(`Setting custom status: ${text} (${type}) for ${duration} minutes.`);

    client.user.setPresence({
      activities: [{ name: text, type: type }],
      status: 'online',
    });

    // Convert duration from minutes to milliseconds
    const durationInMs = duration * 60 * 1000;

    // Reset to default presence after the duration
    setTimeout(() => {
      // Reset to the default presence (you can customize this as needed)
      client.pickPresence(); // Assuming you have a function to reset to normal presence
      console.log(`Custom status reset after ${duration} minutes.`);
    }, durationInMs);
  },
};