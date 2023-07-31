import Button from "@mui/material/Button";
import './homepage.css';
import createSvgIcon from "@mui/material/utils/createSvgIcon";
import Box from "@mui/material/Box";
import { Link, NavLink } from "react-router-dom";

const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);

function Title() {
  return (
    <>
      <div className="welcomeContainer">
        <h1 className="welcomeMessage">welcome Thomas...</h1>
        <div className="buttonContainer">
          <Box>
            {/* Use the NavLink component to link to the "create" route */}
            <Link to = "/CreateSyndicate"> 
              <Button startIcon={<PlusIcon />}>
                Create a new syndicate
              </Button>
            </Link>
          </Box>        
        </div>
      </div>
    </>
  );
}

export default Title;
