import React, { useState } from 'react'
import { Box, TextField, Select, SelectChangeEvent, Checkbox, ListItemText, MenuItem, OutlinedInput } from '@mui/material'
import styles from './filtersBox.module.scss'
const FilstersBox = () => {
    const [categories, setCategories] = useState([])
    const cats = [
        'Profiles',
        'Comida',
        'Tech',
        'Futbol'
    ];

    const handleCats = (event) => {
        const {
            target: { value },
        } = event;
        setCategories(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <Box className={styles.box}>
            <Box className={styles.boxs}>
                <TextField id="outlined-basic" label="Search" variant="outlined" size="small" className={styles.input} />
            </Box>
            <Box className={styles.boxs}>
                <label htmlFor=""></label>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={categories}
                    onChange={handleCats}
                    input={<OutlinedInput/>}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>Categories</em>;
                        }
                        return selected.join(', ');
                    }}

                >
                    <MenuItem disabled value="">
                        <em>Categories</em>
                    </MenuItem>
                    {cats.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                            <Checkbox checked={categories.indexOf(cat) > -1} />
                            <ListItemText primary={cat} />
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        </Box>
    )
}

export default FilstersBox