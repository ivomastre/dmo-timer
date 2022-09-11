export interface SlashCommand {
  name: string;
  description: string;
  options?: SlashCommandOption[];
}

export interface SlashCommandOption {
  name: string;
  description: string;
  required?: boolean;
  choices?: SlashCommandOptionChoice[];
}

export interface SlashCommandOptionChoice {
  name: string;
  value: string;
}
