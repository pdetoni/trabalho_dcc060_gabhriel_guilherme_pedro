"use client";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Agendamento } from "../../lib/zodValidators";
import { dateFormatter, timeFormatter } from "../../lib/formatters";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { agendamentoStatusMap } from "../../lib/statusConverters";

const AgendamentosTable = ({
  agendamentos,
  handleOpenEdit,
}: {
  agendamentos: Agendamento[];
  handleOpenEdit: (agendamento: Agendamento) => void;
}) => {
  return (
    <TableContainer component={Paper} className="mt-4">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#1976d2" }}>
          <TableRow sx={{ color: "white", fontWeight: "bold" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Nome Paciente
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Nome Médico
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Nome Recepcionista
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Data
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Hora
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", width: "120px" }}
            >
              Status
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", width: "120px" }}
            >
              Id Agendamento
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", width: "120px" }}
            >
              Id Paciente
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", width: "120px" }}
            >
              Id Médico
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", width: "120px" }}
            >
              Id Recepcionista
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", width: "120px" }}
            >
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agendamentos.map((agendamento, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {agendamento.nome_paciente}
              </TableCell>
              <TableCell>{agendamento.nome_medico}</TableCell>
              <TableCell>{agendamento.nome_recipcionista}</TableCell>
              <TableCell>
                {dateFormatter.format(agendamento.data_hora)}
              </TableCell>
              <TableCell>
                {timeFormatter.format(agendamento.data_hora)}
              </TableCell>
              <TableCell>
                {agendamentoStatusMap.get(agendamento.status)}
              </TableCell>
              <TableCell>{agendamento.id_agendamento}</TableCell>
              <TableCell>{agendamento.id_paciente}</TableCell>
              <TableCell>{agendamento.id_medico}</TableCell>
              <TableCell>{agendamento.id_recepcionista}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outlined"
                    className="h-8"
                    onClick={() => handleOpenEdit(agendamento)}
                  >
                    <MdModeEditOutline size={24} />
                  </Button>
                  <Button
                    className="h-8 "
                    variant="outlined"
                    color="error"
                    onClick={() => handleOpenEdit(agendamento)}
                  >
                    <MdDelete size={24} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AgendamentosTable;
