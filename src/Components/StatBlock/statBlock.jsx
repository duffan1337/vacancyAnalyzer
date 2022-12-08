import * as React from 'react';
import './statBlock.css'

export const StatBlock =({statElement, statName, icon, isVisible})=>{
      
    return(
        <div className="Stat-block">
             <p className="Stat-name">{statName}</p>

            {isVisible ? <h1 className="Stat-element">{icon}{statElement}</h1> : ""}
        </div>
    )
}