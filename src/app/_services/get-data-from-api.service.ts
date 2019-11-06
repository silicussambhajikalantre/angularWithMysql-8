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



  }


