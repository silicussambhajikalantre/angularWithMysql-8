import { Injectable } from '@angular/core';

@Injectable()
export class GetDataFromApiService {

  constructor() { }

  getData(pageNumber) {
    return fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?page="+pageNumber+"&r=json&s=all", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "LI2XXJMktGmshm8fgxxIkg01ogFjp1emtWhjsnaEwrXw2jYdrZ"
      }
    });
    }

    getMovieDataByYear(year) {
      return fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&s=all&y="+year, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
          "x-rapidapi-key": "LI2XXJMktGmshm8fgxxIkg01ogFjp1emtWhjsnaEwrXw2jYdrZ"
        }
      });
  
      }

      getDataFromTMDB(page) {
        return fetch("https://api.themoviedb.org/3/discover/movie?api_key=6abdf9da1cf92c44b3fb376daaf55867&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+page);
        }

        //https://api.themoviedb.org/3/discover/movie?api_key=6abdf9da1cf92c44b3fb376daaf55867&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1


  }


