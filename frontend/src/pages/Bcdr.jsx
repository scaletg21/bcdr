//import { ReadBlog } from './pages/ReadBlog'
import { useState } from "react"
import Button from 'react-bootstrap/Button';
import scaleLogoBig from '../assets/images/scale-logo-pp.png'
import imgExplosion from '../assets/images/explosion.png'
import { useNavigate } from 'react-router-dom';






export function Bcdr () {

    const myStyle = {
        width: 300,
        padding: 2, // React automatically adds "px" for unitless number values
      }
    
    const navigate = useNavigate()

    
    return (

        <main className="auth-bcdr-wrapper">
            <div className="auth-bcdr-content-inner">
                <div className="auth-bcdr-content-wrapper">
                    <div className="auth-img">
                        <img src={scaleLogoBig} alt="" className="img-fluid"></img>
                    </div>
                    <div className="auth-title">
                       <h1> BCDR ASSESMENT </h1> 
                       <span>Business Continuity & Disaster Recovery</span>

                    </div>
                </div>
            </div>
            <div className="auth-bcdr-sidebar-inner">
                <div className="auth-bcdr-card-wrapper">
                    <div className="auth-bcdr-card p-sm-5">
                        <div className="mb-5">
                            <img src={imgExplosion} style={myStyle} alt="Disaster"></img>
                        </div>

                        <h1 className="fs-30 fw-bolder mb-4">TOTAL DESTRUCTION!!!</h1>
                        <p className="fs-13 fw-medium text-muted">
                            <b>It is now beyond the "Zero Hour"</b> and incidents from several internal employees have been reported. System are beginning to be compromised. Chaos and panic begins to set as the IT organization takes action! 
                        </p>
                        <p className="fs-13 fw-medium text-muted">
                        We are going to begin the simulation and the answers to the following questions will help determine if the readiness of your organization. 
                        </p>
                        <p className="fs-13 fw-medium text-muted">
                        We will label three stages of an event:
                        </p>                   
                        <h2 className="text-center">IDENTIFY, REACT, RESOLVE, RECOVER</h2>

                        <div className="mb-3 mt-3 d-grid gap-2">
                            <Button variant="primary" size="lg" type="button" onClick={() => navigate('/Step0')}>Let's Get Started!</Button>
                        </div>
                    
                    
                    </div>

                    
                </div>
            </div>
                
            


        </main>
       
                
                


    )
}