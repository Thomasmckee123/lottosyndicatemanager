import SyndicateContainer from "./components/SyndicateContainer";
import Title from "./components/title";

const HomePage = () => {
  return (
    <>
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
        <SyndicateContainer />
      </div>
    </>
  );
};

export default HomePage;
