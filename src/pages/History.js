import React, { useState, useEffect } from 'react';
import {getUser} from '../actions/service';
import '../App.css';

export default function History({user}){
    const [history, setHistory] = useState([]);

    useEffect(async ()=>{
        let res = await setHistory(user.history);
        console.log(history)
    },[])
    return (
        <div style={{color:"white", display:"flex", justifyContent:"center"}}>
            <p style={{fontSize:"1.2rem"}}>My History</p>
            {history}
        </div>
    )
}