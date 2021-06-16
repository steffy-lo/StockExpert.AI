import React, { useState, useEffect } from 'react';
import '../App.css';
import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import Button from '../components/Button';

export default function Watchlist({user}){
    const [watchlist, setWatchlist] = useState([]);

    useEffect(()=> {
        if (user.watchlist) {
            setWatchlist(user.watchlist)
            console.log(user.watchlist)
        }
    },[user])

    return (
        <div style={{color:"white", display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
            <p style={{fontSize:"1.2rem"}}>My Watchlist</p>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:700}} align="center">Stock</TableCell>
                            <TableCell style={{fontWeight:700}} align="center">Price</TableCell>
                            <TableCell style={{fontWeight:700}} align="center">Open</TableCell>
                            <TableCell style={{fontWeight:700}} align="center">High</TableCell>
                            <TableCell style={{fontWeight:700}} align="center">Low</TableCell>
                            <TableCell style={{fontWeight:700}} align="center">Previous Close</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {watchlist.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{row.symbol}</TableCell>
                                <TableCell align="center">{row.c}</TableCell>
                                <TableCell align="center">{row.o}</TableCell>
                                <TableCell align="center">{row.h}</TableCell>
                                <TableCell align="center">{row.l}</TableCell>
                                <TableCell align="center">{row.pc}</TableCell>
                                <TableCell align="center"><Button>Run Analysis</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}