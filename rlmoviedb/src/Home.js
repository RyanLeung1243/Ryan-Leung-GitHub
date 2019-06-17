import React, { Component }from 'react';
// import { NONAME } from 'dns';
const API_KEY       = '11299a7a6d99d8fbfde9c57f9f564f7d';
const BASE_URL      = 'http://api.themoviedb.org/3/discover/movie?api_key='
                      + API_KEY;
const releaseURL    = '&primary_release_date.gte=';
const endURL        = '&primary_release_date.lte=';
const pageURL       = '&page=';
const genreURL      = '&with_genres=';

const GENRES        = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
                      + API_KEY
                      + '&language=en-US';


class Home extends Component {
    
    constructor() {
        super();
        this.state  = {
          apiKey        : API_KEY,
          imgLink       : 'http://image.tmdb.org/t/p/w185',
          start         : '2019-02-01',
          end           : '2019-05-22',
          loading       : false,
          movies        : [],
          genres        : [],
          pages         : [],
          selectedGenre : 28,
          pageTotal     : 1,
          page          : 1,
        };
        this.getMovies          = this.getMovies.bind(this);
        this.getPage            = this.getPage.bind(this);
        this.handleGenreChange  = this.handleGenreChange.bind(this);

        this.nextPage           = this.nextPage.bind(this);
        this.prevPage           = this.prevPage.bind(this);
        this.numberButtons      = this.numberButtons.bind(this);

    }

    // Called when constructor is finished building component.
    componentDidMount() {
      this.getMovies(this.state.selectedGenre, this.state.page);
      this.getGenres();    

    }

    handleGenreChange(e) {
      this.setState({ selectedGenre: e.target.value});
      this.getMovies(e.target.value, 1);
      this.numberButtons(1, this.state.pageTotal);
      
    }

    checkDates() {

      var d = new Date();
      d.setDate(d.getDate() - 26);
   }

   nextPage(){
    if(this.state.page < this.state.pageTotal){
        this.getPage(this.state.page + 1);
        this.setState({ page: this.state.page + 1 });
        this.numberButtons(this.state.page + 1 , this.state.pageTotal);
    }
  }

  prevPage(){
    if(this.state.page > 1){
      this.getPage(this.state.page - 1);
      this.setState({ page: this.state.page - 1 });
      this.numberButtons(this.state.page - 1 , this.state.pageTotal)
  }
}

    getMovies(pickGenre, page) { 
        this.checkDates();

        const URL = BASE_URL + 
                    releaseURL + this.state.start + 
                    endURL + this.state.end + 
                    pageURL + page + 
                    genreURL + pickGenre ;

        // Request and wait for data from remote server.
        fetch(URL).then(response => response.json())
            // Data retrieved so parse it.
            .then((data) => {
              
              this.setState({ movies:data.results, 
                                pageTotal:data.total_pages,
                                page: 1
                                });
              this.numberButtons(1 , data.total_pages)
               
            })
            // Data is not retieved.
            .catch((error) => {
                alert(error);
            });         
    }

    getPage(pageText) { 
      let page = 1
      // Need to convert page to number from string.
      if(pageText !=null) {
        page = parseInt(pageText, 10);
      }
      this.checkDates();
      const URL = BASE_URL + 
                  releaseURL + this.state.start + 
                  endURL + this.state.end + 
                  pageURL + page + 
                  genreURL + this.state.selectedGenre ;
      this.numberButtons(page, this.state.pageTotal);
      
      // Request and wait for data from remote server.
      fetch(URL).then(response => response.json())
          // Data retrieved so parse it.
          .then((data) => {
              this.setState({ movies:data.results, 
                              pageTotal: data.total_pages, 
                              page:page});
           

          })
          // Data is not retieved.
          .catch((error) => {
              alert(error);
          });         
    }


    getGenres() {
        // This code gets data from the remote server.
        fetch(GENRES).then(response => response.json())

        // Data is retrieved.
        .then((data) => {
            this.setState({genres:data.genres});

        })
        // Data is not retrieved.
        .catch((error) => {
            alert(error);
        });
    }

    //this makes the number buttons
    numberButtons(currentPage, totalPages) {
        if(currentPage == null && !this.state.loaded) {
            currentPage = 1;
            this.setState({loading:true});
        }
        if(currentPage!=null) {
            let pages = [];

            //loop through the numbers or pages and add a class 
            for(let i=1; i<=totalPages; i++){
            pages.push(
            <button className={(currentPage === i ? 'active ' : '') + 'control'} 
                    value={i}
                    key={i} 
                    onClick={(e)=>this.getPage(e.target.value)}>{i}</button>
            );
          }
          //this will return how many pages to display
          this.setState({pages:pages});
        }

    }

    render() {

        return (          
            <div>
              
               {/* Genres */}
              <div className="pickGenre">
              <p className="genre">Choose a genre: 
                <select type='text' value={this.state.selectedGenre} 
                        onChange={this.handleGenreChange}>
                {this.state.genres.map((item, index)=>(
                <option key={item.id} value={item.id}>{item.name}</option>
                ))}
                </select>
              </p>
              </div>
             
        {/* To show image add http://image.tmdb.org/t/p/w185/ to file name */}
              <div className="pages">
                <p><button onClick={this.prevPage}>Previous</button>
                {this.state.pages}
                <button onClick={this.nextPage}>Next</button></p>              
              </div>

              {this.state.movies.map((item, index)=>(
                <div key={item.id}>
                <div className='movieDiv'>
           
                  <div className="moviePoster">
                    <img alt={`${item.title} poster`} 
                         src={`${this.state.imgLink}${item.poster_path}`}
                         onError={(e)=>{e.target.onerror = null; e.target.src="/rlmoviedb/images/noimageposter.jpg"}}/>
                  </div> {/* poster div */}

                  <div className="movieInfo">
                    <h2>{item.title}</h2>
                    <p><img alt={`${item.title} backdrop`} 
                            src={`${this.state.imgLink}${item.backdrop_path}`}
                            //replaces error photos
                            onError={(e)=>{e.target.onerror = null; e.target.src="/rlmoviedb//images/noimagebackdrop.jpg"}} /></p>
                    
                    <div className="movieOverview">
                      <p className="movieOTitle"><b>Overview</b></p>
                      {item.overview}
                    </div>  {/* movieOverview div */}

                    <div className="movieStats">
                    <p><b>Original Language:</b> {item.original_language}</p>
                    <p><b>Rating:</b> {item.vote_average} <b> Vote(s):</b> {item.vote_count}</p>
                    <p><b>Release Date:</b> {item.release_date}</p>
                    </div>
                  </div>  {/* movieInfo div */}
                
                </div> {/* movieDiv div */}
                
                </div> 
              ))}

              <div className="pages">
                <p><button onClick={this.prevPage}>Previous</button>
                {this.state.pages}
                <button onClick={this.nextPage}>Next</button></p>              
              </div>

              </div> 
         
        );
    }
}
export default Home;
