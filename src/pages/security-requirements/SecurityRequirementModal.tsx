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
import SecurityRequirement from "../../types/SecurityRequirement";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import TooltipNoWrap from "../../components/TooltipNoWrap";

interface SecurityRequirementModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: SecurityRequirement) => void;
  rowData: SecurityRequirement;
}

const SecurityRequirementModal: React.FC<SecurityRequirementModalProps> = ({ open, onClose, onSave, rowData }) => {
  const { register, handleSubmit, reset, setValue } = useForm<SecurityRequirement>({});

  const handleSave: SubmitHandler<SecurityRequirement> = (data) => {
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
        <DialogTitle>
          {rowData ? "Edit Security Requirement" : "Add Security Requirement"}
          <TooltipNoWrap
            arrow
            placement="bottom"
            title={
              <div>
                <pre>Input Validation: Strict input validation is required to reduce the overall attack surface.</pre>
                <pre>
                  Securing Administrative Access: Administrative access must be secured with strong encryption and multi-factor authentication.
                </pre>
                <pre>EU-DSGVO: Mandatory EU-Datenschutzgrundverordnung</pre>
              </div>
            }
          >
            <IconButton>
              <InfoIcon fontSize="small" />
            </IconButton>
          </TooltipNoWrap>
        </DialogTitle>
        <DialogContent>
          <TextField label="Secuerity Requirement" type="text" {...register("name")} fullWidth margin="normal" focused required  disabled={rowData?.name ? true : false}/>
          <TextField label="Description" type="text" {...register("description")} fullWidth margin="normal" focused required />
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
