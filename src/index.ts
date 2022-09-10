import { Client } from "discord.js";
import "dotenv/config";
import setTimer from "./commands/setTimer";
import setupMongo from "./helpers/setupMongo";
import setupAgenda from "./helpers/setupAgenda";
import { Job } from "agenda";
import guildCreate from "./events/guildCreate";

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

    job.schedule(
      new Date(job.attrs.lastRunAt).getTime() + setTimer.typeValues[type]
    );
  });

  await client.login(process.env.DISCORD_TOKEN);

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("guildCreate", guildCreate);

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.includes("!setTimer")) {
      const args = message.content.split(" ");

      if (setTimer.typeEnum.includes(args[1])) {
        return setTimer.execute(
          message,
          agenda,
          args[1],
          setTimer.typeValues[args[1]]
        );
      }

      await message.reply(
        "Please provide the type of event you want to set the timer for"
      );
    }
  });
};

runBot();
