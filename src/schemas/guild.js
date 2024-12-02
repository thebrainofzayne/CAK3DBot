const { Schema, model } = require("mongoose");
const guildSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: { type: String, required: true },
  guildName: { type: String, required: true },
  guildIcon: { type: String, required: false },
});

module.exports = model("Guild", guildSchema, "guilds");
