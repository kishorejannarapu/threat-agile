//@ts-ignore
import Recat from "react";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TrustedBoundary from "../../types/TrustedBoundary";
import TrustedBoundaryModal from "./TrustedBoundaryModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

interface TrustedBoundaryTableProps {
  riskTrackingList: TrustedBoundary[];
  setTrustedBoundaryList: (newState: TrustedBoundary[]) => void;
}

const TrustedBoundaryTable: React.FC<TrustedBoundaryTableProps> = ({
  riskTrackingList,
  setTrustedBoundaryList,
}) => {
  const [rows, setRows] = useState<TrustedBoundary[]>(riskTrackingList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TrustedBoundary | null>(null);

  const handleAddClick = () => {
    setSelectedRow(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (editedData: TrustedBoundary) => {
    if (editedData["id"] == undefined) {
      editedData.id = editedData.name.split(" ").join("-");
      console.log("edited Data =" + JSON.stringify(editedData));
    }

    if (selectedRow) {
      // Edit existing row
      const updatedData = rows.map((row) =>
        row.id === selectedRow.id ? editedData : row
      );
      setTrustedBoundaryList(updatedData);
      setRows(updatedData);
    } else {
      // Add new row
      setTrustedBoundaryList([...rows, editedData]);
      setRows([...rows, editedData]);
    }
  };

  const handleEdit = (row: TrustedBoundary) => {
    console.log("edit row =" + JSON.stringify(row));
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    // Implement your delete logic here, e.g., make an API call to delete the item
    // After successful deletion, update your data
    const updatedData = rows.filter((row) => row.id !== id);
    setTrustedBoundaryList(updatedData);
    setRows(updatedData);
  };

  const columns: GridColDef[] = [
    //@ts-ignore
    { field: "id", headerName: "ID", visible: false },
    //@ts-ignore
    { field: "name", headerName: "Name", width: 150 },
    //@ts-ignore
    { field: "status", headerName: "Status", width: 150 },
    { field: "justification", headerName: "Justification", width: 250 },
    { field: "ticket", headerName: "Ticket", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "checked_by", headerName: "Checked By", width: 150 },
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
          Add TrustedBoundary
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
      <TrustedBoundaryModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        //@ts-ignore
        rowData={selectedRow}
      />
    </Box>
  );
};

export default TrustedBoundaryTable;
