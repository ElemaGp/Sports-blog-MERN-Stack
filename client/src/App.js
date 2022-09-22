import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

/* I like the simple way he created the project. Just create your folder in Documents, open the folder in vscode
   and in the terminal type "npx create-react-app . " */

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
    <div className="App">
        <TopBar />
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
        <Route path="/register">
            {user ? <Home /> :<Register />}
          </Route>
        <Route path="/login">
            {user ? <Home /> :<Login />}
          </Route>
        <Route path="/write">
            {user ? <Write /> :<Register />}
          </Route>
        <Route path="/settings">
            {user? <Settings /> :<Register />}
          </Route>
        <Route path="/post/:postId">
            <Single />
          </Route>
        </Switch>
        
    </div>
    </Router>
  );
}

export default App;
