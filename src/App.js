/* eslint-disable react/jsx-props-no-spreading */
/** @jsxImportSource */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Add from "./pages/Add";
import CardDetails from "./pages/ProjectDetails";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/projects/add/:index?" component={Add} />
        <Route path="/projects/:index" component={CardDetails} />
      </Switch>
    </Router>
  );
};

export default App;
