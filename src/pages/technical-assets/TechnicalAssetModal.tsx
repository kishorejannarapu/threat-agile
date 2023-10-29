//@ts-ignore
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import TechnicalAssets from "../../types/TechnicalAssets";
import { FormControl, InputLabel, MenuItem, Select, OutlinedInput } from "@mui/material";
import DropDownOptions from "../../types/DropDownOptions";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import TooltipNoWrap from "../../components/TooltipNoWrap";

interface TechnicalAssetsModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: TechnicalAssets) => void;
  rowData: TechnicalAssets;
  dataAssetsDropDown: DropDownOptions[];
}

const TechnicalAssetsModal: React.FC<TechnicalAssetsModalProps> = ({ open, onClose, onSave, rowData, dataAssetsDropDown }) => {
  console.log("dataAssetsDropDown => " + JSON.stringify(dataAssetsDropDown));
  const { register, handleSubmit, reset, setValue, control } = useForm<TechnicalAssets>({});

  const handleSave: SubmitHandler<TechnicalAssets> = (data) => {
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
          {rowData ? "Edit Row" : "Add Row"}
          <TooltipNoWrap
            arrow
            placement="bottom"
            title={
              <div>
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
          <TextField
            label="Name"
            type="text"
            size="small"
            {...register("name")}
            fullWidth
            margin="normal"
            focused
            disabled={rowData?.name ? true : false}
          />
          <TextField label="Description" type="text" size="small" {...register("description")} fullWidth margin="normal" focused />

          <TextField label="Type" type="text" size="small" {...register("type")} fullWidth margin="normal" focused />
          <TextField label="Usage" type="text" size="small" {...register("usage")} fullWidth margin="normal" focused />
          <TextField
            label="Used as client by human"
            size="small"
            type="text"
            {...register("used_as_client_by_human")}
            fullWidth
            margin="normal"
            focused
          />

          <TextField label="Out of scope" type="text" size="small" {...register("out_of_scope")} fullWidth margin="normal" focused />
          <TextField
            label="Justification out of scope"
            size="small"
            type="text"
            {...register("justification_out_of_scope")}
            fullWidth
            margin="normal"
            focused
          />

          <TextField label="Size" type="text" size="small" {...register("size")} fullWidth margin="normal" focused />
          <TextField label="Technology" type="text" size="small" {...register("technology")} fullWidth margin="normal" focused />

          <TextField label="Internet" type="text" size="small" {...register("internet")} fullWidth margin="normal" focused />
          <TextField label="Machine" type="text" size="small" {...register("machine")} fullWidth margin="normal" focused />

          <TextField label="Encryption" type="text" size="small" {...register("encryption")} fullWidth margin="normal" focused />
          <TextField label="Owner" type="text" size="small" {...register("owner")} fullWidth margin="normal" focused />
          <TextField label="Confidentiality" type="text" size="small" {...register("confidentiality")} fullWidth margin="normal" focused />

          <TextField label="Integrity" type="text" size="small" {...register("integrity")} fullWidth margin="normal" focused />
          <TextField label="Integrity" type="text" size="small" {...register("integrity")} fullWidth margin="normal" focused />

          <TextField label="Availability" type="text" size="small" {...register("availability")} fullWidth margin="normal" focused />
          <TextField
            label="Justification cia rating"
            size="small"
            type="text"
            {...register("justification_cia_rating")}
            fullWidth
            margin="normal"
            focused
          />
          <TextField label="Multi tenant" type="text" size="small" {...register("multi_tenant")} fullWidth margin="normal" focused />

          <TextField label="Redundant" type="text" size="small" {...register("redundant")} fullWidth margin="normal" focused />
          <TextField
            label="Custom Developed Parts"
            size="small"
            type="text"
            {...register("custom_developed_parts")}
            fullWidth
            margin="normal"
            focused
          />

          <FormControl fullWidth focused margin="normal" size="small">
            <InputLabel>Data Assets Processed</InputLabel>
            <Controller
              name="data_assets_processed"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Select {...field} multiple input={<OutlinedInput label="Data Assets Processed" />} renderValue={(selected) => selected.join(", ")}>
                  {dataAssetsDropDown &&
                    dataAssetsDropDown.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>
          <TextField label="Data Assets Stored" size="small" type="text" {...register("data_assets_stored")} fullWidth margin="normal" focused />

          <TextField
            label="Data formats accepted"
            size="small"
            type="text"
            {...register("data_formats_accepted")}
            fullWidth
            margin="normal"
            placeholder="json, xml, serialization, file, csv"
            focused
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

export default TechnicalAssetsModal;
