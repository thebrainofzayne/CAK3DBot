const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("link-name")
    .setDescription("Link your name and create a private channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const linkedRoleId = "1322078933130149951";
    const managementRoleId = "1297029052955103338";

    // Check if the user has the linked role
    const linkedRole = interaction.guild.roles.cache.get(linkedRoleId);
    if (!linkedRole) {
      return interaction.reply("Linked role not found.");
    }

    // Create a modal for user input
    const modal = new ModalBuilder()
      .setCustomId("linkNameModal")
      .setTitle("Link Your Name");

    const firstNameInput = new TextInputBuilder()
      .setCustomId("firstName")
      .setLabel("First Name")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const lastNameInput = new TextInputBuilder()
      .setCustomId("lastName")
      .setLabel("Last Name")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const firstActionRow = new ActionRowBuilder().addComponents(firstNameInput);
    const secondActionRow = new ActionRowBuilder().addComponents(lastNameInput);

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);

    // Handle modal submission
    const filter = (i) => i.customId === "linkNameModal" && i.user.id === interaction.user.id;
    const submittedInteraction = await interaction.awaitModalSubmit({ filter, time: 60000 }).catch(() => null);

    if (!submittedInteraction) {
      return interaction.followUp("You did not provide your name in time.");
    }

    const firstName = submittedInteraction.fields.getTextInputValue("firstName");
    const lastName = submittedInteraction.fields.getTextInputValue("lastName");

    // Change the user's nickname
    const nickname = `${firstName} ${lastName.charAt(0)}.`;
    await interaction.member.setNickname(nickname).catch(console.error);

    // Add the linked role to the user
    await interaction.member.roles.add(linkedRole).catch(console.error);

    // Create a private channel for the user
    const channel = await interaction.guild.channels.create({
      name: `${firstName}-${lastName}`,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: linkedRoleId,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
        },
        {
          id: managementRoleId,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
        },
        {
          id: interaction.member.id,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
        },
      ],
    });

    await submittedInteraction.reply({
      content: `Your name has been linked as ${nickname}. A private channel has been created for you: ${channel}.`,
      ephemeral: true,
    });
  },
};