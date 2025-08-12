import pool from "../../../lib/db";
import { QueryBuilder } from "../../../lib/QueryBuilder";

export async function GET(request: Request) {
  try {
    const queryBuilder = new QueryBuilder();
    queryBuilder
      .append("select m.id_medico, p.nome")
      .append("from medico m")
      .append("join funcionario f on f.id_funcionario = m.id_medico")
      .append("join pessoa p on f.id_pessoa = p.id_pessoa")
      .append("where f.ativo = true");

    const result = await pool.query(queryBuilder.toString());
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ error: "Erro ao buscar médicos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
