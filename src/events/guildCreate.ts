import { Guild } from "discord.js";
import Server from "../models/server";

export default async (guild: Guild) => {
  const role = await guild.roles.create({
    name: "LADMO Timer User",
    color: "Random",
    hoist: true,
    mentionable: false,
  });

  await Server.findOneAndUpdate(
    {
      guildId: guild.id,
    },
    {
      guildId: guild.id,
      roleId: role.id,
    },
    {
      upsert: true,
    }
  );
};
