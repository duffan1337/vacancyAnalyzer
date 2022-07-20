import React from "react"
import './Search.css'
import { useState } from "react";

export const Search =({dispatch,getAllVacancies})=>{

    const [message, setMessage] = useState("");

    return(
        <header className="App-header">
        <input className="searchInput" 
         type="text"
         value={message}
         placeholder="Введите название вакансии"
         onChange={(e) => setMessage(e.target.value)}></input>
        <button className="sendButton" onClick={()=>{dispatch(getAllVacancies(message))
         }}>Отправить</button>
       </header>
    )
}