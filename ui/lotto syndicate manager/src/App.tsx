import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Link  } from 'react-router-dom';
import './App.css'

import About from './pages/About';
import Contact from './pages/contact';
import Home from './pages/Home';
import ActualHomePage from './pages/ActualHomePage';

function App() {
  const [text, setText] = useState("");

  return (
    <> 
	<div>
		<Link to={"/About"}> About| </Link>
		<Link to={"/Contact"}> Contact| </Link>
		<Link to={"/ActualHomePage"}> ActualHomePage |</Link>
        <Link to={"/"}>Home</Link>
	 </div>
	 <Routes>
	 <Route path = "/" element = { <Home />}/>
 		<Route path = "/About" element = { <About />}/>
		<Route path = "/Contact" element = { <Contact />}/>
		<Route path="*"  element={<Navigate to="/" />} />
		<Route path="/ActualHomePage" element = {<ActualHomePage />}/>
	 </Routes>

	</>
     
  );
}

export default App;
