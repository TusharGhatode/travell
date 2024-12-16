
import React, { useState, useEffect } from "react";

const App = () => {
  let [second, setSecond] = useState(0);
  
  const [stopWatch, setStopWatch] = useState(false);


  useEffect(()=>{
    let timer = null
    if(stopWatch){
     timer = setInterval(() => {
        setSecond(second++);
      }, [1000]);
    }


    return ()=> clearInterval(timer)

  },[stopWatch])

  const start = () => {
    setStopWatch(true);
   
  };

  const stop = () => {
    setStopWatch(false);
    
    
  };

  const reset = () => {
    setStopWatch(false);
    setSecond(0);
  };

  return (
    <div className="m-8 h-screen items-center ">
      <div className="flex flex-wrap justify-center items-center">
        <input
          type="text"
          readOnly
          value={second}
          className="bg-gray-300 text-center font-extrabold  border-none rounded-lg "
        />
      </div>

      <div className="flex flex-wrap justify-center">
        <button
          className="bg-green-500 text-white w-32 mt-2 mr-2 cursor-pointer p-1.5 rounded-lg"
          onClick={start}
        >
          Start
        </button>
        <button
          className="bg-red-500 text-white w-32 mt-2 mr-2 cursor-pointer p-1.5 rounded-lg"
          onClick={stop}
        >
          Stop
        </button>
        <button
          className="bg-yellow-500 text-white w-32 mt-2 mr-2 cursor-pointer p-1.5 rounded-lg"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
