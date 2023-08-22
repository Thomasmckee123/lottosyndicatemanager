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

const pages = [
  { title: "Home", path: NavigationRoutes.HOME },
  { title: "About", path: NavigationRoutes.ABOUT },
  { title: "account", path: NavigationRoutes.ACCOUNT },
  { title: "View Syndicates", path: NavigationRoutes.VIEWSYDICATES },
  { title: "log out", path: NavigationRoutes.LOGIN },
  { title: "profile", path: NavigationRoutes.PROFILE },
];
const NonTopBarPages = [
  { title: "Create Syndicate", path: NavigationRoutes.CREATESYNDICATE },
  { title: "Syndicate Reviews", path: NavigationRoutes.REVIEW },
  { title: "Join a game", path: NavigationRoutes.JOINGAME },
  { title: "create a game", path: NavigationRoutes.CREATEGAME },
  { title: "message board", path: NavigationRoutes.BOARDCHAT },
  {
    title: "log in",
    path: NavigationRoutes.LOGIN,
  },

  {
    title: "Inside Synidcate",
    path: NavigationRoutes.INSIDESYNDICATE,
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navigation = () => {
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

  let currentPage: { title: string; path: string } | undefined;
  allPages.forEach((title, path) => {
    // <- Here path and title are separated
    console.log(`Comparing ${path} with ${location.pathname}`);
    if (path === location.pathname) {
      currentPage = { path, title }; // <- currentPage is reassigned here
      console.log("Matched page: ", currentPage);
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
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Navigation };
