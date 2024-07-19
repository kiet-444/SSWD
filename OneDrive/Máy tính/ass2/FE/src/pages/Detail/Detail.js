import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Detail.css"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, TextField } from "@mui/material";
function Detail() {
    const [watch,setWatch]=useState({});
    const [comments,setComments]=useState([])
    const [comment, setComment] = useState({ rating: '', content: '' });
    const {id}=useParams();
    const handleChange = (e) => {
        setComment((prev) => ({
          ...prev,
          rating: e.target.value,
        }));
      };
      const handleChangeInput=(e)=>{
        setComment((prev) => ({
            ...prev,
            content: e.target.value,
          }));
      }
    useEffect(() => {
        axios
          .get(`http://localhost:5000/admin/watch/detail/${id}`)
          .then((res) => {
            console.log(res.data);
            setWatch(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);
   return(
    <div style={{display:"flex", alignItems:"center"}}>
        <img src={watch.image} width="30%" style={{minHeight:1200, objectFit:"contain", marginLeft:100,marginRight:100,marginTop:0}}/>
        <div style={{display:"flex", flexDirection:"column"}}>
            <h2 style={{fontWeight:"bold", marginTop:50, marginBottom:20}}>{"Name: "+watch.watchName}</h2>
            <h2 style={{fontWeight:"bold", marginBottom:20}}>{"Price: "+watch.price+ " VND"}</h2>
            <div style={{borderTop:"1px solid #333"}}>
            <h2 style={{marginTop:50, marginBottom:20}}>{"Order Code: "+watch._id}</h2>
            <h2 style={{marginBottom:20}} >{"Automatic: "+watch.automatic}</h2>
            <h2>{watch.watchDescription}</h2>
            <h2>{watch.comments?"Comment:"+watch.comments:"No Comments for this Watch"} </h2>          </div>
        
    <FormControl>
      <FormLabel   sx={{fontSize:30}} id="demo-controlled-radio-buttons-group">Rating</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={comment.rating}
        onChange={handleChange}
      >
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
      </RadioGroup>
    </FormControl>
    <TextField   sx={{fontSize:30}} label="comment" variant="outlined" onChange={handleChangeInput}/>
    <Button    variant="outlined" sx={{width:50, marginTop:5}}>Done</Button>
        </div>
        
    </div>
   )
}
export default Detail;