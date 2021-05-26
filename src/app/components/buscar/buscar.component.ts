import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../../services/api/google-books.service';
import { CardsComponent } from "../cards/cards.component";

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {

  books: any[] = [];

  constructor(private gglBooks: GoogleBooksService, private cards: CardsComponent) { }

  ngOnInit() {}

  buscar(termino: string){
 
    
    this.gglBooks.getBookForName(termino).subscribe((data: any)=> {
      console.log(data);
      this.books= data.items;
      //this.loading=false;
      this.cards.setBooksShow(this.books); //con esta llamada hacemos que el valor de las cartas mostradas
                                            //en el home cambien al valor que esta buscando el cliente
    });
  }

}
