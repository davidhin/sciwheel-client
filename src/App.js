import { BrowserRouter as Router } from "react-router-dom";
import { Link, Redirect, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
