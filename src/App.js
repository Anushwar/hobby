/* eslint-disable react/jsx-props-no-spreading */
/** @jsxImportSource */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Add from "./pages/Add";
import CardDetails from "./pages/CardDetails";
import Edit from "./pages/Edit";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/projects/add" component={Add} />
        <Route path="/projects/edit" component={Edit} />
        <Route path="/projects/:index/(view|edit)" component={CardDetails} />
      </Switch>
    </Router>
  );
};

export default App;
