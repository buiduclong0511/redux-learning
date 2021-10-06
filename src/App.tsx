import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from "react-router-dom";

import { Home, Login, Register } from "src/Pages";
import { authSelector } from "src/Redux";

const ChangeRoute: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const token = useSelector(authSelector).token;

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register" && !token) {
      history.push("/login");
    } else if (token && (location.pathname === "/login" || location.pathname === "/register")) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, token]);

  return null;
};

function App() {
  return (
    <div className="App">
      <Router>
        <ChangeRoute />
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/" component={Home} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
