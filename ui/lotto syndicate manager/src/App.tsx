import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Link  } from 'react-router-dom';

import About from './pages/About';
import Contact from './pages/contact';
import Home from './pages/Home';
import ActualHomePage from './pages/HomePage/ActualHomePage';

import Header from './pages/HomePage/Header';
import { NavigationRoutes } from './constants';
import { Navigation } from './components/navigation';

function App() {
  const [text, setText] = useState("");

  return (
    <> 
	
		

<Navigation />
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
