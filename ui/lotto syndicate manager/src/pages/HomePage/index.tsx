import React, { useEffect } from "react";

import ImageList from "@mui/material/ImageList";
import { ImageListItem } from "@mui/material";
import Title from "./components/title";
import SimpleContainer from "./components/drawerAppBar";

const ActualHomePage = () => {
  return (
    <React.Fragment>
      <div>
        <Title />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron mt-5"></div>
          </div>
        </div>
      </div>
      <div className="component">
        <SimpleContainer />
      </div>
    </React.Fragment>
  );
};

export default ActualHomePage;
