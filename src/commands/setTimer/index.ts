import { Agenda } from "agenda";
import { CommandInteraction, CacheType } from "discord.js";
import { RAID_TYPES } from "../../constants/digimon";
import parseTime from "../../helpers/parseTime";
import setTimer from "./setTimer";

export default async (
  interaction: CommandInteraction<CacheType>,
  type: string,
  rawTimer: string,
  agenda: Agenda
) => {
  const typeDelay = RAID_TYPES[type];

  if (typeDelay) {
    const time = rawTimer
      ? parseTime(rawTimer)
      : interaction.createdTimestamp + typeDelay;
    return setTimer(interaction, agenda, type, time);
  }
  await interaction.reply(
    "Please provide the type of event you want to set the timer for"
  );
};
