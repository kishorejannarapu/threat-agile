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
import Question from "../../types/Question";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import TooltipNoWrap from "../../components/TooltipNoWrap";

interface QuestionModalType {
  open: boolean;
  onClose: () => void;
  onSave: (data: Question) => void;
  rowData: Question;
}

const QuestionsModal: React.FC<QuestionModalType> = ({ open, onClose, onSave, rowData }) => {
  const { register, handleSubmit, reset, setValue } = useForm<Question>({});

  const handleSave: SubmitHandler<Question> = (data) => {
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
        question: "",
        answer: "",
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleSave)}>
        <DialogTitle>
          {rowData ? "Edit Quesion" : "Add Quesion"}
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
          <TextField label="Question" type="text" {...register("question")} fullWidth focused margin="normal" required/>
          <TextField label="Answer" type="text" {...register("answer")} fullWidth focused margin="normal" />
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

export default QuestionsModal;
