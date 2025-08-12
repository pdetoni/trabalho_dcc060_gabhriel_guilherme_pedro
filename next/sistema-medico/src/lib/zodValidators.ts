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

const medicoSchema = z.object({
  id_medico: z.number().int(),
  nome: z.string(),
});

const pacienteSchema = z.object({
  id_paciente: z.number().int(),
  nome: z.string(),
});

const agendamentoSchemaArray = z.array(agendamentoSchema);

const medicoSchemaArray = z.array(medicoSchema);

const pacienteSchemaArray = z.array(pacienteSchema);

type Agendamento = z.infer<typeof agendamentoSchema>;
type Medico = z.infer<typeof medicoSchema>;
type Paciente = z.infer<typeof pacienteSchema>;

export type { Agendamento, Medico, Paciente };

export {
  agendamentoSchema,
  agendamentoSchemaArray,
  medicoSchema,
  medicoSchemaArray,
  pacienteSchemaArray,
};
