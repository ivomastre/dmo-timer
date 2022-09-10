import { Schema, model } from "mongoose";

interface Server {
  guildId: string;
  roleId: string;
}

const serverSchema = new Schema(
  {
    guildId: {
      type: String,
      required: true,
      unique: true,
    },
    roleId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

export default model<Server>("Server", serverSchema);
