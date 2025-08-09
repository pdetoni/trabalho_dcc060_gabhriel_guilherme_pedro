import express from "express";

type Request = express.Request;
type Response = express.Response;

const createSchedule = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    console.log(req.params);
    let schedule: any = {};

    res.status(201).json({
      message: "Agendamento criado com sucesso",
      schedule: { id: schedule.id, name: schedule.name },
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Erro ao criar agendamento",
      error: e.message,
    });
    return;
  }
};

const getSchedule = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    console.log(req.query);
    let schedule: any = {};

    res.status(200).json({
      message: "Fetch successful",
      schedule: { id: schedule.id, name: schedule.name },
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Erro ao obter agendamento" });
    return;
  }
};

export { createSchedule, getSchedule };
