import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";

import { NavigationRoutes } from "./constants";
import { Navigation } from "./components/navigation";
import ViewSyndicates from "./pages/ViewAllSyndicatesPage";
import InsideSyndicate from "./pages/insideSyndicatePage/Index";
import CreateSyndicate from "./pages/CreateSyndicatePage";

import ReviewPage from "./pages/ReviewsPage";

//import BoardChat from "./pages/messageBoardPage/Index";

import { AuthContext } from "./contexts";
import Login from "./pages/LoginPage/components/login";
import MessageBoardsPage from "./pages/BoardsInSyndicatePage";
import GamePage from "./pages/gamePage";
import AccountPage from "./pages/Account";
import Message from "./pages/PlayGamePage";
import SignUp from "./pages/SignUp/components/signUp";
import Archive from "./pages/archive/index";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import { useEffect } from "react";

function App() {
  const unAuthorisedRoutes = () => {
    return (
      <>
        <Route path={NavigationRoutes.SIGNUP} element={<SignUp />}></Route>
        <Route path={NavigationRoutes.LOGIN} element={<Login />} />
        <Route path="*" element={<Navigate to={NavigationRoutes.LOGIN} />} />
      </>
    );
  };

  const authorisedRoutes = () => {
    return (
      <>
        <Route path="/" element={<HomePage />} />

        <Route path={NavigationRoutes.HOMEPAGE} element={<HomePage />} />
        <Route
          path={NavigationRoutes.VIEWSYDICATES}
          element={<ViewSyndicates />}
        />
        <Route
          path={NavigationRoutes.INSIDESYNDICATE}
          element={<InsideSyndicate />}
        />
        <Route path={NavigationRoutes.LOGOUT} element={<Logout />}></Route>
        <Route
          path={NavigationRoutes.CREATESYNDICATE}
          element={<CreateSyndicate />}
        />
        <Route path={NavigationRoutes.REVIEW} element={<ReviewPage />} />

        <Route
          path={NavigationRoutes.SYNDICATEBOARDS}
          element={<MessageBoardsPage />}
        />
        <Route path={NavigationRoutes.ARCHIVEPAGE} element={<Archive />} />

        <Route path={NavigationRoutes.GAMEPAGE} element={<GamePage />} />
        <Route path={NavigationRoutes.ACCOUNT} element={<AccountPage />} />
        <Route path={NavigationRoutes.GAMEMESSAGE} element={<Message />} />
        <Route path={NavigationRoutes.PROFILE} element={<Profile />} />
        {/* <Route path="*" element={<Navigate to={"/"} />} /> */}
      </>
    );
  };

  const { state } = AuthContext.useLogin();
  const loggedIn = state.accessToken;
  useEffect(() => {
    console.log("----UPDATED AUTH STATE -----", state);
  }, [state]);
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
