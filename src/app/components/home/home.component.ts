import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../../services/api/google-books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  items: any[] = [];

  loading: boolean;

  error: boolean = false;
  mensajeError: string;

  constructor(private gglBooks: GoogleBooksService) {

    this.loading = true;

    /*this.gglBooks.getBooksHome()
      .subscribe((data: any)=>{
        console.log(data);
        this.items= data;
      }, (error)=> {
        this.error=true;
        console.log(error.error.error.message);
        this.mensajeError=error.error.error.message;
      } );
      this.loading= false;*/
  }

  ngOnInit(): void { }

}
