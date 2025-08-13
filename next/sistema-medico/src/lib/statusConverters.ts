const agendamentoStatusMap = new Map<number, string>([
  [0, "Cancelado"],
  [1, "Agendado"],
  [2, "Ausente"],
  [3, "Concluído"],
]);

const agendamentoStatusArray = [
  { id: 0, nome: "Cancelado" },
  { id: 1, nome: "Agendado" },
  { id: 2, nome: "Ausente" },
  { id: 3, nome: "Concluído" },
];

export { agendamentoStatusMap, agendamentoStatusArray };
