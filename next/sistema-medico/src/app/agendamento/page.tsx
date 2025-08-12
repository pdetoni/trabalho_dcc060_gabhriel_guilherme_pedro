"use client";

import { Button, TextField } from "@mui/material";

import { Dialog, DialogActions, DialogContent } from "@mui/material";

import { IconButton, Toolbar, Typography } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { IoReload } from "react-icons/io5";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Agendamento = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | (typeof rows)[0]>(
    null
  );

  const [dialogTitle, setDialogTitle] = useState("");

  const fetchAgendamentos = async () => {
    const response = await fetch("/api/agendamento", { method: "GET" });
    console.log(response);
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const handleOpenEdit = (item: (typeof rows)[0]) => {
    setDialogTitle("Editar");
    setSelectedItem(item);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedItem(null);
  };

  const handleOpenCreate = () => {
    setDialogTitle("Cadastrar");
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

      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow sx={{ color: "white", fontWeight: "bold" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Dessert (100g serving)
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Calories
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Fat&nbsp;(g)
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Carbs&nbsp;(g)
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Protein&nbsp;(g)
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold", width: "120px" }}
              >
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.fat}</TableCell>
                <TableCell>{row.carbs}</TableCell>
                <TableCell>{row.protein}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outlined"
                      className="h-8"
                      onClick={() => handleOpenEdit(row)}
                    >
                      <MdModeEditOutline size={24} />
                    </Button>
                    <Button
                      className="h-8 "
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpenEdit(row)}
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

      {/* Dialog edição */}
      <Dialog open={openEdit} onClose={handleCloseEdit} fullScreen>
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant="h6" component="div">
            {dialogTitle}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseEdit}
            aria-label="close"
          >
            <IoMdClose />
          </IconButton>
        </Toolbar>

        <DialogContent className="flex flex-col gap-6">
          {selectedItem ? (
            <>
              <TextField label="Name" value={selectedItem.name} />
              <TextField label="Calories" value={selectedItem.calories} />
              <TextField label="Fat" value={selectedItem.fat} />
              <TextField label="Carbs" value={selectedItem.carbs} />
              <TextField label="Protein" value={selectedItem.protein} />
            </>
          ) : (
            <>
              <TextField label="Name" />
              <TextField label="Calories" />
              <TextField label="Fat" />
              <TextField label="Carbs" />
              <TextField label="Protein" />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseEdit}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Agendamento;
