const NavigationRoutes = {
  HOME: "/",
  ABOUT: "/about",
  CONTRACT: "/contact",
  HOMEPAGE: "/ActualHomePage",
  VIEWSYDICATES: "/viewSyndicates",
  INSIDESYNDICATE: "/InsideSyndicate/:syndicateId",
  CREATESYNDICATE: "/CreateSyndicate/:ownerId",
  REVIEW: "/reviewPage",
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
};
export { NavigationRoutes };
