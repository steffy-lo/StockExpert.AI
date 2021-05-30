
import Particles from 'react-particles-js';
export default function ParticlesJS(){
  
return (
    <div style={{
        backgroundColor:"#282c34"
      }}>
    <Particles
    params={{
	    "particles": {
	        "number": {
	            "value": 100,
                density: {
                enable: true,
                value_area: 1803.4120608655228
                }
	        },
	        "size": {
	            "value": 2
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": false
	            }
	        }
	    },
        "density_auto":true
	}} />
    </div>
    
);
    
 
}