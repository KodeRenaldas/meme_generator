import React, {useState, useEffect} from "react";
import Header from "./components/Header"
import Main from "./components/Meme"
import "./style.css"

export default function App() {
    return (
        <div className="main">
            <Header/>
            <Main/>
        </div>
    )
}