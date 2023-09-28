//@ts-ignore
import Recat from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import RiskTracking from "../../types/RiskTracking";

interface RiskTrackingModalType {
  open: boolean;
  onClose: () => void;
  onSave: (data: RiskTracking) => void;
  rowData: RiskTracking;
}

const RiskTrackingsModal: React.FC<RiskTrackingModalType> = ({
  open,
  onClose,
  onSave,
  rowData,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<RiskTracking>({});

  const handleSave: SubmitHandler<RiskTracking> = (data) => {
    onSave(data);
    onClose();
  };

  useEffect(() => {
    if (rowData) {
      Object.keys(rowData).forEach((field) => {
        // @ts-ignore
        setValue(field, rowData[field]);
      });
    } else {
      reset({});
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleSave)}>
        <DialogTitle>{rowData ? "Edit Row" : "Add Row"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            type="text"
            {...register("name")}
            fullWidth
            size="medium"
            focused
            margin="normal"
          />
          <TextField
            label="Status"
            type="text"
            {...register("status")}
            fullWidth
            size="medium"
            focused
            margin="normal"
          />
           <TextField
            label="Justification"
            type="text"
            {...register("justification")}
            fullWidth
            size="medium"
            focused
            margin="normal"
          />
           <TextField
            label="Ticket"
            type="text"
            {...register("ticket")}
            fullWidth
            size="medium"
            focused
            margin="normal"
          />
           <TextField
            label="Checked By"
            type="text"
            {...register("checked_by")}
            fullWidth
            size="medium"
            focused
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RiskTrackingsModal;
