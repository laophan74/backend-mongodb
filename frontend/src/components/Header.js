import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'

export default function Header({user}) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function Generate(param) {
    const result = await axios.get(`http://localhost:8000/getUser/${param}`);
    localStorage.setItem('data',result.data.data.urls);
  }

  async function login() {
    const a = await axios.post('http://localhost:8000/login', {
      username: username,
      password: password
    })
    if (a.data.errorCode === 0) {
      window.localStorage.setItem('user', a.data.username)
      Generate(a.data.username)
      handleClose()
      window.location.reload();
    }
  }

  async function handleLogout() {
    await axios.get('http://localhost:8000/logout')
    localStorage.clear()
    window.location.reload();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{background: 'white', height:65}}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: 'black', fontWeight: 'bold' }}
          >
            URL Shortener
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {
              !user ?
            <>
            <Button sx={{marginRight:1, width:125, color: 'gray', borderColor: 'lightgray'}} variant="outlined">
              Sign Up
            </Button>
            <div>
              <Button onClick={handleClickOpen} sx={{marginRight:1, width:125, color: 'white', backgroundColor:'#FE2C55', fontWeight:'bold'}} variant="contained">
                Log In
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please enter your information
                  </DialogContentText>
                    <TextField
                      onChange={(e) => setUsername(e.target.value)}
                      autoFocus
                      margin="dense"
                      label="Username"
                      variant="standard"
                      sx={{margin:2}}
                      />
                    <TextField
                      onChange={(e) => setPassword(e.target.value)}
                      margin="dense"
                      label="Password"
                      type="password"
                      variant="standard"
                      sx={{margin:2}}
                      />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => login()}>OK</Button>
                  </DialogActions>
              </Dialog>
            </div>
            </>
            : 
            <>
            <Typography style={{color: 'black', alignSelf: 'center', fontSize: 20, marginRight: 20}}>
              Hello {user}
            </Typography>
            <Button onClick={() => handleLogout()} sx={{marginRight:1, width:125, color: 'white', backgroundColor:'#FE2C55', fontWeight:'bold'}} variant="contained">
              Log Out
            </Button>
            </>
            }
            
          </Box>
        </Toolbar>
        </AppBar>
        </Box>
        );
}
