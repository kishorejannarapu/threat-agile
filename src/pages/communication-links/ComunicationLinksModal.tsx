//@ts-ignore
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import CommunicationLinks from "../../types/CommunicationLinks";

interface CommunicationLinksModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CommunicationLinks) => void;
  rowData: CommunicationLinks;
}

const CommunicationLinksModal: React.FC<CommunicationLinksModalProps> = ({ open, onClose, onSave, rowData }) => {
  const { register, handleSubmit, reset, setValue } = useForm<CommunicationLinks>({});

  const handleSave: SubmitHandler<CommunicationLinks> = (data) => {
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
        <DialogTitle>{rowData ? "Edit Communication Link" : "Add Communication Link"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Secuerity Requirement"
            type="text"
            {...register("name")}
            fullWidth
            margin="normal"
            placeholder="Input Validation"
          />
          <TextField
            label="Description"
            type="text"
            {...register("description")}
            fullWidth
            margin="normal"
            placeholder="Strict input validation is required to reduce the overall attack surface."
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

export default CommunicationLinksModal;
