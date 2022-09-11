import {
  Client,
  SlashCommandBuilder,
  SlashCommandStringOption,
  REST,
} from "discord.js";
import { readdir } from "fs/promises";

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

const buildSlashCommand = (option) => {
  const choices =
    option.choices?.map((choice) => {
      return {
        name: choice.name,
        value: choice.value,
      };
    }) || [];

  return new SlashCommandStringOption()
    .setName(option.name)
    .setDescription(option.description)
    .setRequired(option.required)
    .addChoices(...choices);
};

export default async (client: Client) => {
  const commands = await readdir("./src/commands");
  // remove index.ts from the array
  commands.splice(commands.indexOf("index.ts"), 1);

  for (const command of commands) {
    const { default: commandModule } = await import(
      `../commands/${command}/specs`
    );

    const data = new SlashCommandBuilder()
      .setName(commandModule.name)
      .setDescription(commandModule.description);

    if (commandModule.options) {
      for (const option of commandModule.options) {
        data.addStringOption(buildSlashCommand(option));
      }
    }

    await client.application?.commands.create(data);
  }
};
