import * as React from 'react';
import './statBlock.css'

export const StatBlock =({statElement, statName})=>{
      
    return(
        <div className="Stat-block">
             <p className="Stat-name">{statName}</p>
             <h1 className="Stat-element">{statElement}</h1>
        </div>
    )
}