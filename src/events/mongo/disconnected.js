const chalk = require("chalk");

module.exports = {
  name: "disconnected",
  execute() {
    const currentTime = new Date().toLocaleString();
    console.log(chalk.red(`
      CONSOLE LOG : ${currentTime}
      [Database Status]: Disconnected.
      Unable to process requests . . .
      `));
  },
};
