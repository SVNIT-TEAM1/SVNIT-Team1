import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
function App() {
  document.body.style.backgroundColor = "#f8f9fa";
  return (
    <Router>

        <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/dashboard" exact component={Dashboard}/>
      </Switch>
      </Router>
  )
}

export default App;
