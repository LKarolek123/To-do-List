import {useState} from 'react'
import Card from './Card.jsx';


const stylesheet={
    border:"2px solid grey",
    borderRadius: "10px",
    width:"80%",
    marginLeft: "auto",
    marginRight: "auto",
    margin: "10px auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    minHeight: "50vh",
}
const Leaderboard = () =>{
    
    return(
        <div className= "leaderboard" style={stylesheet}>

            <Card />
           

        </div>
   
    );
   
}
export default Leaderboard