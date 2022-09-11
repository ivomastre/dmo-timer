import {
  CommandInteraction,
  CacheType,
  GuildMemberRoleManager,
} from "discord.js";
import { Agenda } from "agenda";
import Server from "../../models/server";

export default async (
  interaction: CommandInteraction<CacheType>,
  agenda: Agenda,
  type: string,
  timer: number
) => {
  const server = await Server.findOne({ guildId: interaction.guildId });

  if (!timer) {
    await interaction.reply("Please provide a time in the format of hh:mm");
    return;
  }

  const roles = Array.isArray(interaction.member.roles)
    ? interaction.member.roles
    : [...interaction.member.roles.cache.keys()];

  if (!roles.includes(server.roleId)) {
    return interaction.reply(
      "You do not have the required role to set the timer"
    );
  }

  // remove all timers from the guild with the same type
  await agenda.cancel({
    name: "timer",
    "data.guildId": interaction.guild.id,
    "data.type": type,
  });

  await agenda.schedule(new Date(timer), "timer", {
    channelId: interaction.channel.id,
    guildId: interaction.guild.id,
    type,
  });

  await interaction.reply(
    `The timer for the ${type} event has been set to ${new Date(
      timer
    ).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`
  );
};
