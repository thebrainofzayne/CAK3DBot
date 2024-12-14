const chalk = require("chalk");

module.exports = {
  name: "error",
  execute(err) {
    const currentTime = new Date().toLocaleString();
    console.log(
      chalk.cyan(`
      CONSOLE LOG : ${currentTime}
      [Database Status]: ERROR ! ! !
      An ERROR occured with the database connection:
      \n${err}
      `)
    );
  },
};
