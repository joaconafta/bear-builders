import React from 'react'
import styles from './newMomment.module.scss'
import { Box, TextField, Select, SelectChangeEvent, Checkbox, ListItemText, MenuItem, OutlinedInput } from '@mui/material'
const NewMomment = () => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
      <div className={styles.title}>
                <p>New Event</p>
            </div>
        <div className={styles.inputs}>
          <TextField id="outlined-basic" label="Search" variant="outlined" size="small" fullWidth className={styles.input} />
          <TextField id="outlined-basic" label="Search" variant="outlined" size="small"  fullWidth className={styles.input} />
          <TextField
          placeholder="MultiLine with rows: 2 and rowsMax: 4"
          multiline
          rows={2}
          maxRows={6}
          fullWidth
          id="outlined-basic" label="Search" variant="outlined"
        />
        </div>
        <div className={styles.buttons}>
                <button>Cancel</button>
                <button>Confirm</button>
            </div>
      </div>
      
    </div>
  )
}

export default NewMomment