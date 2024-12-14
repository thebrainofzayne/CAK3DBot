const chalk = require("chalk");

module.exports = {
  name: "connected",
  execute() {
    const currentTime = new Date().toLocaleString();
    console.log(
      chalk.green(`
      CONSOLE LOG : ${currentTime}
      [Database Status]: Connected!
      Ready to process requests . . .
      `)
    );
  },
};
