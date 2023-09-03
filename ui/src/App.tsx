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
import useTokens from "./hooks/useTokens";
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
        <Route path={NavigationRoutes.HOME} element={<HomePage />} />
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
        <Route path="*" element={<Navigate to={"/"} />} />
      </>
    );
  };
  const { checkLocalStorageTokens } = useTokens();
  const { state } = AuthContext.useLogin();
  const isAuth = state.isAuthorized;
  useEffect(() => {
    checkLocalStorageTokens();
  }, []);

  return (
    <>
      <Navigation />
      <Routes>
        {!isAuth && unAuthorisedRoutes()}
        {isAuth && authorisedRoutes()}
      </Routes>
    </>
  );
}

export default App;
