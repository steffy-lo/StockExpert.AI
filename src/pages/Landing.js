import ParticlesJS from '../components/ParticlesJS';
import '../App.css';
import React, {useState, useEffect} from 'react';
import { Container } from '@material-ui/core';
import Typewriter from 'react-simple-typewriter';
import 'react-simple-typewriter/dist/index.css';
import Button from '../components/Button';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {Link} from 'react-router-dom';

export default function Landing({forwardedRef, mainRef}){
    const [component, setComponent] = useState();
  
    const handleScroll = () =>{
      if(component !== undefined){
        window.scrollTo({
          top: component.offsetTop,
          left: 0,
          behavior: "smooth"
        });
      }
    };
  
    useEffect(()=>{
      if(component !== undefined){
        window.scrollTo({
          top: component.offsetTop,
          left: 0,
          behavior: "smooth"
        });
      }
    },[component])

    return(
        <div ref={forwardedRef}>
            <ParticlesJS/>
            <Container className="header">
                <h1 style={{fontSize:"2.8rem"}}>Welcome to StockExpert<span style={{color:"#7469ff"}}>.AI</span></h1>
                <h1 style={{fontWeight: 'normal' }}>Your intelligent stock sentimental analysis expert</h1>
                <h1 style={{ fontSize:"1.5rem",paddingTop: '1rem', fontWeight: '200'}}
                >
                    Built with {' '}
                    <span style={{ color: '#fff', fontWeight: '300' }}>
                    {/* Style will be inherited from the parent element */}
                    <Typewriter
                        loop
                        cursor
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                        words={["expert.ai's NLP API", "React.js", "Finnhub.io"]}
                    />
                    </span>
                </h1>
                <Link className="link" to="/signin">
                <Button style={{marginTop:"1.2rem", padding:"0.3rem 2.5rem",fontSize: "1.2rem"}}>Sign Up</Button>
                </Link>
                
                
            </Container>
            <div className="demo-div">
                <div className="demo">
                <Link className="link" to="/#main" onClick={()=>{setComponent(mainRef.current); handleScroll()}}>
                    <h1>Try a Demo</h1>
                    <ArrowDownwardIcon style={{ color: "white" }}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}