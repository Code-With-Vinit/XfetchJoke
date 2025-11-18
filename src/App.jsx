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
        {isFetching?(<div><b>Fetching...</b></div>):
        <div><button onClick={()=>setBtnPressed(true)} className="btn">Fetch joke</button>
          {initial ? <p>No Joke Yet.</p>:""}
          </div>}
         {error?
          <div className="child">
            {/* <button onClick={()=>setBtnPressed(true)} className="btn">Fetch joke</button> */}
            <p style={{color:"red"}}>Could not fetch a joke. Try again.</p>
            <p style={{marginTop:0}}><a onClick={()=>setBtnPressed(true)} href="#">Try Again</a></p>
          </div>
          :
          <div className="child">
            {/* <button onClick={()=>setBtnPressed(true)} className="btn">Fetch joke</button> */}
            <p>{joke.setup}
              <br /></p>
            <p style={{marginTop:0
            }}><b>{joke.punchline}</b></p>
          </div>}
        
    </div> 
   
    </>
  )
}

export default App
