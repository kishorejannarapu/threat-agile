//@ts-ignore
import Recat from "react";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AbuseCase from "../../types/AbuseCase";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AbuseCasesModal from "./AbuseCasesModal";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import TooltipNoWrap from "../../components/TooltipNoWrap";

interface AbuseCasesTableProps {
  abuseCases: AbuseCase[];
  setAbuseCases: (newState: AbuseCase[]) => void;
}

const AbuseCasesTable: React.FC<AbuseCasesTableProps> = ({ abuseCases, setAbuseCases }) => {
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
      editedData.id = editedData.abuseCase.split(" ").join("-");
    }

    if (selectedRow) {
      // Edit existing row
      const updatedAbuseCases = rows.map((row) => (row.id === selectedRow.id ? editedData : row));
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

  const handleDelete = (id: string) => {
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
        },
      }}
      key={rows.length}
    >
      <legend>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
          Add AbuseCase
        </Button>
        <TooltipNoWrap
          arrow
          placement="bottom"
          title={
            <div>
              <p>
                Denial-of-Service: As a hacker I want to disturb the functionality of the backend system in order to cause indirect financial damage
                via unusable features.
              </p>
              <p>
                CPU-Cycle Theft: As a hacker I want to steal CPU cycles in order to transform them into money via installed crypto currency miners.
              </p>
              <p>Ransomware: As a hacker I want to encrypt the storage and file systems in order to demand ransom.</p>
              <p>
                Identity Theft: As a hacker I want to steal identity data in order to reuse credentials and/or keys on other targets of the same
                company or outside.
              </p>
              <p>
                PII Theft: As a hacker I want to steal PII (Personally Identifiable Information) data in order to blackmail the company and/or damage
                their repudiation by publishing them.
              </p>
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
