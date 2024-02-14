
import '@testing-library/jest-dom/vitest';
import { test, expect } from 'vitest'
import DateField from '../DateField';
import { prettyDOM, render, renderHook, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const { result } = renderHook(() => useForm())
const wrapper: React.FC<any> = ({ children }) => {
    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
    </LocalizationProvider>)
};

test('Date Field Render', () => {
    render(<DateField name="date" label="Date of the Model" control={result.current.control} />, { wrapper });
    console.debug(prettyDOM())
    expect(screen.getByPlaceholderText("YYYY-MM-DD")).toBeInTheDocument();
});