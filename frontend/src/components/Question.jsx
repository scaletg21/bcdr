import React from "react"




export function Question(props) {
    
   

    return (
       
    <div>
        <div className="card-body text-center">
            <h4>{props.category}</h4>
        </div>
        <h2>{props.question}</h2>

    </div>
    )
    
}