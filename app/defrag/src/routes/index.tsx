import { MemoryRouter, Redirect, Route, Switch } from "react-router-dom";
import About from "../pages/About";
import Create from "../pages/Create";
import Mint from "../pages/Mint";

const Routes = () => {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/create">
          <Create />
        </Route>
        <Route exact path="/mint">
          <Mint />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Redirect to="/create" />
        </Route>
      </Switch>
    </MemoryRouter>
  );
};

export default Routes;
