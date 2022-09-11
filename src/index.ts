import { Client } from "discord.js";
import "dotenv/config";
import setupMongo from "./helpers/setupMongo";
import setupAgenda from "./helpers/setupAgenda";
import { Job } from "agenda";
import guildCreate from "./events/guildCreate";
import registerCommand from "./discord/registerCommand";
import handleCommands from "./commands";
import { RAID_TYPES } from "./constants/digimon";

const runBot = async () => {
  const client = new Client({
    intents: ["GuildMessages", "Guilds", "MessageContent"],
  });

  const mongo = await setupMongo();

  const agenda = await setupAgenda(mongo.connection.db);

  agenda.define("timer", async (job: Job) => {
    const { channelId, type } = job.attrs.data;
    const guild = await client.channels.fetch(channelId);

    if (guild?.isTextBased()) {
      await guild
        .send(`The ${type} event has started! Go get your rewards! @everyone`)
        .catch(console.error);
    }

    job.schedule(new Date(job.attrs.lastRunAt).getTime() + RAID_TYPES[type]);
  });

  await client.login(process.env.DISCORD_TOKEN);

  client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    await registerCommand(client);

    console.log("Registered commands");
  });

  client.on("guildCreate", guildCreate);

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) await handleCommands(interaction, agenda);
  });
};

runBot();
