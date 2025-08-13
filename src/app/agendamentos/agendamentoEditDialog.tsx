import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { IoMdClose } from "react-icons/io";
import {
  Agendamento,
  Medico,
  medicoSchemaArray,
  Paciente,
  pacienteSchemaArray,
  Recepcionista,
  recepcionistaSchemaArray,
} from "../../lib/zodValidators";
import { useCallback, useEffect, useState } from "react";
import { formatDateToInput } from "../../lib/formatters";
import CAutocomplete from "../components/CAutoComplete";
import { useLoadingOverlay } from "../components/context/loadingOverlay";
import { agendamentoStatusArray } from "../../lib/statusConverters";

const AgendamentoEditDialog = ({
  selectedItem,
  open,
  handleClose,
}: {
  selectedItem: null | Agendamento;
  open: boolean;
  handleClose: (reloadTable: boolean, isUpdate: boolean) => void;
}) => {
  const { setLoadingOverlay } = useLoadingOverlay();
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [recepcionistas, setRecepcionistas] = useState<Recepcionista[]>([]);
  const [localAgendamento, setLocalAgendamento] = useState<Agendamento | null>(
    selectedItem
  );
  const [createLocalAgendamento, setCreateLocalAgendamento] = useState<{
    id_paciente: number | null;
    id_medico: number | null;
    id_recepcionista: number | null;
    data_hora: Date | null;
    observacoes: string | null;
  }>({
    id_paciente: 0,
    id_medico: 0,
    id_recepcionista: 0,
    data_hora: new Date(),
    observacoes: null,
  });

  useEffect(() => {
    const fetchMedicos = async () => {
      const response = await fetch("/api/medico", { method: "GET" });
      const data = await response.json();
      const parsedData = medicoSchemaArray.parse(data);
      setMedicos(parsedData);
    };

    const fetchPacientes = async () => {
      const response = await fetch("/api/paciente", { method: "GET" });
      const data = await response.json();
      const parsedData = pacienteSchemaArray.parse(data);
      setPacientes(parsedData);
    };

    const fetchRecepcionistas = async () => {
      const response = await fetch("/api/recepcionista", { method: "GET" });
      const data = await response.json();
      const parsedData = recepcionistaSchemaArray.parse(data);
      setRecepcionistas(parsedData);
    };

    fetchMedicos();
    fetchPacientes();
    fetchRecepcionistas();
  }, []);

  useEffect(() => {
    setLocalAgendamento(selectedItem);

    setCreateLocalAgendamento({
      id_paciente: 0,
      id_medico: 0,
      id_recepcionista: 0,
      data_hora: new Date(),
      observacoes: null,
    });
  }, [open, selectedItem]);

  const handleSave = async () => {
    try {
      setLoadingOverlay({ show: true, message: "Salvando agendamento..." });
      if (selectedItem) {
        const bodyData = {
          id_paciente: localAgendamento?.id_paciente,
          id_medico: localAgendamento?.id_medico,
          id_recepcionista: localAgendamento?.id_recepcionista,
          data_hora: localAgendamento?.data_hora
            ? localAgendamento?.data_hora.toISOString()
            : null,
          observacoes: localAgendamento?.observacoes,
          status: localAgendamento?.status,
        };

        const response = await fetch(
          `/api/agendamento/${localAgendamento?.id_agendamento}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
          }
        );

        if (!response.ok) {
          console.log("Erro ao atualizar agendamento");
          throw new Error("Erro ao atualizar agendamento");
        }
        handleClose(true, true);
      } else {
        const bodyData = {
          id_paciente: createLocalAgendamento.id_paciente,
          id_medico: createLocalAgendamento.id_medico,
          id_recepcionista: createLocalAgendamento.id_recepcionista,
          data_hora: createLocalAgendamento.data_hora
            ? createLocalAgendamento.data_hora.toISOString()
            : null,
          observacoes: createLocalAgendamento.observacoes,
        };

        const response = await fetch("/api/agendamento", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });

        if (!response.ok) {
          console.log("Erro ao salvar agendamento");
          throw new Error("Erro ao salvar agendamento");
        }
        handleClose(true, false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingOverlay({ show: false, message: null });
    }
  };
  return (
    <Dialog open={open} fullScreen>
      <Toolbar>
        <Typography sx={{ flex: 1 }} variant="h6" component="div">
          {selectedItem ? "Editar Agendamento" : "Cadastrar Agendamento"}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => handleClose(false, false)}
          aria-label="close"
        >
          <IoMdClose />
        </IconButton>
      </Toolbar>

      <DialogContent className="flex flex-col gap-6">
        {selectedItem ? (
          <>
            <CAutocomplete
              options={pacientes}
              mapValue={true}
              optionValue="id_paciente"
              optionLabel="nome"
              label="Paciente"
              value={
                pacientes.find(
                  (paciente) =>
                    paciente.id_paciente === localAgendamento?.id_paciente
                ) || null
              }
              className="w-full"
              onChange={(value) =>
                setLocalAgendamento((prev) =>
                  prev ? { ...prev, id_paciente: Number(value) } : null
                )
              }
            />
            <CAutocomplete
              options={medicos}
              mapValue={true}
              optionValue="id_medico"
              optionLabel="nome"
              label="Médico"
              className="w-full"
              value={
                medicos.find(
                  (medico) => medico.id_medico === localAgendamento?.id_medico
                ) || null
              }
              onChange={(value) =>
                setLocalAgendamento((prev) =>
                  prev ? { ...prev, id_medico: Number(value) } : null
                )
              }
            />
            <CAutocomplete
              options={recepcionistas}
              mapValue={true}
              optionValue="id_recepcionista"
              optionLabel="nome"
              label="Recepcionista"
              value={
                recepcionistas.find(
                  (recepcionista) =>
                    recepcionista.id_recepcionista ===
                    localAgendamento?.id_recepcionista
                ) || null
              }
              className="w-full"
              onChange={(value) =>
                setLocalAgendamento((prev) =>
                  prev ? { ...prev, id_recepcionista: Number(value) } : null
                )
              }
            />
            <TextField
              label="Data/Horário"
              type="datetime-local"
              value={
                localAgendamento
                  ? formatDateToInput(localAgendamento?.data_hora)
                  : ""
              }
              onChange={(e) => {
                const date = new Date(e.target.value);
                setLocalAgendamento((prev) =>
                  prev ? { ...prev, data_hora: date } : null
                );
              }}
            />
            <TextField
              label="Observações"
              value={localAgendamento?.observacoes || ""}
              onChange={(e) =>
                setLocalAgendamento((prev) =>
                  prev ? { ...prev, observacao: e.target.value } : null
                )
              }
            />
            <CAutocomplete
              className="w-full"
              label="Status"
              value={
                agendamentoStatusArray.find(
                  (status) => status.id === localAgendamento?.status
                ) || null
              }
              options={agendamentoStatusArray}
              mapValue={true}
              optionLabel="nome"
              optionValue="id"
              onChange={(value) =>
                setLocalAgendamento((prev) =>
                  prev ? { ...prev, status: Number(value) } : null
                )
              }
            />
          </>
        ) : (
          <>
            <CAutocomplete
              options={pacientes}
              mapValue={true}
              optionValue="id_paciente"
              optionLabel="nome"
              label="Paciente"
              value={
                pacientes.find(
                  (paciente) =>
                    paciente.id_paciente === createLocalAgendamento.id_paciente
                ) || null
              }
              className="w-full"
              onChange={(value) =>
                setCreateLocalAgendamento((prev) => ({
                  ...prev,
                  id_paciente: Number(value),
                }))
              }
            />
            <CAutocomplete
              options={medicos}
              mapValue={true}
              optionValue="id_medico"
              optionLabel="nome"
              label="Médico"
              className="w-full"
              value={
                medicos.find(
                  (medico) =>
                    medico.id_medico === createLocalAgendamento.id_medico
                ) || null
              }
              onChange={(value) =>
                setCreateLocalAgendamento((prev) => ({
                  ...prev,
                  id_medico: Number(value),
                }))
              }
            />
            <CAutocomplete
              options={recepcionistas}
              mapValue={true}
              optionValue="id_recepcionista"
              optionLabel="nome"
              label="Recepcionista"
              value={
                recepcionistas.find(
                  (recepcionista) =>
                    recepcionista.id_recepcionista ===
                    createLocalAgendamento.id_recepcionista
                ) || null
              }
              className="w-full"
              onChange={(value) =>
                setCreateLocalAgendamento((prev) => ({
                  ...prev,
                  id_recepcionista: Number(value),
                }))
              }
            />
            <TextField
              label="Data/Horário"
              type="datetime-local"
              value={formatDateToInput(createLocalAgendamento.data_hora)}
              onChange={(e) => {
                const date = new Date(e.target.value);
                setCreateLocalAgendamento((prev) => ({
                  ...prev,
                  data_hora: date,
                }));
              }}
            />
            <TextField
              label="Observações"
              value={createLocalAgendamento.observacoes || ""}
              onChange={(e) =>
                setCreateLocalAgendamento((prev) => ({
                  ...prev,
                  observacoes: e.target.value,
                }))
              }
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={
            (!createLocalAgendamento.id_paciente ||
              !createLocalAgendamento.id_medico ||
              !createLocalAgendamento.id_recepcionista ||
              !createLocalAgendamento.data_hora) &&
            (!localAgendamento?.id_paciente ||
              !localAgendamento?.id_medico ||
              !localAgendamento?.id_recepcionista ||
              !localAgendamento?.data_hora ||
              localAgendamento?.status == null ||
              localAgendamento?.status == undefined)
          }
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgendamentoEditDialog;
