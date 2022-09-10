import { Agenda, Job } from "agenda";

export default async (mongoClient) => {
  const agenda = new Agenda();

  agenda.mongo(mongoClient, "agendaJobs");

  await agenda.start();

  return agenda;
};
