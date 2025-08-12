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

const AgendamentoEditDialog = ({
  selectedItem,
  open,
  handleClose,
}: {
  selectedItem: null | Agendamento;
  open: boolean;
  handleClose: (reloadTable: boolean) => void;
}) => {
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
  }>({
    id_paciente: 0,
    id_medico: 0,
    id_recepcionista: 0,
    data_hora: new Date(),
  });

  /*const fetchMedicos = useCallback(async () => {
    try {
      const response = await fetch("/api/medico", { method: "GET" });
      const data = await response.json();
      const parsedData = medicoSchemaArray.parse(data);
      setMedicos(parsedData);
    } catch (e) {
      console.error("Erro ao buscar médicos:", e);
    }
  },[]);

  const fetchSelectOptions = useCallback(async () =>{
    try{
        await fetchMedicos();
    }catch(e){
        console.error("Erro ao buscar opções de select:", e);
    }
  },[fetchMedicos]); */

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

  console.log(createLocalAgendamento);

  const handleSave = () => {};
  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <Toolbar>
        <Typography sx={{ flex: 1 }} variant="h6" component="div">
          {selectedItem ? "Editar Agendamento" : "Cadastrar Agendamento"}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => handleClose(false)}
          aria-label="close"
        >
          <IoMdClose />
        </IconButton>
      </Toolbar>

      <DialogContent className="flex flex-col gap-6">
        {selectedItem ? (
          <>
            <Select label="Paciente" value={selectedItem.id_paciente} />
            <Select label="Médico" value={selectedItem.id_medico} />
            <Select
              label="Recepcionista"
              value={selectedItem.id_recepcionista}
            />
            <DateTimePicker label="Data/Horário" />
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
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSave}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgendamentoEditDialog;
