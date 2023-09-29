import {
    Checkbox,
    FormGroup,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';
import React, { useState, useEffect } from 'react';

interface IProps {
    items: string[] | number[];
    handleChange: (event: SelectChangeEvent<string[]>) => void;
    selections: string[];
}

function MenuItems(props: IProps) {
    const { items, handleChange, selections } = props;

    return (
        <div>

            <FormGroup>
                <InputLabel id="demo-simple-select-label">Request Type(s)</InputLabel>
                <Select
                    value={selections}
                    label="Age"
                    onChange={handleChange}
                    multiple
                    renderValue={(selections) => selections.join(',')}
                >
                    {items.map(item => (
                        <MenuItem key={item} value={item}>
                            <ListItemIcon>
                                <Checkbox checked={selections.indexOf(item) > -1} />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                        </MenuItem>
                    ))}
                </Select>
            </FormGroup>




        </div>

    );
}
export default MenuItems;
