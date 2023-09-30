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
import DataAssets from "../../types/DataAssets";

interface DataAssetsModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: DataAssets) => void;
  rowData: DataAssets;
}

const SecurityRequirementModal: React.FC<DataAssetsModalProps> = ({
  open,
  onClose,
  onSave,
  rowData,
}) => {
  const { register, handleSubmit, reset, setValue } =
    useForm<DataAssets>({});

  const handleSave: SubmitHandler<DataAssets> = (data) => {
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
      });
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
            label="Secuerity Requirement"
            type="text"
            {...register("description")}
            fullWidth
            size="medium"
            focused
            margin="normal"
          />
          <TextField
            label="Usage"
            type="text"
            {...register("usage")}
            fullWidth
            size="medium"
            focused
            margin="normal"
          />
          <TextField
            label="Tags"
            type="text"
            {...register("tags")}
            fullWidth
            size="medium"
            focused
          />
          <TextField
            label="Origin"
            type="text"
            {...register("origin")}
            fullWidth
            size="medium"
            focused
            margin="normal"
          />
          <TextField
            label="Owner"
            type="text"
            {...register("owner")}
            fullWidth
            size="medium"
            focused
            margin="normal"

          />
          <TextField
            label="Quantity"
            type="text"
            {...register("quantity")}
            fullWidth
            size="medium"
            focused
            margin="normal"
          />
          <TextField
            label="Confidentiality"
            type="text"
            {...register("confidentiality")}
            fullWidth
            size="medium"
            focused
            margin="normal"
          />
          <TextField
            label="Integrity"
            type="text"
            {...register("integrity")}
            fullWidth
            margin="normal"
            size="medium"
            focused
          />
          <TextField
            label="Availability"
            type="text"
            {...register("availability")}
            fullWidth
            size="medium"
            focused
            margin="normal"
          />
          <TextField
            label="Justification"
            type="text"
            {...register("justification_cia_rating")}
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

export default SecurityRequirementModal;
