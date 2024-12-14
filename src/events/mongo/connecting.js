const chalk = require("chalk");

module.exports = {
  name: "connecting",
  async execute() {
    const currentTime = new Date().toLocaleString();
    console.log(
      chalk.yellow(`
      CONSOLE LOG : ${currentTime}
      [Database Status]: Connecting . . .
      Queue processes . . .
      `)
    );
  },
};
