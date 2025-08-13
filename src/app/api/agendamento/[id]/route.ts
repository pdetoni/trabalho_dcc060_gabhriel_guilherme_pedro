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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const paramsObj = await params;
    const body = await request.json();
    const { id } = paramsObj;
    const {
      id_paciente,
      id_medico,
      id_recepcionista,
      data_hora,
      observacoes,
      status,
    } = body;
    const queryBuilder = new QueryBuilder();

    queryBuilder
      .append("update agendamento set")
      .append("id_paciente = $1,")
      .append("id_medico = $2,")
      .append("id_recepcionista = $3,")
      .append("data_hora = $4,")
      .append("observacoes = $5,")
      .append("status = $6")
      .append("where id_agendamento = $7");
    const values = [
      id_paciente,
      id_medico,
      id_recepcionista,
      data_hora,
      observacoes,
      status,
      id,
    ];
    console.log("data_hora:", data_hora);
    await pool.query(queryBuilder.toString(), values);

    return new Response(
      JSON.stringify({ message: "Agendamento atualizado com sucesso" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar agendamento" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
