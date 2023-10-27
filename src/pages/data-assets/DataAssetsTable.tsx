//@ts-ignore
import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DataAssets from "../../types/DataAssets";
import DataAssetsModal from "./DataAssetsModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

interface DataAssetsTableProps {
  dataAssetsList: DataAssets[];
  setDataAssetsList: (newState: DataAssets[]) => void;
}

const DataAssetsTable: React.FC<DataAssetsTableProps> = ({
  dataAssetsList,
  setDataAssetsList,
}) => {
  const [rows, setRows] = useState<DataAssets[]>(dataAssetsList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataAssets | null>(null);

  const handleAddClick = () => {
    setSelectedRow(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (editedData: DataAssets) => {
    if (editedData["id"] == undefined) {
      editedData.id = editedData.name.split(" ").join("-");
      console.log("edited Data =" + JSON.stringify(editedData));
    }

    if (selectedRow) {
      // Edit existing row
      const updatedDataAssets = rows.map((row) =>
        row.id === selectedRow.id ? editedData : row
      );
      setDataAssetsList(updatedDataAssets);
      setRows(updatedDataAssets);
    } else {
      // Add new row
      setDataAssetsList([...rows, editedData]);
      setRows([...rows, editedData]);
    }
  };

  const handleEdit = (row: DataAssets) => {
    console.log("edit row =" + JSON.stringify(row));
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    // Implement your delete logic here, e.g., make an API call to delete the item
    // After successful deletion, update your data
    const updatedDataAssets = rows.filter((row) => row.id !== id);
    setDataAssetsList(updatedDataAssets);
    setRows(updatedDataAssets);
  };

  const columns: GridColDef[] = [
    //@ts-ignore
    { field: "id", headerName: "ID", visible: false },
    //@ts-ignore
    { field: "description", headerName: "Description" },
    //@ts-ignore
    { field: "usage", headerName: "Usage" },
    //@ts-ignore
    { field: "tags", headerName: "Tags" },
    //@ts-ignore
    { field: "origin", headerName: "Origin" },
    //@ts-ignore
    { field: "owner", headerName: "Owner" },
    //@ts-ignore
    { field: "quantity", headerName: "Quantity" },
    {
      field: "confidentiality",
      headerName: "Confidentiality",//@ts-ignore
    },
    //@ts-ignore
    { field: "integrity", headerName: "Integrity" },
    //@ts-ignore
    { field: "availability", headerName: "Availability" },
    {
      field: "justification_cia_rating",
      headerName: "Justification",//@ts-ignore
    },
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
      sx={{
        borderColor: "primary.light",
        borderWidth: "2px",
        borderRadius: 1,
        "& .MuiDataGrid-columnHeader": {
          height: "70px",
         
        },
        width: '100%'
      }}
      key={rows.length}
    >
      <legend>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add DataAssets
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
        sx={{maxWidth:"100%"}}
      />
      <DataAssetsModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        //@ts-ignore
        rowData={selectedRow}
      />
    </Box>
  );
};

export default DataAssetsTable;
