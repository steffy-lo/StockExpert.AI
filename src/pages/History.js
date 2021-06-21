import React, { useState, useEffect } from 'react';
import '../App.css';
import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import Button from '../components/Button';
import Result from "../components/Result";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function History({user, setUser}){
    const [history, setHistory] = useState([]);
    const [mean, setMean] = useState([]);
    const [detailIndex, setDetailIndex] = useState(-1);

    useEffect(async()=>{
        let meanArr = [];
        user.history.map(data=>{
            let mean = calculateMean(data.sentiment);
            meanArr.push(mean);
        })
        await setMean(meanArr);
        await setHistory(user.history);
        console.log(user)
    },[user])

    const calculateMean = (result) =>{
        let sum = result.reduce((acc,currentValue)=>{
          return acc + currentValue.overall;
        },0)
        return (sum/15).toFixed(2);
    }


    return detailIndex < 0 ? (
        <div style={{color:"white", display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
            <p style={{fontSize:"1.2rem"}}>My History</p>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontWeight:700}} align="center">Date</TableCell>
                    <TableCell style={{fontWeight:700}} align="center">Stock</TableCell>
                    <TableCell style={{fontWeight:700}} align="center">Sentiment</TableCell>
                    <TableCell style={{fontWeight:700}} align="center">See Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{row.createdAt.slice(0, 10)}</TableCell>
                      <TableCell align="center">{row.stock.symbol}</TableCell>
                      <TableCell align="center">{mean[index]}</TableCell>
                      <TableCell align="center"><Button onClick={() => setDetailIndex(index)}>See Details</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
    ) : (!!user.history ?
        <div className="App">
            <ArrowBackIcon style={{ position: "absolute", top: "10%", left: "5%", cursor: "pointer"}} fontSize={"large"} onClick={() => setDetailIndex(-1)}/>
            <p style={{ fontSize: "22px" }} >Here are the results for {user.history[detailIndex].stock.symbol} stock.</p>
            <Result news={user.history[detailIndex].articles} search={user.history[detailIndex].stock.symbol} user={user} setUser={setUser} history={detailIndex}/>
        </div>: null)
}