import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import About from "./pages/About";
import Contact from "./pages/contact";
import Home from "./pages/Home";
import ActualHomePage from "./pages/HomePage/ActualHomePage";

import { NavigationRoutes } from "./constants";
import { Navigation } from "./components/navigation";
import { Homepage } from "./components";
import ViewSyndicates from "./pages/viewSyndicates/viewPage";
import InsideSyndicate from "./pages/insideSyndicate/InsideSyndicate";
import CreateSyndicate from "./pages/CreateSyndicate/CreateSyndicate";
import { Create, Login, Reviews } from "@mui/icons-material";
import ReviewPage from "./pages/Reviews/ReviewPage";
import JoinGame from "./pages/syndicateGames/JoinGame/JoinGame";
import GameOptions from "./pages/syndicateGames/CreateGame/GameOptions";
import BoardChat from "./pages/chat/BoardChat";

// import SignUp from "./pages/logon/signUp";
//import Login from "./pages/logon/Logon";
//import { useAuthState } from "./stores/useAuthState";
//import useTokens from "./hooks/useTokens";
import Layout from "./pages/CreateSyndicate/layout";

function App() {
  const [text, setText] = useState("");
  //const { isAuthorized } = useAuthState();
  //const { checkLocalStorageTokens } = useTokens();

  useEffect(() => {
    // checkLocalStorageTokens();
  }, []);

  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<ActualHomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/ActualHomePage" element={<ActualHomePage />} />
        <Route path="/viewSyndicates" element={<ViewSyndicates />} />
        <Route path="/InsideSyndicate" element={<InsideSyndicate />} />
        <Route path="/CreateSyndicate" element={<CreateSyndicate />} />
        <Route path="/reviewPage" element={<ReviewPage />} />
        <Route path="/joinGame" element={<JoinGame />} />
        <Route path="/CreateGame" element={<GameOptions />} />
        <Route path="/BoardChat" element={<BoardChat />} />

        <Route path="*" element={<Navigate to="/ActualHomePage" />} />
      </Routes>
    </>
  );
}

export default App;
