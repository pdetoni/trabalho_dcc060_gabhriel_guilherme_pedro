import pool from "../../../lib/db";
import { QueryBuilder } from "../../../lib/QueryBuilder";

export async function GET(request: Request) {
  try {
    const queryBuilder = new QueryBuilder();
    queryBuilder
      .append(
        "select a.id_agendamento, a.id_recepcionista, a.id_paciente, a.id_medico,"
      )
      .append("p.nome AS nome_recipcionista,")
      .append("p2.nome AS nome_medico,")
      .append("p3.nome AS nome_paciente,")
      .append("a.data_hora, a.status")
      .append("from agendamento a")
      .append("join recepcionista r on a.id_recepcionista = r.id_recepcionista")
      .append("join funcionario f on f.id_funcionario = r.id_recepcionista")
      .append("join pessoa p on p.id_pessoa = f.id_pessoa")
      .append("join medico m on a.id_medico = m.id_medico")
      .append("join funcionario f2 on f2.id_funcionario = m.id_medico")
      .append("join pessoa p2 on p2.id_pessoa = f2.id_pessoa")
      .append("join paciente pa on pa.id_paciente = a.id_paciente")
      .append("join pessoa p3 on pa.id_pessoa = p3.id_pessoa")
      .append("order by a.data_hora desc");

    const result = await pool.query(queryBuilder.toString());
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar agendamento" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
