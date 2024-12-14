const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = async () => {
    const currentTime = new Date().toLocaleString();
    const guild = client.guilds.cache.first();
    if (!guild) {
      console.log("Bot is not in any guild!");
      return;
    }
    const options = [
      {
        type: ActivityType.Watching,
        text: `over ${guild.name}`,
        status: "Online",
      },
      {
        type: ActivityType.Listening,
        text: "user commands",
        status: "Idle",
      },
      {
        type: ActivityType.Playing,
        text: `${guild.name} Livonia`,
        status: "Online",
      },
      {
        type: ActivityType.Playing,
        text: `${guild.name} Sakhal`,
        status: "Online",
      },
      {
        type: ActivityType.Streaming,
        text: `${guild.name} playbacks`,
        status: "Offline",
      },
      {
        type: ActivityType.Competing,
        text: "Quests",
        status: "Online",
      },
    ];
    const option = Math.floor(Math.random() * options.length);

    client.user.setPresence({
      activities: [
        {
          name: options[option].text,
          type: options[option].type,
        },
      ],
      status: options[option].status,
    });
    console.log(`Bot updated presence for ${guild.name} at ${currentTime}`);
  };
};
