import * as React from 'react';
import './search.css'
import { useState } from "react";
import { useSelector } from 'react-redux';

export const Search =({dispatch,getAllVacancies,currencies})=>{

    const [vacanciesName, setVacanciesName] = useState("");
    const {vacancyName}=useSelector((state)=>{
        return{
          vacancyName:state.vacancy.vacancyName
        };
      });
      
    return(
        <div className="header-wrapper">
          <div className="left-section">
            <input className="search-input" 
            type="text"
            value={vacanciesName}
            placeholder="Enter a vacancy"
            onChange={(e) => setVacanciesName(e.target.value)}></input>
            <button className="sendButton" onClick={()=>{dispatch(getAllVacancies(vacanciesName,currencies))
            }}>Search</button>
          </div>
          <div className="right-section">
            change theme
            <img className="changeThemeimg"></img>
          </div>
       </div>
    )
}