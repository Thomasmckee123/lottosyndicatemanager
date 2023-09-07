import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavigationRoutes } from "../../constants";
import { Link, useLocation } from "react-router-dom";
import TokenUtils from "../../integrations/token";
import { AuthContext } from "../../contexts";
import logo from "/logothomas.png";
const pages = [
  { title: "Home", path: NavigationRoutes.HOME },
  { title: "Syndicates", path: NavigationRoutes.VIEWSYDICATES },
  { title: "My Games", path: NavigationRoutes.GAMEPAGE },
];
const NonTopBarPages = [
  { title: "Profile", path: NavigationRoutes.PROFILE },
  { title: "Account", path: NavigationRoutes.ACCOUNT },
  { title: "Archived Games", path: NavigationRoutes.ARCHIVEPAGE },
  { title: "Log out", path: NavigationRoutes.LOGOUT },
  { title: "Syndicate", path: NavigationRoutes.SYNDICATEBOARDS },
  { title: "Create", path: NavigationRoutes.CREATESYNDICATE },
  { title: "Syndicate Reviews", path: NavigationRoutes.REVIEW },
  { title: "Join a game", path: NavigationRoutes.JOINGAME },
  { title: "Create a game", path: NavigationRoutes.CREATEGAME },
  { title: "Message board", path: NavigationRoutes.BOARDCHAT },
  { title: "Game Page", path: NavigationRoutes.GAMEMESSAGE },
  {
    title: "Sign in",
    path: NavigationRoutes.LOGIN,
  },
  { title: "Sign Up", path: NavigationRoutes.SIGNUP },

  {
    title: "Inside Synidcate",
    path: NavigationRoutes.INSIDESYNDICATE,
  },
  { title: "Syndicate Game", path: NavigationRoutes.SYNDICATEGAMEMESSAGE },
  {
    title: "ticket Numbers",
    path: NavigationRoutes.VIEWTICKETSPAGE,
  },
  {
    title: "Input Tickets",
    path: NavigationRoutes.TICKETINPUT,
  },
];
const settings = [
  { title: "Profile", path: NavigationRoutes.PROFILE },
  { title: "Account", path: NavigationRoutes.ACCOUNT },
  { title: "Archived Games", path: NavigationRoutes.ARCHIVEPAGE },
  { title: "Log Out", path: NavigationRoutes.LOGOUT },
];

const Navigation = () => {
  const { state } = AuthContext.useLogin();
  const loggedIn = state.isAuthorized;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  console.log("Pages: ", pages);
  console.log("NonTopBarPages: ", NonTopBarPages);

  const allPages = new Map(
    [...pages, ...NonTopBarPages].map((i) => [i.path, i.title])
  );
  console.log("All pages: ", allPages);
  console.log("Current path: ", location.pathname);

  const matchPattern = (pattern: any, path: any) => {
    const patternSegments = pattern.split("/");
    const pathSegments = path.split("/");

    if (patternSegments.length !== pathSegments.length) return false;

    for (let i = 0; i < patternSegments.length; i++) {
      if (
        patternSegments[i] !== pathSegments[i] &&
        !patternSegments[i].startsWith(":")
      ) {
        return false;
      }
    }

    return true;
  };

  let currentPage: { title: string; path: string } | undefined;

  allPages.forEach((title, path) => {
    if (matchPattern(path, location.pathname)) {
      currentPage = { path, title };
      console.log("Matched page:", currentPage);
    }
  });
  let title;
  if (currentPage) {
    title = currentPage.title;
  } else {
    title = "unknown page";
  }
  console.log("Final title: ", title);

  return (
    <AppBar position="static" sx={{ backgroundColor: "darkred" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: "10vh",
              width: "10vw",
            }}
            src={logo}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {loggedIn && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map(({ title, path }) => (
                  <MenuItem
                    component={Link}
                    to={path}
                    key={title}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            )}
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              display: "flex",
            }}
          >
            {title}
          </Typography>
          {loggedIn && (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map(({ title, path }) => (
                  <Link to={path} key={title}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {title}
                    </Button>
                  </Link>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, index) => (
                    <MenuItem key={index}>
                      <Link
                        to={setting.path}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Box sx={{ textAlign: "center" }}>
                          <Typography>{setting.title}</Typography>
                        </Box>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Navigation };
