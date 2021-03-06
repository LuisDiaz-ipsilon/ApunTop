import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  
  constructor(private http: HttpClient) { }

  getQuery(query: string){
    const URL=`https://www.googleapis.com/books/v1/${query}&key=AIzaSyD1o07_NcpvHfLo52PDn8g0qG5ghxSAEoA`;

    const headers= new HttpHeaders({
      'key': '&key=AIzaSyD1o07_NcpvHfLo52PDn8g0qG5ghxSAEoA'
    });
    console.log(URL);
    return this.http.get(URL);

  }

  getBooksHome(){
    return this.getQuery(`volumes?q=tecnologia&filter=free-ebooks`);
  }

  getBookForName(termino: string){
    return this.getQuery(`volumes?q=${termino}&filter=free-ebooks`);
  }
  
  getBookForId(id: string){
    return this.getQuery(`volumes?=${id}`)
  }

}
