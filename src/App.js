import "./App.css";
import "./page/page.css";
import "./component/component.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./page/Home";
import Header from "./component/Header";
import Postpage from "./page/postpage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/post/:postID" component={Postpage} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
