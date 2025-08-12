"use client";

import { Button, CircularProgress, TextField } from "@mui/material";

import { Dialog, DialogActions, DialogContent } from "@mui/material";

import { IconButton, Toolbar, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import { IoMdClose } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import AgendamentosTable from "./agendamentosTable";
import { Agendamento, agendamentoSchemaArray } from "../../lib/zodValidators";
import AgendamentoEditDialog from "./agendamentoEditDialog";

const Agendamentos = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | Agendamento>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const fetchAgendamentos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/agendamento", { method: "GET" });
      const data = await response.json();
      const parsedData = agendamentoSchemaArray.parse(data);
      setAgendamentos(parsedData);
      console.log("Agendamentos fetched:", parsedData);
    } catch (e) {
      console.error("Erro ao buscar agendamentos:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const handleOpenEdit = (agendamento: Agendamento) => {
    setSelectedItem(agendamento);
    setOpenEdit(true);
  };

  const handleCloseEdit = (reloadTable: boolean) => {
    setOpenEdit(false);
    setSelectedItem(null);
    if (reloadTable) {
      fetchAgendamentos();
    }
  };

  const handleOpenCreate = () => {
    setSelectedItem(null);
    setOpenEdit(true);
  };
  return (
    <div className="flex flex-col w-full px-2">
      <h2 className="text-2xl font-bold text-center">Agendamento</h2>
      <div className="w-full justify-between flex">
        <Button variant="contained" onClick={handleOpenCreate}>
          + Cadastrar
        </Button>
        <Button variant="contained" onClick={fetchAgendamentos}>
          <IoReload />
        </Button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <AgendamentosTable
          agendamentos={agendamentos}
          handleOpenEdit={handleOpenEdit}
        />
      )}

      <AgendamentoEditDialog
        selectedItem={selectedItem}
        open={openEdit}
        handleClose={handleCloseEdit}
      />
    </div>
  );
};

export default Agendamentos;
