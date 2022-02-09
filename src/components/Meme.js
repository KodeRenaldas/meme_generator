import React, {useState, useEffect} from "react";

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        currentImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            currentImage: url
        }))
    }

    function changeText(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    const memeElements = allMemes.map(square => (
        <img key={square.id} src={square.url} className="box" onClick={() => {
            setMeme(prevMeme => ({
                ...prevMeme,
                currentImage: square.url
            }))
        }}/>
    ))
    return (
        <div className="memes">
            <div className="form">
                <input type="text" 
                placeholder="Top text" 
                name="topText" 
                className="form_input"
                value={meme.topText}
                onChange={changeText}
                />
                <input type="text" 
                placeholder="Bottom text" 
                name="bottomText" 
                className="form_input"
                value={meme.bottomText}
                onChange={changeText}
                />
                <button className="form_button" onClick={getMemeImage}>Get a new meme image</button>
            </div>
            <div className="meme">
                <img src={meme.currentImage} className="meme_image"/>
                <h2 className="meme_text top">{meme.topText}</h2>
                <h2 className="meme_text bottom">{meme.bottomText}</h2>
            </div>
            <div className="allMemes">
                {memeElements} 
            </div>
        </div>
    )
}