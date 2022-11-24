import { Box, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Button, Card } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios'
import Header from './components/Header';

function App() {
  const [data, setData] = useState() 
  const [url, setUrl] = useState('')
  const [user, setUser] = useState();
  const dataResult = localStorage.getItem('user')

  useEffect(() => {
    // const dataResult = localStorage.getItem('user')
    if (dataResult) {
      setUser(dataResult)
      const result = async() => {
        const data = await axios.get(`http://localhost:8000/getUser/${dataResult}`);
        setData(data.data.data.urls);
      }
      result()
    }
  },user)

  useEffect(() => {
    const result = async() => {
      const data = await axios.get('http://localhost:8000/');
      setData(data.data);
    }
    result();
  },[])

  const countClick = (short) => {
    const url = `http://localhost:8000/${short}`;
    window.location.href = url;
  }

  function createNew() {
    if (user) {
      axios.post('http://localhost:8000/userUrls', {
      full: url,
      username: user,
    });
    } else {
      axios.post('http://localhost:8000/shortUrls', {
        full: url,
      });
    }
  }
  return (
    <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '10%', paddingRight: '10%', backgroundColor: '#f9f9f9', margin: -10}}>
      <Header user={user}/>
      <Card style={{padding: 50, marginTop: 90, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Typography style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#505050'}}>
          Paste the URL to be shortened
        </Typography>
        <form action='http://localhost:8000/shortUrls' method='POST' style={{ display: 'flex', justifyContent: 'center'}}>
          <TextField onChange={(e) => setUrl(e.target.value)} 
          value={url} 
          type={'url'} 
          placeholder={'URL'} 
          style={{width: 800}}
          />
          <Button style={{
            marginLeft:10, width:100, color: 'white', backgroundColor:'#2c87c5', fontWeight:'bold'
            }} 
            type='submit' 
            variant="contained"
            onClick={() => createNew()}
            >
            Generate
          </Button>
        </form>
        <Typography style={{fontSize: 20, textAlign: 'center', marginTop: 20, color: '#505050'}}>
          Use our URL Shortener to create a shortened link making it easy to remember
        </Typography>
      </Card>
      <Card style={{marginTop: 20, padding: 20}}>
        <Typography style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: '#505050'}}>
          Public Urls
        </Typography>
        <Typography style={{fontSize: 20, textAlign: 'center', color: '#505050', marginBottom: 20}}>
          Your short Urls will be public here
        </Typography>
        <TableContainer>
          <TableHead style={{backgroundColor: '#2c87c5'}}>
            <TableCell style={{fontWeight: 'bold', width: '60%'}}>Full URL</TableCell>
            <TableCell align="center" style={{fontWeight: 'bold', width: '20%'}}>Short URL</TableCell>
            <TableCell align="center" style={{fontWeight: 'bold', width: '20%'}}>Clicks</TableCell>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <Fragment key={index}>
              <TableRow>
                <TableCell><a href={item.full}>{item.full}</a></TableCell>
                <TableCell align="center">
                  <p style={{textDecoration: 'underline', color: '2c87c5', cursor: 'pointer'}} 
                  onClick={() => countClick(item.short)}
                  >
                    {item.short}
                  </p>
                </TableCell>
                <TableCell align="center"><a>{item.clicks}</a></TableCell>
              </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </TableContainer>
      </Card>
      <Typography>

      </Typography>
    </Box>
  );
}

export default App;
