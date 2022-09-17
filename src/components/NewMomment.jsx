import React from 'react'
import styles from './newMomment.module.scss'
import { Box, TextField, Select, SelectChangeEvent, Checkbox, ListItemText, MenuItem, OutlinedInput } from '@mui/material'
const NewMomment = () => {
  return (
    <div className={styles.modalContainer}>
        <div className={styles.modal}>
        <div>
        <TextField id="outlined-basic" label="Search" variant="outlined" size="small" className={styles.input} />
        </div>
        <TextField id="outlined-basic" label="Search" variant="outlined" size="small" className={styles.input} />
        </div>
        <div>
        <TextField
  placeholder="MultiLine with rows: 2 and rowsMax: 4"
  multiline
  rows={2}
  maxRows={4}
/>
        </div>
    </div>
  )
}

export default NewMomment