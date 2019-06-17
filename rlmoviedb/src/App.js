import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } 
                    from "react-router-dom";
import Home         from "./Home";
import About        from "./About";
import NotFound     from './NotFound';
import './Header.css';
import Header from './Header.js';
// import New          from './New';
// import { Redirect } from 'react-router';

class App extends Component {
  render() {
    return  (
    <Router>
      <div>
        <Header></Header>
        <nav>
        <ul>
          <li><Link to="/rlmoviedb/">Movies</Link></li>
          <li><Link to="/rlmoviedb/about">About Us</Link></li>
          {/* <li><Link to="/old">Old Page</Link></li> */}
        </ul>
        </nav>
        {/* <b>Header</b> */}

        {/* Our router goes here */}
        <Switch> 
        <Route exact path="/rlmoviedb/" component={Home} />
        {/* <Route exact path="/new" component={New} /> */}

        {/* Does a redirect. */}
        {/* <Redirect from="/old" to="/new" /> */}
        <Route path={'/rlmoviedb/about'} exact component={About} />

        {/* Shows an error page. */}
        <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>);
  }
}
export default App;
