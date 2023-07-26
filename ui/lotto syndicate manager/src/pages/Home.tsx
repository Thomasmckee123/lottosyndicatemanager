import { useState } from "react";
import { Homepage } from "../components"
import useCountStore from "../stores/count";

const Home= () =>{
    const [text, setText] = useState("");
    const count : number = useCountStore((state: any) => state.count);
    const increase : any = useCountStore((state: any) => state.increasePopulation);
    return(
 <>
 <Homepage name={text}/>
         {count}
    <button onClick={increase}>increasePopulation</button>
    <input type="text" value = {text} onChange={((e) => setText(e.currentTarget.value))}></input>
  </>)
}
export default Home