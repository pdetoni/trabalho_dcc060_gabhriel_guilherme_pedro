import pool from "../../../../lib/db";
import { QueryBuilder } from "../../../../lib/QueryBuilder";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const paramsObj = await params;
    const { id } = paramsObj;
    const queryBuilder = new QueryBuilder();

    queryBuilder
      .append("delete from agendamento")
      .append("where id_agendamento = $1");
    const values = [id];
    await pool.query(queryBuilder.toString(), values);

    return new Response(
      JSON.stringify({ message: "Agendamento excluído com sucesso" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ error: "Erro ao excluir agendamento" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
