import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';
import React from 'react';

// interface ISelection {
//     name: string
//     value: string;
// }
interface IProps {
    items: string[];
    // handleChange: (event: SelectChangeEvent<string[]>) => void;
    selections: string[] | string;
    title?: string;
    setSelections: React.Dispatch<React.SetStateAction<string[] | string>>;
    selectedCountries?: string[];
    filterOptions: ()=> void
}

function MenuItems(props: IProps) {
    const {
        items,
        title,
        setSelections,
        selections,
        selectedCountries,
        filterOptions
    } = props;



    const handleChange = (event: SelectChangeEvent<string[] | string>) => {
        const { target: { value } } = event;
        const selectName = event.target.name.toLowerCase();
        const selectValue: string | string[] = value !== undefined ? value : [];
        switch (selectName){
              case 'country':
                if(selectedCountries!== undefined && selectedCountries.length > 0){
                    filterOptions();
                }
                 break;
                 default: 
                 console.log('default');
                }

        setSelections(selectValue)
        console.log('selections1', selections, 'e target', event.target)
    };

    return (

        <FormControl variant="filled">
            <InputLabel>{title}</InputLabel>
            <Select
                multiple
                value={selections}
                onChange={handleChange}
                name={title}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {typeof selected !=='string'&& selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}

            >
                {items.map(item => (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    );
}
export default MenuItems;
