import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CreateUser from "./components/createUser.component";
import LoginUser from "./components/login.component";
import AddSPD from "./components/spdData.component";
import AddLuxSPD from "./components/luxspdData.component";
import AddTableSPD from "./components/tabletopspdData.component";
import SaveRoom from "./components/saveRoom.component";

class App extends Component {

  state = { message: "" }
  callbackFunction = (childData) => {
        this.setState({message: "User ID - " + childData})
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/app" className="navbar-brand">
              CIRCADIAN&reg; Lighting Calculator
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/app1"} className="nav-link">
                  Light Source Measurement
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/app2"} className="nav-link">
                  Eye Level Illumination
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/app3"} className="nav-link">
                 Table Top Illumination
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/saveroom"} className="nav-link">
                  Save a room
                </Link>
              </li>
              <li className="nav-item nav-link">
                {this.state.message}
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <LoginUser parentCallback = {this.callbackFunction}/>
            <Switch>
              <Route exact path="/saveroom" component={SaveRoom} />
              <Route exact path="/app1" component={AddSPD} />
              <Route exact path="/app2" component={AddLuxSPD} />
              <Route exact path="/app3" component={AddTableSPD} />
              <Route exact path="/login" component={LoginUser} />
              <Route exact path="/create" component={CreateUser} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
