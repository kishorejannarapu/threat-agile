//@ts-ignore
import Recat, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import Tag from "../../types/Tag";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import TooltipNoWrap from "../../components/TooltipNoWrap";

interface TagModalType {
  open: boolean;
  onClose: () => void;
  onSave: (data: Tag) => void;
  rowData: Tag;
}

const TagsModal: React.FC<TagModalType> = ({ open, onClose, onSave, rowData }) => {
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

  const toolTipText = `
  - linux
  - apache
  - mysql
  - jboss
  - keycloak
  - jenkins
  - git
  - oracle
  - some-erp
  - vmware
  - aws
  - aws:ec2
  - aws:s3`;
  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleSave)}>
        <DialogTitle>
          {rowData ? "Edit Tag" : "Add Tag"}
          <TooltipNoWrap
            arrow
            placement="bottom"
            title={
              <div>
                <pre>{toolTipText}</pre>
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
            label="Tag"
            type="text"
            {...register("tag")}
            size="small"
            fullWidth
            margin="normal"
            focused
            required
            disabled={rowData?.tag ? true : false}
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
