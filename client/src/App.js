import { BrowserRouter as Router } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
