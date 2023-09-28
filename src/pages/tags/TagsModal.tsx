//@ts-ignore
import Recat,{ useEffect }  from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import Tag from "../../types/Tag";

interface TagModalType{
  open: boolean;
  onClose: ()=> void;
  onSave:(data:Tag)=>void;
  rowData:Tag;
}

const TagsModal: React.FC<TagModalType> = ({
  open,
  onClose,
  onSave,
  rowData,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<Tag>({});

  const handleSave: SubmitHandler<Tag> = (data) => {
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
        tag: "",
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleSave)}>
        <DialogTitle>{rowData ? "Edit Row" : "Add Row"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Tag"
            type="text"
            {...register("tag")}
            fullWidth
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

export default TagsModal;
