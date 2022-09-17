import React, { useState } from 'react'
import styles from './newMomment.module.scss'
import { Box, TextField, Select, SelectChangeEvent, Checkbox, ListItemText, MenuItem, OutlinedInput } from '@mui/material'
import { uploadToIpfs } from '../services/IpfsService'
import { createPost } from '../services/PostService'
import useAccount from '../hooks/useAccount'
import { LoadingButton } from '@mui/lab'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
const NewMomment = ({ handleModal, isProfile }) => {

  const { promiseInProgress } = usePromiseTracker({ area: 'post' })

  const { profile } = useAccount()

 const [title,setTitle] = useState('')
 
 const [categories, setCategories] = useState("")

 const [body, setBody] = useState("")

  const handlePost = async () => {
    try {
      const contentUri = await trackPromise(uploadToIpfs(title,categories,body), 'post')
      console.log(contentUri)
       await trackPromise(createPost(profile.id, contentUri), "post")
       handleModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <p>New Event</p>
        </div>
        <div className={styles.inputs}>
          <TextField id="outlined-basic" value={title} onChange={(event) => setTitle(event.target.value)} label="Title" variant="outlined" size="small" fullWidth className={styles.input} />
          <TextField id="outlined-basic"  value={categories} onChange={(event) => setCategories(event.target.value)}   label="Category" variant="outlined" size="small" fullWidth className={styles.input} />
          <TextField
            multiline
            rows={4}
            maxRows={6}
            fullWidth value={body} 
            onChange={(event) => setBody(event.target.value)} 
            id="outlined-basic" label="Body" variant="outlined"
          />
        </div>
        <div className={styles.buttons}>
          {!isProfile && <button onClick={handleModal}>Cancel</button>}
          <LoadingButton loading={promiseInProgress} onClick={()=> handlePost()}>{promiseInProgress? "": "Confirm"}</LoadingButton>
        </div>
      </div>

    </div>
  )
}

export default NewMomment