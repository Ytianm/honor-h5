import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link,
    // useRouteMatch,
    // useParams
} from "react-router-dom";

import Home from './pages/Home';
import List from './pages/List';
import Detail from './pages/Detail';

const App = () => {
    return (
        <Router>
          <Switch>
            <Route path="/detail">
              <Detail />
            </Route>
            <Route path="/list">
              <List />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    );
}

export default App;