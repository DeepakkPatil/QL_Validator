import { Typography } from '@mui/material';
import './App.css';
import UploadTableForm from './uploadFile';

function App() {
  return (
    <div className="App" style={{ boder:"10px solid black"}}>
      <div style={{ position:'absolute',backgroundColor: 'transparent', width:'100%',  display:'flex', alignItems:'center',justifyContent:'center'}}>
      <span style={{ marginTop:10 , fontSize:'1.2rem', border:'1px solid gray',
      backgroundColor: 'white' , borderRadius:10 ,padding:"10px 15px 10px 15px", fontWeight:400 }}
        > SQL Validation Field Reporting </span>
        </div>
     <UploadTableForm/>
    </div>
  );
}

export default App;
