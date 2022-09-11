import { Agenda } from "agenda";
import { CommandInteraction, CacheType } from "discord.js";
import listTimers from "./listTimers";

export default async (
  interaction: CommandInteraction<CacheType>,
  agenda: Agenda
) => {
  return listTimers(interaction, agenda);
};
