import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';
import React, { useEffect } from 'react';

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
    filterOptions: (selectName: string, selectValue: string[] | string) => string[]
}

function MenuItems(props: IProps) {
    const {
        items,
        title,
        setSelections,
        selections,
        filterOptions
    } = props;

    useEffect(() => {
        console.log('child useeffect')
    }, [])

    const handleChange = (event: SelectChangeEvent<string[] | string>) => {
        const { name, value } = event.target;
        const selectName = name.toLowerCase();
        const selectValue: string | string[] = value !== undefined ? value : [];
        filterOptions(selectName, selectValue);


        setSelections(selectValue)
        // console.log(selectName);
        // console.log('selections1', selections, 'e target', event.target)
    };

    return (

        <FormControl variant="filled">
            <InputLabel>{title}</InputLabel>
            <Select
                multiple
                value={selections}
                onChange={(e) => handleChange(e)}
                name={title}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {typeof selected !== 'string' && selected.map((value) => (
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
