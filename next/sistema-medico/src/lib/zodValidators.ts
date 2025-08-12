import z from "zod";

const agendamentoSchema = z.object({
  id_agendamento: z.number().int(),
  id_recepcionista: z.number().int(),
  id_paciente: z.number().int(),
  id_medico: z.number().int(),
  nome_recipcionista: z.string(),
  nome_medico: z.string(),
  nome_paciente: z.string(),
  data_hora: z.coerce.date(),
  status: z.int(),
});

const agendamentoSchemaArray = z.array(agendamentoSchema);

type Agendamento = z.infer<typeof agendamentoSchema>;

export type { Agendamento };

export { agendamentoSchema, agendamentoSchemaArray };
