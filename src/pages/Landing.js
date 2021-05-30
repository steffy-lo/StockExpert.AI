import ParticlesJS from '../components/ParticlesJS';
import '../App.css';
import { Container, Box } from '@material-ui/core';
import Typewriter from 'react-simple-typewriter'
import 'react-simple-typewriter/dist/index.css'

export default function Landing(){
    return(
        <div>
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
            </Container>
        </div>
    )
}