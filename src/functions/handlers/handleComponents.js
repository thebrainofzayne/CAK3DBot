const { readdirSync } = require("fs");
const chalk = require("chalk");

module.exports = (client) => {
  client.handleComponents = async () => {
    const componentFolders = readdirSync(`./src/Components`);
    for (const folder of componentFolders) {
      const componentFiles = readdirSync(`./src/Components/${folder}`).filter(
        (file) => file.endsWith(".js")
      );

      const { buttons, selectMenus, modals } = client;

      switch (folder) {
        case "Buttons":
          for (const file of componentFiles) {
            const button = require(`../../Components/${folder}/${file}`);
            // Error handling for button data
            if (button && button.data && button.data.name) {
              buttons.set(button.data.name, button);
            } else {
              console.error(
                chalk.yellow(
                  `[Button Warning]: Button or Data is undefined or missing:`
                ),
                button
              );
            }

            console.log(
              chalk.blueBright(
                `Button: ${button.data.name} has been passed through the handler`
              )
            );
          }
          break;

        case "SelectMenus":
          for (const file of componentFiles) {
            const menu = require(`../../Components/${folder}/${file}`);
            selectMenus.set(menu.data.name, menu);
            console.log(
              chalk.greenBright(
                `SelectMenu: ${menu.data.name} has been passed through the handler`
              )
            );
          }
          break;

        case "Modals":
          for (const file of componentFiles) {
            const modal = require(`../../Components/${folder}/${file}`);
            modals.set(modal.data.name, modal);
            console.log(
              chalk.magentaBright(
                `Modal: ${modal.data.name} has been passed through the handler`
              )
            );
          }
          break;

        default:
          break;
      }
    }
  };
};
