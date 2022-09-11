import { CommandInteraction } from "discord.js";
import setTimer from "./setTimer";
import { Agenda } from "agenda";
import listTimers from "./listTimers";

export default async (interaction: CommandInteraction, agenda: Agenda) => {
  if (interaction.commandName === "set_timer") {
    const eventType = interaction.options.get("event").value as string;
    const rawTimer = interaction.options.get("timer")?.value as string;

    return setTimer(interaction, eventType, rawTimer, agenda);
  } else if (interaction.commandName === "list_timers") {
    return listTimers(interaction, agenda);
  }
};
