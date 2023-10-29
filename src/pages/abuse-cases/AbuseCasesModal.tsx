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
import AbuseCase from "../../types/AbuseCase";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import TooltipNoWrap from "../../components/TooltipNoWrap";

interface AbuseCaseType {
  open: boolean;
  onClose: () => void;
  onSave: (data: AbuseCase) => void;
  rowData: AbuseCase;
}

const AbuseCasesModal: React.FC<AbuseCaseType> = ({ open, onClose, onSave, rowData }) => {
  const { register, handleSubmit, reset, setValue } = useForm<AbuseCase>({});

  const handleSave: SubmitHandler<AbuseCase> = (data) => {
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
        abuseCase: "",
        description: "",
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleSave)}>
        <DialogTitle>
          {rowData ? "Edit Abuse Case" : "Add Abuse Case"}
          <TooltipNoWrap
            arrow
            placement="bottom"
            title={
              <div>
                <p>
                  Denial-of-Service: As a hacker I want to disturb the functionality of the backend system in order to cause indirect financial damage
                  via unusable features.
                </p>
                <p>
                  CPU-Cycle Theft: As a hacker I want to steal CPU cycles in order to transform them into money via installed crypto currency miners.
                </p>
                <p>Ransomware: As a hacker I want to encrypt the storage and file systems in order to demand ransom.</p>
                <p>
                  Identity Theft: As a hacker I want to steal identity data in order to reuse credentials and/or keys on other targets of the same
                  company or outside.
                </p>
                <p>
                  PII Theft: As a hacker I want to steal PII (Personally Identifiable Information) data in order to blackmail the company and/or
                  damage their repudiation by publishing them.
                </p>
              </div>
            }
          >
            <IconButton>
              <InfoIcon fontSize="small" />
            </IconButton>
          </TooltipNoWrap>
        </DialogTitle>
        <DialogContent>
          <TextField label="Abuse Case" type="text" {...register("abuseCase")} fullWidth margin="normal" focused required />
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

export default AbuseCasesModal;
