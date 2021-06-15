import React, {useState, useEffect} from 'react';
import Amplify, {Auth} from 'aws-amplify';
import awsExports from '../aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../App.css';
import {Button, Menu, MenuItem} from '@material-ui/core';
import {addUser} from "../actions/service";

Amplify.configure(awsExports)

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(async() => {
        let user =  await Auth.currentUserInfo();
        if (user) {
            const res = await addUser(user.attributes.email)
            user = {...user, ...res}
        }
        setUser(user);
    }, [])

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    async function signOut() {
        try {
            await Auth.signOut().then(()=>{
                window.location.href = "/";
            })
        } catch (error) {
            console.log('Error signing out: ', error);
        }
    }

    return (
        <>
    <div className="dashboard-header">
        <div>
        <p style={{fontSize:"1.4rem", marginTop:'0.5em'}}>StockExpert<span style={{color:"#7469ff"}}>.AI</span></p>
        </div>
        <div>
        {!!user?
            <span className="dashboard-menu">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <p style={{textTransform:"none", color:"white"}}>{user.attributes.email}</p><ExpandMoreIcon style={{ color: "white"}}/>
                </Button>
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                <MenuItem onClick={handleClose}>Watchlist</MenuItem>
                <MenuItem onClick={handleClose}>History</MenuItem>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
                </Menu>
            </span>:null
        }

        </div>
    </div>
    
    
    </>
    )
}

export default withAuthenticator(Dashboard)