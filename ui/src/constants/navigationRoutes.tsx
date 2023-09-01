const NavigationRoutes = {
  HOME: "/",

  VIEWSYDICATES: "/viewSyndicates",
  INSIDESYNDICATE: "/InsideSyndicate/:syndicateId",
  CREATESYNDICATE: "/CreateSyndicate/:ownerId",
  REVIEW: "/reviewPage/:syndicateId",
  JOINGAME: "/joinGame/:syndicateId",
  CREATEGAME: "/CreateGame/:syndicateId/user_syndicate/:userSyndicateId",
  BOARDCHAT:
    "/BoardChat/:syndicateId/boards/:boardId/userSyndicate/:userSyndicateId",
  LOGIN: "/Login",

  SYNDICATEBOARDS:
    "/MessageBoardsPage/:syndicateId/userSyndicate/:userSyndicateId",
  GAMEPAGE: "/gamePage",
  SIGNUP: "/SignUp",
  ACCOUNT: "/Account",
  GAMEMESSAGE: "/PlayGame/userGames/:userGameId/games/:gameId",
  LOTTOSIMULATION: "/lottoSimulation",
  ARCHIVEPAGE: "/archivePage",
  PROFILE: "/profile",
  LOGOUT: "/logout",
  GAMEMEMBERS: "/gameMembers/:gameId",
};
export { NavigationRoutes };
