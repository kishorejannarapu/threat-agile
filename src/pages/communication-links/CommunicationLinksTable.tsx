//@ts-ignore
import React,{ useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CommunicationLinks from "../../types/CommunicationLinks";
import CommunicationLinkssModal from "./ComunicationLinksModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

interface CommunicationLinksTableProps {
  communicationLinksList: CommunicationLinks[];
  setCommunicationLinksList: (newState: CommunicationLinks[]) => void;
}

const CommunicationLinksTable: React.FC<CommunicationLinksTableProps> = ({
  communicationLinksList,
  setCommunicationLinksList
}) => {
  const [rows, setRows] = useState<CommunicationLinks[]>(communicationLinksList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CommunicationLinks | null>(null);

  const handleAddClick = () => {
    setSelectedRow(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (editedData: CommunicationLinks) => {
    if (editedData["id"] == undefined) {
      editedData.id =editedData.name.split(" ").join("-");
      console.log("edited Data =" + JSON.stringify(editedData));
    }

    if (selectedRow) {
      // Edit existing row
      const updatedCommunicationLinkss = rows.map((row) =>
        row.id === selectedRow.id ? editedData : row
      );
      setCommunicationLinksList(updatedCommunicationLinkss);
      setRows(updatedCommunicationLinkss);
    } else {
      // Add new row
      setCommunicationLinksList([...rows, editedData]);
      setRows([...rows, editedData]);
    }
  };

  const handleEdit = (row: CommunicationLinks) => {
    console.log("edit row =" + JSON.stringify(row));
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    // Implement your delete logic here, e.g., make an API call to delete the item
    // After successful deletion, update your data
    const updatedCommunicationLinkss = rows.filter((row) => row.id !== id);
    setCommunicationLinksList(updatedCommunicationLinkss);
    setRows(updatedCommunicationLinkss);
  };

  const columns: GridColDef[] = [
    //@ts-ignore
    { field: "id", headerName: "ID", visible: false },
    //@ts-ignore
    { field: "requirement", headerName: "CommunicationLinks", minWidth: "450" },
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
          Add CommunicationLinks
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
      <CommunicationLinkssModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        //@ts-ignore
        rowData={selectedRow}
      />
    </Box>
  );
};

export default CommunicationLinksTable;