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
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import TooltipNoWrap from "../../components/TooltipNoWrap";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface DataAssetsModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: DataAssets) => void;
  rowData: DataAssets;
}

const SecurityRequirementModal: React.FC<DataAssetsModalProps> = ({ open, onClose, onSave, rowData }) => {
  const { register, handleSubmit, reset, setValue } = useForm<DataAssets>({});

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
      reset({});
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleSave)}>
        <DialogTitle>
          {rowData ? "Edit Data Asset" : "Add Data Asset"}
          <TooltipNoWrap
            arrow
            placement="bottom"
            title={
              <div>
                size="small"
                <p>How are the admin clients managed/protected against compromise?: "" </p>
                <p>How are the development clients managed/protected against compromise?: Managed by XYZ </p>
                <p>How are the build pipeline components managed/protected against compromise?: Managed by XYZ</p>
              </div>
            }
          >
            <IconButton>
              <InfoIcon fontSize="small" />
            </IconButton>
          </TooltipNoWrap>
        </DialogTitle>
        <DialogContent>
          <TextField label="Name" type="text" {...register("name")} fullWidth size="small" focused margin="normal" required/>
          <TextField label="Description" type="text" {...register("description")} fullWidth size="small" focused margin="normal" required/>
          <FormControl fullWidth focused size="small" margin="normal" >
            <InputLabel id="usage">Usage</InputLabel>
            <Select labelId="Usage" id="usage" {...register("usage")} label="Usage" defaultValue="">
              <MenuItem value={"business"}>Business</MenuItem>
              <MenuItem value={"devops"}>DevOps</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Tags" type="text" {...register("tags")} fullWidth size="small" focused margin="normal" />
          <TextField label="Origin" type="text" {...register("origin")} fullWidth size="small" focused margin="normal" />
          <TextField label="Owner" type="text" {...register("owner")} fullWidth size="small" focused margin="normal" />
          <FormControl fullWidth focused size="small" margin="normal" >
            <InputLabel id="quantity">Quantity</InputLabel>
            <Select labelId="quantity" id="usage" {...register("quantity")} label="Quantity" defaultValue="">
              <MenuItem value={"very-few"}>Very-few</MenuItem>
              <MenuItem value={"few"}>Few</MenuItem>
              <MenuItem value={"many"}>Many</MenuItem>
              <MenuItem value={"very-many"}>Very-many</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Confidentiality" type="text" {...register("confidentiality")} fullWidth size="small" focused margin="normal" />
          <TextField label="Integrity" type="text" {...register("integrity")} fullWidth margin="normal" size="small" focused />
          <TextField label="Availability" type="text" {...register("availability")} fullWidth size="small" focused margin="normal" />
          <TextField label="Justification" type="text" {...register("justification_cia_rating")} fullWidth size="small" focused margin="normal" />
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
