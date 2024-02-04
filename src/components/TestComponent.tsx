// AutocompleteForm.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, Toolbar } from '@mui/material';

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];

const AutocompleteForm = () => {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        // Handle form submission here
        console.log('Selected Option:', data.selectedOption);
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Toolbar/>
            <Controller
                name="selectedOption"
                control={control}
                //defaultValue={null}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        options={options}
                        getOptionLabel={(option) => {
                            if (option) {
                                console.log(JSON.stringify(option));
                                return option.label;
                            } else return null;
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Option" InputLabelProps={{ shrink: true }} />
                        )}
                    />
                )}
            />
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default AutocompleteForm;
