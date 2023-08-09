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
  CREATEGAME: "/CreateGame/:syndicateId/user_syndicate/:user_syndicate_id",
  BOARDCHAT:
    "/BoardChat/:syndicateId/boards/:boardId/user_syndicate/:user_syndicate_id",
  LOGIN: "/Login",
  SYNDICATEBOARDS:
    "/MessageBoardsPage/:syndicateId/userSyndicate/:user_syndicate_id",
  GAMEPAGE: "/game/:gameId/syndicates/:syndicateId",
  SIGNUP: "/SignUp",
};
export { NavigationRoutes };
