import React from "react"
import { useState } from "react";

export const Search =({dispatch,getAllVacancies})=>{

    const [message, setMessage] = useState("");

    return(
        <header className="App-header">
        <input className="searchInput" 
         type="text"
         value={message}
         placeholder="Введите сообщение"
         onChange={(e) => setMessage(e.target.value)}></input>
        <button className="sendButton" onClick={()=>{dispatch(getAllVacancies(message))
         }}>send</button>
       </header>
    )
}