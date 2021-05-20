import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent{

  @Input()
  items: any[]=[];

  constructor(private router: Router) { }

  
  //Esta funcion rutea a un componente en donde se abrira el libro
  verLibro(item: any){
    //let book: string= item.id    
    this.router.navigate(['/visor', item])
  }

}
