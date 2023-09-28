//@ts-ignore
import React,{ useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SecurityRequirement from "../../types/SecurityRequirement";
import SecurityRequirementsModal from "./SecurityRequirementModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

interface SecurityRequirementTableProps {
  securityRequirementsList: SecurityRequirement[];
  setSecurityRequirementsList: (newState: SecurityRequirement[]) => void;
}

const SecurityRequirementTable: React.FC<SecurityRequirementTableProps> = ({
  securityRequirementsList,
  setSecurityRequirementsList
}) => {
  const [rows, setRows] = useState<SecurityRequirement[]>(securityRequirementsList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SecurityRequirement | null>(null);

  const handleAddClick = () => {
    setSelectedRow(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (editedData: SecurityRequirement) => {
    if (editedData["id"] == undefined) {
      editedData.id = Math.random();
      console.log("edited Data =" + JSON.stringify(editedData));
    }

    if (selectedRow) {
      // Edit existing row
      const updatedSecurityRequirements = rows.map((row) =>
        row.id === selectedRow.id ? editedData : row
      );
      setSecurityRequirementsList(updatedSecurityRequirements);
      setRows(updatedSecurityRequirements);
    } else {
      // Add new row
      setSecurityRequirementsList([...rows, editedData]);
      setRows([...rows, editedData]);
    }
  };

  const handleEdit = (row: SecurityRequirement) => {
    console.log("edit row =" + JSON.stringify(row));
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    // Implement your delete logic here, e.g., make an API call to delete the item
    // After successful deletion, update your data
    const updatedSecurityRequirements = rows.filter((row) => row.id !== id);
    setSecurityRequirementsList(updatedSecurityRequirements);
    setRows(updatedSecurityRequirements);
  };

  const columns: GridColDef[] = [
    //@ts-ignore
    { field: "id", headerName: "ID", visible: false },
    //@ts-ignore
    { field: "requirement", headerName: "SecurityRequirement", minWidth: "450" },
    //@ts-ignore
    { field: "description", headerName: "Description", minWidth: "500" },
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
          backgroundColor: "primary.light",
        },
      }}
      key={rows.length}
    >
      <legend>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add SecurityRequirement
        </Button>
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
      <SecurityRequirementsModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        //@ts-ignore
        rowData={selectedRow}
      />
    </Box>
  );
};

export default SecurityRequirementTable;
