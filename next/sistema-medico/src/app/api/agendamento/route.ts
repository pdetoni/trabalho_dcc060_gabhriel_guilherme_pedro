import pool from "../../../lib/db";

export async function GET(request: Request) {
  try {
    const result = await pool.query("SELECT * FROM agendamento");
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
