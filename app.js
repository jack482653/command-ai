#!/usr/bin/env node

const { program } = require('commander');
const Config = require("./Config");
const { openAIApi, OpenAICommand } = require("./OpenAICommand");

program
  .option('-p, --prompt <prompt>', 'Send a prompt to OpenAI API')
  .option('--fate', 'Tell me my fate today')
  .option('--add-token <token>', 'Add access token to configuration')
  .option('--remove-token', 'Remove access token from configuration')
  .parse(process.argv);

const options = program.opts()

if (options.addToken) {
  Config.update('ACCESS_TOKEN', options.addToken);

  console.log('Access token added to configuration');
} else if (options.removeToken) {
  Config.removeConfig();

  console.log('Access token removed from configuration');
} else if (options.prompt) {
  const openAICommand = new OpenAICommand(openAIApi);

  openAICommand.createCompletion(options.prompt).then((answer) => {
    console.log(answer);
  }).catch((error) => {
    console.error('Oops, something went wrong:', error.message);
  });
} else if (options.fate) {
  const openAICommand = new OpenAICommand(openAIApi);

  openAICommand.tellMeMyFate().then((answer) => {
    console.log(answer);
  }).catch((error) => {
    console.error('Oops, something went wrong:', error.message);
  });
} else {
  console.error('Please specify a valid command');
  program.help();
}
