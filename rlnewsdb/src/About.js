import React, { Component } from 'react';
class About extends Component {
  render() {
    return  (
      <div>
        <div className="about-page">
    <h1>About Us!</h1>
    <p><img src="./images/news3d.jpg" alt="News 3D" /></p>
    <p>Welcome to RLnewsDB!  Originated in 2019, we are a dedicated web development team striving to get you the most relevant news updates.</p>
    <p>Grabbing information from newsapi.org database. We are here to give you a nice interface and making it simple for you by having the user search any topic of choice.</p>
    <p>At RLnewsDB, we are always updating our webpage to give you the best experience.</p>
    <p>Thank you for stopping by!</p>
    <p>Sincerely,</p>
    <p>Ryan Leung - President and CEO of RLnewsDB</p>
        </div>
      </div>
    ) 
  }
}
export default About;
