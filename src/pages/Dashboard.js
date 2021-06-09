import React, {useState, useEffect} from 'react';
import Amplify, {Auth} from 'aws-amplify';
import awsExports from '../aws-exports';
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'
import { Container } from '@material-ui/core';
import '../App.css';

Amplify.configure(awsExports)

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(async()=>{
        let user =  await Auth.currentUserInfo();
        console.log(user)
        setUser(user);
    }, [])

    return (
    <Container className="header">
        <AmplifySignOut/>
        {!!user?
            <h3>Welcome {user.attributes.email}!</h3>:null
        }
        
    </Container>
    )
}

export default withAuthenticator(Dashboard)