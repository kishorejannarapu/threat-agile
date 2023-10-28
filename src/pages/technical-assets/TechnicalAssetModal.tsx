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
import { FormControl, InputLabel, MenuItem, Select ,OutlinedInput} from "@mui/material";
import DropDownOptions from "../../types/DropDownOptions";

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
        <DialogTitle>{rowData ? "Edit Row" : "Add Row"}</DialogTitle>
        <DialogContent>
          <TextField label="Name" type="text" {...register("name")} fullWidth margin="normal" focused />
          <TextField label="Description" type="text" {...register("description")} fullWidth margin="normal" focused/>

          <TextField label="Type" type="text" {...register("type")} fullWidth margin="normal" focused/>
          <TextField label="Usage" type="text" {...register("usage")} fullWidth margin="normal" focused/>
          <TextField label="Used as client by human" type="text" {...register("used_as_client_by_human")} fullWidth margin="normal" focused/>

          <TextField label="Out of scope" type="text" {...register("out_of_scope")} fullWidth margin="normal" focused/>
          <TextField label="Justification out of scope" type="text" {...register("justification_out_of_scope")} fullWidth margin="normal" focused/>

          <TextField label="Size" type="text" {...register("size")} fullWidth margin="normal" focused/>
          <TextField label="Technology" type="text" {...register("technology")} fullWidth margin="normal" focused/>

          <TextField label="Internet" type="text" {...register("internet")} fullWidth margin="normal" focused/>
          <TextField label="Machine" type="text" {...register("machine")} fullWidth margin="normal" focused/>

          <TextField label="Encryption" type="text" {...register("encryption")} fullWidth margin="normal" focused/>
          <TextField label="Owner" type="text" {...register("owner")} fullWidth margin="normal" focused/>
          <TextField label="Confidentiality" type="text" {...register("confidentiality")} fullWidth margin="normal" focused/>

          <TextField label="Integrity" type="text" {...register("integrity")} fullWidth margin="normal" focused/>
          <TextField label="Integrity" type="text" {...register("integrity")} fullWidth margin="normal" focused/>

          <TextField label="Availability" type="text" {...register("availability")} fullWidth margin="normal" focused/>
          <TextField label="Justification cia rating" type="text" {...register("justification_cia_rating")} fullWidth margin="normal" focused/>
          <TextField label="Multi tenant" type="text" {...register("multi_tenant")} fullWidth margin="normal" focused/>

          <TextField label="Redundant" type="text" {...register("redundant")} fullWidth margin="normal" focused/>
          <TextField label="Custom Developed Parts" type="text" {...register("custom_developed_parts")} fullWidth margin="normal" focused/>

          <FormControl fullWidth focused margin="normal">
            <InputLabel>Data Assets Processed</InputLabel>
            <Controller
              name="data_assets_processed"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Select {...field} multiple 
                input={<OutlinedInput label="Data Assets Processed" />}
                renderValue={(selected) => selected.join(", ")}>
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
          <TextField label="Data Assets Stored" type="text" {...register("data_assets_stored")} fullWidth margin="normal" focused/>

          <TextField
            label="Data formats accepted"
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
