import React, { useState, useEffect } from 'react';
import '../App.css';
import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import Button from '../components/Button';

export default function History({user}){
    const [history, setHistory] = useState([]);
    const [mean, setMean] = useState([]);

    useEffect(async()=>{
        let meanArr = [];
        user.history.map(data=>{
            let mean = calculateMean(data.sentiment);
            meanArr.push(mean);
        })
        await setMean(meanArr);
        await setHistory(user.history);
    },[])
    const calculateMean = (result) =>{
        let sum = result.reduce((acc,currentValue)=>{
          return acc + currentValue.overall;
        },0)
        return (sum/15).toFixed(2);
    }


    return (
        <div style={{color:"white", display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
            <p style={{fontSize:"1.2rem"}}>My History</p>
        <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:700}} align="center">Stock</TableCell>
            <TableCell style={{fontWeight:700}} align="center">Sentiment</TableCell>
            <TableCell style={{fontWeight:700}} align="center">See Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{row.stock.symbol}</TableCell>
              <TableCell align="center">{mean[index]}</TableCell>
              <TableCell align="center"><Button>See Details</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}