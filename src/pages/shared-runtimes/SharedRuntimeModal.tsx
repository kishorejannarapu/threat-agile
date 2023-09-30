//@ts-ignore
import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import SharedRuntime from "../../types/SharedRuntime";

interface SharedRuntimeModalProps{
  open: boolean;
  onClose: ()=> void;
  onSave:(data:SharedRuntime)=>void;
  rowData:SharedRuntime;
}


const SharedRuntimeModal: React.FC<SharedRuntimeModalProps> = ({
  open,
  onClose,
  onSave,
  rowData,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<SharedRuntime>({});

  const handleSave: SubmitHandler<SharedRuntime> = (data) => {
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
      reset({
        name: "",
        description: "",
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleSave)}>
        <DialogTitle>{rowData ? "Edit Row" : "Add Row"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Secuerity Requirement"
            type="text"
            {...register("name")}
            fullWidth
            margin="normal"
            placeholder='Input Validation'
          />
          <TextField
            label="Description"
            type="text"
            {...register("description")}
            fullWidth
            margin="normal"
            placeholder='Strict input validation is required to reduce the overall attack surface.'
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

export default SharedRuntimeModal;
