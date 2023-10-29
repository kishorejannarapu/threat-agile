//@ts-ignore
import Recat from "react";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Tag from "../../types/Tag";
import QuestionsModal from "./TagsModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import TooltipNoWrap from "../../components/TooltipNoWrap";

interface TagssTableProps {
  tagsList: Tag[];
  setTagsList: (newState: Tag[]) => void;
}

const TagsTable: React.FC<TagssTableProps> = ({ tagsList, setTagsList }) => {
  const [rows, setRows] = useState<Tag[]>(tagsList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Tag | null>(null);

  const handleAddClick = () => {
    setSelectedRow(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (editedData: Tag) => {
    if (editedData["id"] == undefined) {
      editedData.id = editedData.tag;
      console.log("edited Data =" + JSON.stringify(editedData));
    }

    if (selectedRow) {
      // Edit existing row
      const updatedData = rows.map((row) => (row.id === selectedRow.id ? editedData : row));
      setTagsList(updatedData);
      setRows(updatedData);
    } else {
      // Add new row
      setTagsList([...rows, editedData]);
      setRows([...rows, editedData]);
    }
  };

  const handleEdit = (row: Tag) => {
    console.log("edit row =" + JSON.stringify(row));
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    // Implement your delete logic here, e.g., make an API call to delete the item
    // After successful deletion, update your data
    const updatedData = rows.filter((row) => row.id !== id);
    setTagsList(updatedData);
    setRows(updatedData);
  };

  const columns: GridColDef[] = [
    //@ts-ignore
    { field: "id", headerName: "ID", visible: false },
    //@ts-ignore
    { field: "tag", headerName: "Tag", minWidth: "720" },
    //@ts-ignore
    {
      field: "actions",
      headerName: "Actions",
      //@ts-ignore
      with: 350,
      renderCell: (params: any) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box
      component="fieldset"
      width="100%"
      minHeight={300}
      maxHeight={400}
      sx={{
        borderColor: "primary.light",
        borderWidth: "2px",
        borderRadius: 1,
        "& .MuiDataGrid-columnHeader": {
          height: "70px",
        },
      }}
      key={rows.length}
    >
      <legend>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
          Add Tag
        </Button>
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
      </legend>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableVirtualization
      />
      <QuestionsModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        //@ts-ignore
        rowData={selectedRow}
      />
    </Box>
  );
};

export default TagsTable;
