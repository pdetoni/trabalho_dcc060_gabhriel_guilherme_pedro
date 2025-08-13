"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Agendamento } from "../../lib/zodValidators";
import { dateFormatter, timeFormatter } from "../../lib/formatters";
import { agendamentoStatusMap } from "../../lib/statusConverters";

const AgendamentoDeleteDialog = ({
  open,
  selectedItem,
  cancelDelete,
  confirmDelete,
}: {
  open: boolean;
  selectedItem: Agendamento | null;
  cancelDelete: () => void;
  confirmDelete: () => void;
}) => {
  return (
    <Dialog open={open && selectedItem !== null}>
      <DialogTitle>{"Excluir agendamento"}</DialogTitle>
      <DialogContent>
        <div>Paciente: {selectedItem?.nome_paciente}</div>
        <div>Médico: {selectedItem?.nome_medico}</div>
        <div>Data: {dateFormatter.format(selectedItem?.data_hora)}</div>
        <div>Horário: {timeFormatter.format(selectedItem?.data_hora)}</div>
        <div>
          Status:{" "}
          {selectedItem
            ? agendamentoStatusMap.get(selectedItem.status)
            : "Indefinido"}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelDelete}>Cancelar</Button>
        <Button variant="contained" color="error" onClick={confirmDelete}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgendamentoDeleteDialog;
