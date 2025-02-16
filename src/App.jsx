import { Typography } from '@mui/material';
import './App.css';
import UploadTableForm from './uploadFile';

function App() {
  return (
    <div className="App" style={{ boder:"10px solid black"}}>
      <div style={{ position:'absolute',backgroundColor: 'transparent', width:'100%',  display:'flex', alignItems:'center',justifyContent:'center'}}>
      <span style={{ marginTop:10 , fontSize:'1.2rem', backgroundColor: 'white' , borderRadius:10 ,padding:"5px 15px 5px 15px" }}
        > SQL Validation (Deepak Patil)</span>
        </div>
     <UploadTableForm/>
    </div>
  );
}

export default App;
