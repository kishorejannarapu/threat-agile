//@ts-ignore
import Recat from "react";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IndividualRiskCategory from "../../types/IndividualRiskCategory";
import IndividualRiskCategoryModal from "./IndividualRiskCategoryModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

interface IndividualRiskCategoryTableProps {
  individualRiskCategoriesList: IndividualRiskCategory[];
  setIndividualRiskCategoriesList: (newState: IndividualRiskCategory[]) => void;
}

const IndividualRiskCategoriesTable: React.FC<IndividualRiskCategoryTableProps> = ({
  individualRiskCategoriesList,
  setIndividualRiskCategoriesList,
}) => {
  const [rows, setRows] = useState<IndividualRiskCategory[]>(individualRiskCategoriesList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IndividualRiskCategory | null>(null);

  const handleAddClick = () => {
    setSelectedRow(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (editedData: IndividualRiskCategory) => {
    if (editedData["id"] == undefined) {
      editedData.id = editedData.name.split(" ").join("-");
      console.log("edited Data =" + JSON.stringify(editedData));
    }

    if (selectedRow) {
      // Edit existing row
      const updatedData = rows.map((row) => (row.id === selectedRow.id ? editedData : row));
      setIndividualRiskCategoriesList(updatedData);
      setRows(updatedData);
    } else {
      // Add new row
      setIndividualRiskCategoriesList([...rows, editedData]);
      setRows([...rows, editedData]);
    }
  };

  const handleEdit = (row: IndividualRiskCategory) => {
    console.log("edit row =" + JSON.stringify(row));
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    // Implement your delete logic here, e.g., make an API call to delete the item
    // After successful deletion, update your data
    const updatedData = rows.filter((row) => row.id !== id);
    setIndividualRiskCategoriesList(updatedData);
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
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
          Add IndividualRiskCategory
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
      <IndividualRiskCategoryModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        //@ts-ignore
        rowData={selectedRow}
      />
    </Box>
  );
};

export default IndividualRiskCategoriesTable;
