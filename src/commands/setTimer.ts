import { Message } from "discord.js";
import { Agenda } from "agenda";
import Server from "../models/server";

export default {
  name: "setTimer",
  typeEnum: ["Omegamon", "Odaiba"],
  typeValues: {
    Omegamon: Number(process.env.OMEGAMON_TIMER),
    Odaiba: Number(process.env.ODAIBA_TIMER),
  },
  description: "Set the timer for a specific event",
  async execute(
    message: Message,
    agenda: Agenda,
    type: string,
    typeValue: number
  ) {
    const server = await Server.findOne({ guildId: message.guildId });

    if (!message.member.roles.cache.has(server.roleId)) {
      await message.reply("You do not have the required role to set the timer");
      return;
    }

    const timer = message.createdTimestamp + typeValue;

    // remove all timers from the guild with the same type
    await agenda.cancel({
      name: "timer",
      "data.guildId": message.guild.id,
      "data.type": type,
    });

    await agenda.schedule(new Date(timer), "timer", {
      channelId: message.channel.id,
      guildId: message.guild.id,
      type,
    });

    await message.reply(
      `The timer for the ${type} event has been set to ${new Date(
        timer
      ).toLocaleString()} minutes`
    );
  },
};
