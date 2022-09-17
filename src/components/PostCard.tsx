import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import { ProfileType } from '../types/ProfileType'
import { Rating } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

interface ResponsiveAppBarProps {
  title: string
  profile: ProfileType
  content: string
}

const PostCard: React.FC<ResponsiveAppBarProps> = ({ content, profile, title }) => {
  const {id : any} = useParams()
  const navigate : any = useNavigate()
  return (
    <AppBar sx={{ background: 'white', borderRadius: 2, padding: 1 }} position="static" onClick={() => navigate(`/memo/${profile.id}`)}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0, display: 'flex', gap: 2 }}>
            <IconButton size="large" sx={{ p: 0 }}>
              <Avatar
                alt="Remy Sharp"
                sx={{ width: 60, height: 60 }}
                src={profile.picture ? profile.picture.original.url : 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX'}
              />
            </IconButton>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography sx={{ color: 'black', fontWeight: 500, fontSize: 18 }}>{title}</Typography>
                <Typography sx={{ color: 'black', fontSize: 14 }}>{profile.handle}</Typography>
              </Box>
              <Typography sx={{ color: 'black' }}>{content}</Typography>

              {/*   <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default PostCard
