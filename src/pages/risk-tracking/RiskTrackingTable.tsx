//@ts-ignore
import Recat from "react";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RiskTracking from "../../types/RiskTracking";
import RiskTrackingModal from "./RiskTrackingModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import TooltipNoWrap from "../../components/TooltipNoWrap";

interface RiskTrackingTableProps {
  riskTrackingList: RiskTracking[];
  setRiskTrackingList: (newState: RiskTracking[]) => void;
}

const RiskTrackingTable: React.FC<RiskTrackingTableProps> = ({ riskTrackingList, setRiskTrackingList }) => {
  const [rows, setRows] = useState<RiskTracking[]>(riskTrackingList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RiskTracking | null>(null);

  const handleAddClick = () => {
    setSelectedRow(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (editedData: RiskTracking) => {
    if (editedData["id"] == undefined) {
      editedData.id = editedData.name.split(" ").join("-");

      for (let i = 0; i < rows.length; i++) {
        if (editedData.id === rows[i].id) {
          return false;
        }
      }
    }

    if (selectedRow) {
      // Edit existing row
      const updatedData = rows.map((row) => (row.id === selectedRow.id ? editedData : row));
      setRiskTrackingList(updatedData);
      setRows(updatedData);
    } else {
      // Add new row
      setRiskTrackingList([...rows, editedData]);
      setRows([...rows, editedData]);
    }
  };

  const handleEdit = (row: RiskTracking) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    // Implement your delete logic here, e.g., make an API call to delete the item
    // After successful deletion, update your data
    const updatedData = rows.filter((row) => row.id !== id);
    setRiskTrackingList(updatedData);
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
        },
      }}
      key={rows.length}
    >
      <legend>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
          Add RiskTracking
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
      <RiskTrackingModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        //@ts-ignore
        rowData={selectedRow}
      />
    </Box>
  );
};

export default RiskTrackingTable;
