import { Command } from "commander";
import chalk from "chalk";
import axios from "axios";

const program = new Command();
const accent = chalk.greenBright;

program
  .name("platypus")
  .version("0.1.0")
  .usage("[options or commands] arguments")
  .description("Command line tool and library for transferring data with URL syntax")
  .option("-g, --get <value>", "make a get request to a url")
  .configureHelp({
    optionTerm: (option) => accent(option.flags),
    subcommandTerm: (cmd) => accent(cmd.name(), cmd.usage()),
    argumentTerm: (arg) => accent(arg.name()),
  })
  .addHelpCommand(false)
  .showHelpAfterError(true)
  .parse(process.argv);

const options = program.opts();

const performGetRequest = (url: string) => {
  axios.get(url)
    .then(function (response) {
      console.log(response.data);
    });
}

if(options.get)
{
  performGetRequest(process.argv[3]);
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
}