import React from 'react';
import './style.css';
const API_KEY   = 'f2cf7d27656c48d1a209283469b4a400';
const BASE_URL  = 'https://newsapi.org/v2/top-headlines?country=au&apiKey='
                + API_KEY + "&q=";

const MAIN_CATEGORY = "mainNewsCategory";

const ARTICLE_DATE_FORMAT = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

class TopnewsAus extends React.Component { 
    constructor() {
        super();
        this.state  = {
          apiKey : API_KEY,
          articles : [],
          defaultCategory: "general"
        };

        // Register functions of the class.
        this.getTop = this.getTop.bind(this);
        this.setCookie = this.setCookie.bind(this);
        this.getCookie = this.getCookie.bind(this);
        
    }

    // Called when constructor is finished building component.
    componentDidMount() {
        // Set main category from cookie if it does not exist.
        let mainCategory = this.getCookie(MAIN_CATEGORY);
        if(mainCategory === null) {
            this.setCookie(MAIN_CATEGORY, this.state.defaultCategory);
            mainCategory = this.state.defaultCategory;
        }
        this.getTop(mainCategory);
    }

    // ** This function does not need to be changed. **
    // Set cookie that expires 1000 days from now.
    // This can store the user's prefered news category.
    setCookie(cookieType, cookieValue) {
        var numDays = 1000;
        var d = new Date();
        d.setTime(d.getTime() + (numDays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cookieType + "=" + cookieValue 
                        + ";" + expires + ";path=/";
    }

    // ** This function does not need to be changed. **
    // Get category from cookie if one exists.
    getCookie(cookieType) {
        var name = cookieType + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            // Cookie found.
            return c.substring(name.length, c.length);
          }
        }
        return null;
      }

    getTop() {    
        const URL        = BASE_URL ;

        // Request and wait for data from remote server.
        fetch(URL).then(response => response.json())
            // Data retrieved so parse it.
            .then((data) => {
                console.log(JSON.stringify(data));
                this.setState({articles:data.articles});
            })
            // Data is not retieved.
            .catch((error) => {
                alert(error);
            });         
    }

  

    render() {
        return (          
            <div>
            <div className='wrapper'>
            <h1>AUSTRALIA - TOP HEADLINES</h1>

                <div className='article-block'>
                {this.state.articles.map((article, index) => (
                    <div className='article' key={index}>
                        {/* See  https://newsapi.org/ for more properties */}
                        <h2>{article.title}</h2>
                        
                        <img className ='' 
                             src={`${article.urlToImage}`}
                             alt={`${article.title} news`} 
                             onError={(e)=>{e.target.onerror = null; e.target.src='./images/noimagenews.jpg'}} />

                        <p>{article.description}</p>
                        <a href={article.url} target='_blank' rel="noopener noreferrer">Read More...</a>
                        <p>By: {article.author} - Source: <a href={`http://www.${article.source.name}`} target='_blank' rel="noopener noreferrer">{article.source.name}</a></p>
                        <p>{new Intl.DateTimeFormat('en-US', ARTICLE_DATE_FORMAT).format(new Date(article.publishedAt))}</p>
                    </div>
                
                        
                        
                    
                ))}
                </div>
                </div>
                <div className="ticker-wrap">
                    
                    <div className="ticker ticker__item">
                    <b>TOP STORIES TODAY</b>
                    {this.state.articles.map((article, index) => (
                    <div className="ticker__item"  key={index}>
                            <b>#{index+1}:</b> <i>{article.title} </i>
                            <a href={article.url} target='_blank' rel="noopener noreferrer"> Full story...</a>
                    </div>
                    
                
                    ))}
                    </div>
                </div>
            </div>     
        )
    }
}
export default TopnewsAus;