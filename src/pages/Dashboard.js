import React, {useState, useEffect, useRef} from 'react';
import Amplify, {Auth} from 'aws-amplify';
import awsExports from '../aws-exports';
import { withAuthenticator} from '@aws-amplify/ui-react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../App.css';
import {Button, Popper, Grow, MenuItem, ClickAwayListener, Paper, MenuList} from '@material-ui/core';
import {addUser} from "../actions/service";
import Main from "./Main";

Amplify.configure(awsExports)

function Dashboard() {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
  

    useEffect(async()=>{
        let user =  await Auth.currentUserInfo();
        console.log(user)
        if (user) {
            const res = await addUser(user.attributes.email)
            user = {...user, ...res}
        }
        setUser(user);
    }, [])

    
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);

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
                <div>
                    <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    >
                    <p style={{textTransform:"none", color:"white"}}>{user.attributes.email}</p><ExpandMoreIcon style={{ color: "white"}}/>
                    </Button>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                            <MenuItem onClick={handleClose}>Watchlist</MenuItem>
                            <MenuItem onClick={handleClose}>History</MenuItem>
                            <MenuItem onClick={signOut}>Sign Out</MenuItem>
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                    </Popper>
                </div>
            </span>:null
        }

            </div>
        </div>
            {!!user && <Main user={user}/>}
    </>
    )
}

export default withAuthenticator(Dashboard)