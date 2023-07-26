import { useState } from "react"

const Homepage = (props : {name: string}) : any => {
  const [text, setText] = useState("");

  return (
    <>
    
      <h1>hiiiiiiiii {props.name}</h1>
    </>
  );
}

export default Homepage;
