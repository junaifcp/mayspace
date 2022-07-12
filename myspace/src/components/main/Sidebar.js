import { Card, CardContent,  Grid,Typography,Button, Avatar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function Sidebar() {
  const cardStyle={
    color:'#817C7B'
  }
  return (
    <Grid  align='center' flex={1} p={2} sx={{display:{xs:'none',sm:'block'}}}>
      <Card sx={{ maxWidth: 345 }}>
        <Box sx={{backgroundImage:`url('https://imgs.search.brave.com/sg9ZTmwiBK5oBxtOOyYUcDjd-EG6s4gJceFPGHbE6bQ/rs:fit:600:337:1/g:ce/aHR0cHM6Ly90b21h/eGJsYWRlLmNvbS9p/bWFnZXMvODkzODcz/LmpwZw')`}}>

      <Avatar sx={{width:70,height:70,position:'relative' ,top:30}} src='https://imgs.search.brave.com/kXBB_PvvzpB709rouhzmcOTvRjpIJv2-cAMwHb1AJ2o/rs:fit:1080:1200:1/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L2h0LWltYWdlcy5j/b3VjaHN1cmZpbmcu/Y29tL3UvMjAxMzg2/NjkxOS82YmIxZGU4/ZC1lMzJiLTQ0NzMt/OWZlZC1hYzUwMmJk/MDU1OTY'
      
      />
      </Box>
      <CardContent sx={{margin:'20px 0 0 0'}}>
        <Typography gutterBottom variant="h5" component="div">
          Junaif
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <hr/>
      <Typography style={cardStyle} gutterBottom variant="h6" component="p">
          Following <br />
          35
        </Typography>
        <hr />
        <Typography style={cardStyle} gutterBottom variant="h6" component="div">
          Followers <br />
          46
        </Typography>
        <hr/>
        <br />
        <Button size="small">view profile</Button>
      <br /><br />
    </Card>
    </Grid>
  )
}

export default Sidebar