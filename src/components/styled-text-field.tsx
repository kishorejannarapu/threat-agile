import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledTextField1 = styled(TextField)(({ theme }) => ({
    '& .MuiInputLabel-root': {
        // Label styles (optional)
        display: 'block',
        marginBottom: theme.spacing(1), // Adjust spacing as needed
        color: theme.palette.primary.main,
        fontSize: '14px',
    },
    '& .MuiOutlinedInput-root': { // Target outlined variant (adapt for other variants)
        borderRadius: 3,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #CCCCCC',
        fontSize: 12,
        padding: '6px 8px',
        '& fieldset': {
            borderRadius: 3, // Maintain consistent border
        },
        '&:focus': {
            borderColor: '#80bdff',
        },
    },
}));

const StyledTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputLabel-shrink": {
        marginTop: "-20px",
        marginLeft: '-10px',
        fontWeight: "bold",
        fontSize: "22px",
    },
    "& .MuiOutlinedInput-notchedOutline + legend": {
        visibility:'none'
    }
    // "& label.Mui-focused": {
    //   color: "#333",
    // },
    // "& .MuiInput-underline:after": {
    //   borderBottomColor: "#333",
    // },
}));

// const StyledTextField=() =>{
//   return (
//     <div>
//       <Box mb={2}>
//         <StyledTextField
//           placeholder="Title"
//           label="Title"
//           id="title-input"
//           fullWidth
//           InputProps={{
//             disableUnderline: true,
//           }}
//           InputLabelProps={{
//             shrink: true,
//           }}
//           size="medium"
//         />
//       </Box>
//       <StyledTextField
//         placeholder="Add a description"
//         label="Description"
//         id="description-input"
//         fullWidth
//         multiline
//         InputProps={{
//           disableUnderline: true,
//         }}
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//       <StyledTextField
//         placeholder="Add a description"
//         label="Description"
//         id="description-input"
//         fullWidth
//         multiline
//         InputProps={{
//           disableUnderline: true,
//         }}
//         InputLabelProps={{
//           shrink: true,
//         }}
//         disabled
//         value="some value"
//         size="medium"
//       />
//     </div>
//   );
// }

export default StyledTextField;
