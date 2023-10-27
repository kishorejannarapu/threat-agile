import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Control, Controller } from "react-hook-form";
import DropDownOptions from "../types/DropDownOptions";

const MultiSelect = (formControl: Control, name:string, options: DropDownOptions[], selectedOptions: string[]) => {
  return (
    <div>
      <Controller
        name={name}
        control={formControl}
        defaultValue={selectedOptions}
        render={({ field }) => (
          <Select {...field} labelId="options-label" multiple renderValue={(selected) => selected.join(", ")}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </div>
  );
};
export default MultiSelect;
