import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Control, Controller } from "react-hook-form";

type DateFieldProps = {
  control: Control;
  name: string;
  label: string;
};
const DateField: React.FC<DateFieldProps> = ({ control, name, label }) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={dayjs(new Date())}
      render={({ field: { ref, onBlur, name, onChange, ...field }, fieldState }) => (
        <DatePicker
          {...field}
          inputRef={ref}
          label={label}
          onChange={onChange}
          format="YYYY-MM-DD"
          timezone="system"
          slotProps={{
            textField: {
              focused: true,
              size: "small",
              onBlur,
              name,
              error: !!fieldState?.error,
              helperText: fieldState?.error?.message,
            },
          }}
        />
      )}
    />
  );
};

export default DateField;
