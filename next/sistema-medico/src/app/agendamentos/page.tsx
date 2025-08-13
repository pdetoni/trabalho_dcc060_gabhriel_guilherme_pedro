"use client";

import { Button, CircularProgress, Snackbar } from "@mui/material";

import { useEffect, useState } from "react";

import { IoReload } from "react-icons/io5";
import AgendamentosTable from "./agendamentosTable";
import { Agendamento, agendamentoSchemaArray } from "../../lib/zodValidators";
import AgendamentoEditDialog from "./agendamentoEditDialog";
import AgendamentoDeleteDialog from "./agendamentoDeleteDialog";
import { useLoadingOverlay } from "../components/context/loadingOverlay";

const Agendamentos = () => {
  const { setLoadingOverlay } = useLoadingOverlay();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | Agendamento>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchAgendamentos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/agendamento", { method: "GET" });
      const data = await response.json();
      const parsedData = agendamentoSchemaArray.parse(data);
      setAgendamentos(parsedData);
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

  const handleCloseEdit = (reloadTable: boolean, isUpdate: boolean) => {
    setOpenEdit(false);
    setSelectedItem(null);
    if (reloadTable) {
      fetchAgendamentos();
      setSnackbarMessage(
        `Agendamento ${isUpdate ? "atualizado" : "criado"} com sucesso!`
      );
      setOpenSnackbar(true);
    }
  };

  const handleOpenCreate = () => {
    setSelectedItem(null);
    setOpenEdit(true);
  };

  const handleOpenDelete = (agendamento: Agendamento) => {
    setSelectedItem(agendamento);
    setOpenDelete(true);
  };

  const deleteAgendamento = async () => {
    try {
      setLoadingOverlay({ show: true, message: "Excluindo agendamento..." });
      const deletionResponse = await fetch(
        `/api/agendamento/${selectedItem?.id_agendamento}`,
        { method: "DELETE" }
      );
      if (!deletionResponse.ok) {
        throw new Error("Erro ao excluir agendamento");
      }
      setSnackbarMessage("Agendamento excluído!");
    } catch (e) {
      setSnackbarMessage("Erro ao excluir agendamento!");
    } finally {
      setOpenSnackbar(true);
      setLoadingOverlay({ show: false });
      fetchAgendamentos();
    }
  };

  const handleCloseDelete = async (confirmDeletion: boolean) => {
    if (confirmDeletion) {
      await deleteAgendamento();
    }
    setSelectedItem(null);
    setOpenDelete(false);
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
          handleOpenDelete={handleOpenDelete}
        />
      )}

      <AgendamentoEditDialog
        selectedItem={selectedItem}
        open={openEdit}
        handleClose={handleCloseEdit}
      />
      <AgendamentoDeleteDialog
        selectedItem={selectedItem}
        open={openDelete}
        confirmDelete={() => {
          handleCloseDelete(true);
        }}
        cancelDelete={() => {
          handleCloseDelete(false);
        }}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Agendamentos;
