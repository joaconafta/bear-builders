import styles from './starModal.module.scss'
import { Rating } from '@mui/material'
import React, { useState } from 'react'
import { Box, TextField, Select, SelectChangeEvent, Checkbox, ListItemText, MenuItem, OutlinedInput } from '@mui/material'
// import { uploadToIpfs } from '../services/IpfsService'
import { createPost } from '../services/PostService'
import useAccount from '../hooks/useAccount'
import { LoadingButton } from '@mui/lab'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { uploadToIpfs } from '../services/IpfsService'
import { useSnackbar } from 'notistack'
import { createComment } from '../services/CommentService'
import { useParams } from 'react-router-dom'

const StarModal = ({handleModal}) => {
    const { profile } = useAccount()
    const { id } = useParams();


    const [rank, setRank] = useState(2.5)
    const { promiseInProgress } = usePromiseTracker({ area: 'post' })

    const [body, setBody] = useState("")
    const { enqueueSnackbar } = useSnackbar()

    const handleReview = async () => {
        try {
            console.log({rank,body,id})
          const contentUri = await trackPromise(uploadToIpfs(rank, '', body,true), 'comment')
          console.log(contentUri)
           await trackPromise(createComment(profile.id, contentUri, id), "comment")
           handleModal()
           enqueueSnackbar('Comment created', { variant: 'success' }) 
        } catch (error) {
          console.log(error)
          enqueueSnackbar('Please relogin', { variant: 'error' }) 
        }
     }

  return (
    <div className={styles.modalContainer}>
        <div className={styles.modal}>
            <div className={styles.title}>
                <p>Star This</p>
            </div>
            <div className={styles.valuesDiv}>
            <Rating name="half-rating" value={rank}  size='large' onChange={(event) => setRank(parseInt(event.target.value))} />
            <TextField
            multiline
            rows={4}
            maxRows={6}
            fullWidth value={body} 
            onChange={(event) => setBody(event.target.value)} 
            id="outlined-basic" label="Review" variant="outlined"
          />            </div>
            <div className={styles.buttons}>
                <button onClick={handleModal}>Cancel</button>
                <LoadingButton loading={promiseInProgress} onClick={()=> handleReview()}>{promiseInProgress? "": "Confirm"}</LoadingButton>
            </div>
        </div>

    </div>
  )
}

export default StarModal