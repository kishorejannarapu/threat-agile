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
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import TooltipNoWrap from "../../components/TooltipNoWrap";

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
        <DialogTitle>
          {rowData ? "Edit Communication Link" : "Add Communication Link"}
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
          <TextField label="Secuerity Requirement" type="text" {...register("name")} fullWidth margin="normal" placeholder="Input Validation" />
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
