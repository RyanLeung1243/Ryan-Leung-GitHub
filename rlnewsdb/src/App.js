import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } 
                    from "react-router-dom";
import Home         from "./Home";
import About        from "./About";
import TopNews      from "./TopNews";
import TopNewsCan   from "./TopNewsCan";
import TopNewsChina from "./TopNewsChina";
import TopNewsGer   from "./TopNewsGer";
import TopNewsHK    from "./TopNewsHK";
import TopNewsRus   from "./TopNewsRus";
import TopNewsJapan from "./TopNewsJapan";
import TopNewsUK    from "./TopNewsUK";
import NotFound     from './NotFound';
import Footer       from './Footer.js';
// import { Redirect } from 'react-router';

class App extends Component {
constructor(){
    super();

    this.state = {
      displayMenu: false,
      active: false
    };

 this.showDropdownMenu = this.showDropdownMenu.bind(this);
 this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

};

toggleClass() {
  const currentState = this.state.active;
  this.setState({ active: !currentState });
};


showDropdownMenu(event) {
   event.preventDefault();
   this.toggleClass();
   this.setState({ displayMenu: true }, () => {
   document.addEventListener('click', this.hideDropdownMenu);
   });
 }

 hideDropdownMenu() {
   this.setState({ displayMenu: false }, () => {
     document.removeEventListener('click', this.hideDropdownMenu);
   });

 }

  render() {
    return  (
    <Router>
        <div>  
        <header className="header">
        <h1>RL<span>NEWS</span>DB</h1>  
        <nav >
        <ul>
          <li><Link to="/">Current News</Link></li>
          <li className={this.state.active ? 'top-news-class': null}  onClick={this.showDropdownMenu}>World News</li>
              { this.state.displayMenu ? (
            <ul className="button">
              <li><Link to="/TopNews">UNITED STATES</Link></li>
              <li><Link to="/TopNewsCan">CANADA</Link></li>
              <li><Link to="/TopNewsRus">RUSSIA</Link></li>
              <li><Link to="/TopNewsChina">CHINA</Link></li>
              <li><Link to="/TopNewsJapan">JAPAN</Link></li>
              <li><Link to="/TopNewsHK">HONG KONG</Link></li>
              <li><Link to="/TopNewsUK">UNITED KINGDOM</Link></li>
              <li><Link to="/TopNewsGer">GERMANY</Link></li>
              </ul>):(null)}
          
          <li><Link to="/about">About</Link></li>
         </ul>
         </nav>
         </header>

        {/* Our router goes here */}
        <Switch> 
        {/* <Route exact path="/" component={Home} />
        <Route exact path="/new" component={New} /> */}

        {/* Does a redirect. */}
        {/* <Redirect from="/old" to="/new" /> */}
        <Route path={'/'} exact component={Home} />
        <Route path={'/TopNews'} exact component={TopNews} />
        <Route path={'/TopNewsCan'} exact component={TopNewsCan} />
        <Route path={'/TopNewsRus'} exact component={TopNewsRus} />
        <Route path={'/TopNewsChina'} exact component={TopNewsChina} />
        <Route path={'/TopNewsJapan'} exact component={TopNewsJapan} />
        <Route path={'/TopNewsHK'} exact component={TopNewsHK} />
        <Route path={'/TopNewsGer'} exact component={TopNewsGer} />
        <Route path={'/TopNewsUK'} exact component={TopNewsUK} />
        <Route path={'/about'} exact component={About} />

        {/* Shows an error page. */}
        <Route path="*" component={NotFound} />
        </Switch>
        <Footer></Footer>
      </div>
    </Router>);
  }
}

export default App;

