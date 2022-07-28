import React, {useState , useEffect} from 'react'


export default function Meme() {
    const [meme , setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1g8my4.jpg"
    })
    const [allMeme , setAllMeme] = React.useState([])

    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMeme(data.data.memes))
    },[])

    function getRandomUrl(){
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[randomNumber].url
        setMeme(prevMeme=>({
            ...prevMeme,
            randomImage: url
        }))
    }


        function handleChange(event){
            const {name, value} = event.target
            setMeme(prevMeme=>({
                ...prevMeme,
                [name]: value
            }))
        }
  return (
   <main>
        <div className='meme-form'>
            <input 
                type="text"
                placeholder='First Text'
                className='inputs'
                name="topText"
                value={meme.topText}
                onChange={handleChange}
            />
            <input 
                type="text"
                placeholder='Second Text'
                className='inputs'
                name="bottomText"
                value={meme.bottomText}
                onChange={handleChange}
            />
            <button 
                className='meme-button'
                onClick={getRandomUrl}>
                 Get a new meme image  🖼
            </button>
        </div>

        <div className='meme'>
            <img src={meme.randomImage} className="meme--image"/>
            <h1 className='meme--text-top'>{meme.topText}</h1>
            <h1 className='meme--text-bottom'>{meme.bottomText}</h1>
        </div>
   </main>
  )
}
