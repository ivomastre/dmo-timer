import { SlashCommand } from "../../discord/types/slashCommand";

export default {
  name: "set_timer",
  description: "Set the timer for a specific event",
  options: [
    {
      name: "event",
      description: "The event to set the timer for",
      required: true,
      choices: [
        {
          name: "Omegamon (5 hours)",
          value: "Omegamon",
        },
        {
          name: "Odaiba (2 hours)",
          value: "Odaiba",
        },
      ],
    },
    {
      name: "timer",
      description: "The time to set the timer for",
      required: false,
    },
  ],
} as SlashCommand;
