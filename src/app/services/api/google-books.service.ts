import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  
  constructor(private http: HttpClient) { }

  getQuery(query: string){
    const URL=`https://www.googleapis.com/books/v1/${query}`;

    const headers= new HttpHeaders({
      'key': '&key=AIzaSyBJEULpFWM_xpU7Z352KfdTP0U0SKs0ijI'
    });
    console.log(URL+{headers});
    return this.http.get(URL, {headers});

  }

  getBooksHome(){
    return this.getQuery(`volumes?q=tecnologia&filter=free-ebooks`);
  }

  getBookForName(termino: string){
    return this.getQuery(`volumes?q=${termino}&filter=free-ebooks`);
  }
  

}
