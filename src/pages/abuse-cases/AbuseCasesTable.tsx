//@ts-ignore
import Recat from 'react';
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AbuseCase from "../../types/AbuseCase";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AbuseCasesModal from "./AbuseCasesModal";

interface AbuseCasesTableProps {
  abuseCases: AbuseCase[];
  setAbuseCases: (newState: AbuseCase[]) => void;
}

const AbuseCasesTable: React.FC<AbuseCasesTableProps> = ({
  abuseCases,
  setAbuseCases,
}) => {
  const [rows, setRows] = useState<AbuseCase[]>(abuseCases);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<AbuseCase | null>(null);

  const handleAddClick = () => {
    setSelectedRow(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (editedData: AbuseCase) => {
    if (editedData["id"] == undefined) {
      editedData.id = Math.random();
    }

    if (selectedRow) {
      // Edit existing row
      const updatedAbuseCases = rows.map((row) =>
        row.id === selectedRow.id ? editedData : row
      );
      setAbuseCases(updatedAbuseCases);
      setRows(updatedAbuseCases);
    } else {
      // Add new row
      setAbuseCases([...rows, editedData]);
      setRows([...rows, editedData]);
    }
  };

  const handleEdit = (row: AbuseCase) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    // Implement your delete logic here, e.g., make an API call to delete the item
    // After successful deletion, update your data
    const updatedAbuseCases = rows.filter((row) => row.id !== id);
    setAbuseCases(updatedAbuseCases);
    setRows(updatedAbuseCases);
  };

  const columns: GridColDef[] = [
    //@ts-ignore
    { field: "id", headerName: "ID", visible: false },
    //@ts-ignore
    { field: "abuseCase", headerName: "AbuseCase", minWidth: "450" },
    //@ts-ignore
    { field: "description", headerName: "Answer", minWidth: "500" },
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
          Add AbuseCase
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
      <AbuseCasesModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        //@ts-ignore
        rowData={selectedRow}
      />
    </Box>
  );
};

export default AbuseCasesTable;
