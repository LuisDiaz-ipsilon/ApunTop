import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  constructor(private http: HttpClient) { }

  getQuery(query: string){
    const URL=``;

    const headers= new HttpHeaders({
      'Authorization': 'Bearer '
    });

    return this.http.get(URL, {headers});

  }

}
