import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import { GoogleBooksService } from '../../services/api/google-books.service';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.scss'],
})
export class VisorComponent {

  
  book: any={};
  loading: boolean;

  constructor(private router: ActivatedRoute, private gglBooks: GoogleBooksService) { 
    this.loading=true;
    this.router.params.subscribe(params => {
      this.getBook(params['id']);
      this.book=params;
      this.loading= false;
      console.log(this.book);
    })
    
  }

  /*getArtista(id: string){

    this.spotify.getArtista(id).subscribe(artista=> {
      console.log(artista);
      this.artista= artista;
      this.loading=false;
    })

  } */

  getBook(id: string){
    this.gglBooks.getBookForId(id);
  }


}
