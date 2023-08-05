import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import About from "./pages/About";
import Contact from "./pages/contact";
import Home from "./pages/Home";
import ActualHomePage from "./pages/HomePage";

import { NavigationRoutes } from "./constants";
import { Navigation } from "./components/navigation";
import { Homepage } from "./components";
import ViewSyndicates from "./pages/viewSyndicates/viewPage";
import InsideSyndicate from "./pages/insideSyndicate/InsideSyndicate";
import CreateSyndicate from "./pages/CreateSyndicate";
import { Create, Reviews } from "@mui/icons-material";
import ReviewPage from "./pages/Reviews/ReviewPage";
import JoinGame from "./pages/syndicateGames/JoinGame/JoinGame";
import GameOptions from "./pages/syndicateGames/CreateGame/GameOptions";
import BoardChat from "./pages/chat/Index";

// import SignUp from "./pages/logon/signUp";
//import Login from "./pages/logon/Logon";
//import { useAuthState } from "./stores/useAuthState";
//import useTokens from "./hooks/useTokens";
import Layout from "./pages/CreateSyndicate/components/layout";
import { AuthContext } from "./contexts";
import Login from "./pages/Login/login";
import MessageBoardsPage from "./pages/syndicateBoards";

function App() {
  const [text, setText] = useState("");
  //const { isAuthorized } = useAuthState();
  //const { checkLocalStorageTokens } = useTokens();

  const unAuthorisedRoutes = () => {
    return (
      <>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to={NavigationRoutes.LOGIN} />} />
      </>
    );
  };

  const authorisedRoutes = () => {
    return (
      <>
        <Route path="/" element={<ActualHomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/ActualHomePage" element={<ActualHomePage />} />
        <Route path="/viewSyndicates" element={<ViewSyndicates />} />
        <Route
          path="/InsideSyndicate/:syndicateId"
          element={<InsideSyndicate />}
        />
        <Route path="/CreateSyndicate/:ownerId" element={<CreateSyndicate />} />
        <Route path="/reviewPage" element={<ReviewPage />} />
        <Route path="/joinGame/:syndicateId" element={<JoinGame />} />
        <Route path="/CreateGame/:syndicateId" element={<GameOptions />} />
        <Route path={NavigationRoutes.BOARDCHAT} element={<BoardChat />} />
        <Route
          path="/MessageBoardsPage/:syndicateId/userSyndicate/:user_syndicate_id"
          element={<MessageBoardsPage />}
        ></Route>
      </>
    );
  };

  const { state } = AuthContext.useLogin();
  const loggedIn = state.accessToken;

  return (
    <>
      <Navigation />
      <Routes>
        {!loggedIn && unAuthorisedRoutes()}
        {loggedIn && authorisedRoutes()}
      </Routes>
    </>
  );
}

export default App;
