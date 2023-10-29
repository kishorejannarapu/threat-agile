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
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import TooltipNoWrap from "../../components/TooltipNoWrap";

interface RiskTrackingModalType {
  open: boolean;
  onClose: () => void;
  onSave: (data: RiskTracking) => void;
  rowData: RiskTracking;
}

const RiskTrackingsModal: React.FC<RiskTrackingModalType> = ({ open, onClose, onSave, rowData }) => {
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
          <TextField label="Name" type="text" {...register("name")} fullWidth size="small" focused margin="normal"  disabled={rowData?.name ? true : false}/>
          <TextField label="Status" type="text" {...register("status")} fullWidth size="small" focused margin="normal" />
          <TextField label="Justification" type="text" {...register("justification")} fullWidth size="small" focused margin="normal" />
          <TextField label="Ticket" type="text" {...register("ticket")} fullWidth size="small" focused margin="normal" />
          <TextField label="Checked By" type="text" {...register("checked_by")} fullWidth size="small" focused margin="normal" />
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
