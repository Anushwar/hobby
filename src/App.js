/** @jsxImportSource */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/add">
          <Add />
        </Route>
        <Route path="/edit">
          <Edit />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
