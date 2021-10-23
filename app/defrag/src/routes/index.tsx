import { MemoryRouter, Redirect, Route, Switch } from "react-router-dom";
import About from "../pages/About";
import Create from "../pages/Create";
import Mint from "../pages/Mint";
import Redeem from "../pages/Redeem";

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
        <Route exact path="/redeem">
          <Redeem />
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
