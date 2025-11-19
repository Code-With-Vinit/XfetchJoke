import React,{useEffect, useState} from "react"
import "./App.css"

function App() {

  const[joke,setJoke]=useState("");
  const [btnPressed,setBtnPressed]= useState(false);
  const [isFetching,setIsFectching]=useState(false);
  const [error,setError]=useState(false);
  const [initial,setInitial]=useState(true);


  useEffect(()=>{

    const getJoke=async()=>{

      try {
        setIsFectching(true)
        let response= await fetch(`https://official-joke-api.appspot.com/random_joke`);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

        let data= await response.json();
        setJoke(data);
        setError(false);
        console.log(data.setup,data.punchline);
    } catch (e) {
      setError(true);
      console.log(e)
    }
    finally{
      setIsFectching(false);
      setBtnPressed(false);
      setInitial(false);
    }
    }

    if(btnPressed)
    {
      getJoke();
    }
    

  },[btnPressed])

 
  return (
    <>
    <div className="container">
       <h1>Random Joke</h1>
       <span>Click the button to fetch a fresh one.</span>
       <br />
       <button onClick={()=>setBtnPressed(true)} disabled={isFetching} className="btn">{isFetching?"Fetching...":"Fetch joke"}</button>
       <br />
        {isFetching?"":
         error?
          <div className="child">
            <p style={{color:"red"}}>Could not fetch a joke. Try again.</p>
            <p style={{marginTop:0}}><button onClick={()=>setBtnPressed(true)} className="btn">Try Again</button></p>
          </div>
          :
          <div className="child">
           {initial?   
           <div className="child">
            <p>No Joke Yet.</p>
           </div>
          :
          <div className="child">
            <p>{joke.setup}
              <br /></p>
            <p style={{marginTop:0
            }}><b>{joke.punchline}</b></p>
          </div>}

          </div>}
        
    </div> 
   
    </>
  )
}

export default App
