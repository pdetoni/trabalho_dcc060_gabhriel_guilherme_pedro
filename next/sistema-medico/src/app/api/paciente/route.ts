import pool from "../../../lib/db";
import { QueryBuilder } from "../../../lib/QueryBuilder";

export async function GET(request: Request) {
  try {
    const queryBuilder = new QueryBuilder();
    queryBuilder
      .append("select p.id_paciente, pe.nome")
      .append("from paciente p")
      .append("join pessoa pe on p.id_pessoa = pe.id_pessoa");

    const result = await pool.query(queryBuilder.toString());
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ error: "Erro ao buscar pacientes" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
