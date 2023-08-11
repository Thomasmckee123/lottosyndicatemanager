import { Routes, Route, Navigate, Link } from "react-router-dom";

import About from "./pages/informationPages/About";
import Contact from "./pages/informationPages/contact";

import HomePage from "./pages/HomePage";

import { NavigationRoutes } from "./constants";
import { Navigation } from "./components/navigation";
import ViewSyndicates from "./pages/ViewAllSyndicatesPage";
import InsideSyndicate from "./pages/insideSyndicatePage/Index";
import CreateSyndicate from "./pages/CreateSyndicatePage";

import ReviewPage from "./pages/ReviewsPage";

import GameOptions from "./pages/CreateGamesPage";
import BoardChat from "./pages/messageBoardPage/Index";

import { AuthContext } from "./contexts";
import Login from "./pages/LoginPage/components/login";
import MessageBoardsPage from "./pages/BoardsInSyndicatePage";
import GamePage from "./pages/gamePage";
import CreateGame from "./pages/CreateGamesPage";

function App() {
  const unAuthorisedRoutes = () => {
    return (
      <>
        <Route path={NavigationRoutes.LOGIN} element={<Login />} />
        <Route path="*" element={<Navigate to={NavigationRoutes.LOGIN} />} />
      </>
    );
  };

  const authorisedRoutes = () => {
    return (
      <>
        <Route path="/" element={<HomePage />} />
        <Route path={NavigationRoutes.ABOUT} element={<About />} />
        <Route path={NavigationRoutes.CONTRACT} element={<Contact />} />
        <Route path={NavigationRoutes.HOMEPAGE} element={<HomePage />} />
        <Route
          path={NavigationRoutes.VIEWSYDICATES}
          element={<ViewSyndicates />}
        />
        <Route
          path={NavigationRoutes.INSIDESYNDICATE}
          element={<InsideSyndicate />}
        />
        <Route
          path={NavigationRoutes.CREATESYNDICATE}
          element={<CreateSyndicate />}
        />
        <Route path={NavigationRoutes.REVIEW} element={<ReviewPage />} />
        <Route path={NavigationRoutes.JOINGAME} element={<CreateGame />} />
        <Route path={NavigationRoutes.CREATEGAME} element={<GameOptions />} />
        <Route path={NavigationRoutes.BOARDCHAT} element={<BoardChat />} />
        <Route
          path={NavigationRoutes.SYNDICATEBOARDS}
          element={<MessageBoardsPage />}
        />

        <Route path={NavigationRoutes.GAMEPAGE} element={<GamePage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
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
