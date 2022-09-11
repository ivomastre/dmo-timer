import { Agenda } from "agenda";
import { CacheType, CommandInteraction } from "discord.js";

export default async (
  interaction: CommandInteraction<CacheType>,
  agenda: Agenda
) => {
  const timers = await agenda.jobs({
    name: "timer",
    "data.guildId": interaction.guild.id,
  });
  const timersList = timers.map((timer) => {
    return `The ${timer.attrs.data.type} event is set to ${new Date(
      timer.attrs.nextRunAt
    ).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`;
  });

  await interaction.reply(timersList.join("\n"));
};
