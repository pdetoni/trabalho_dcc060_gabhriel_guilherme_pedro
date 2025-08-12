import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";

const AgendamentoEditDialog = () => {
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
  </Dialog>;
};

export default AgendamentoEditDialog;
